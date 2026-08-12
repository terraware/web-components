import {
  ADDRESS_CLAMP_TO_EDGE,
  FILTER_LINEAR,
  LAYERID_IMMEDIATE,
  Mesh,
  MeshInstance,
  Quat,
  Script,
  ShaderMaterial,
  Texture,
  Vec3,
  XRTYPE_VR,
  XrInputSource,
} from 'playcanvas';

import { ButtonArmingLatch } from './xr-button-arming';
import { HoldState, INITIAL_HOLD_STATE, advanceHold } from './xr-button-hold';
import { drawExitButtonMask } from './xr-exit-button-mask';
import { FaceButtonPressTracker, secondaryFaceButtonPressed } from './xr-face-buttons';
import { pieShaderProgress } from './xr-progress-pie';
import { createProgressPieMaterial, progressPieQuadMesh } from './xr-progress-pie-material';

/**
 * Boolean ray-sphere hit test. Treats the ray as a half-line (t >= 0) and returns true when it
 * intersects the sphere or starts inside it. `direction` is normalized internally.
 */
export const raySphereIntersect = (origin: Vec3, direction: Vec3, center: Vec3, radius: number): boolean => {
  const dir = direction.clone().normalize();
  const m = new Vec3().sub2(origin, center);
  const b = m.dot(dir);
  const c = m.dot(m) - radius * radius;
  if (c > 0 && b > 0) {
    return false;
  }

  return b * b - c >= 0;
};

const TEXTURE_SIZE = 256;

/** Opacity of the button while it is not being aimed at. */
const IDLE_OPACITY = 0.9;

/** Seconds of continuous B/Y hold required to leave the session. Matches the gaze-dwell threshold. */
const EXIT_HOLD_SECONDS = 1.25;

export class XrExitButton extends Script {
  static scriptName = 'xrExitButton';

  /** Offset from the head, in head space: right, up, and forward (-z) into the upper-right of the view. */
  offset = new Vec3(0.45, 0.35, -1.2);

  /** Half-extent of the square button quad, in world units at the offset distance. */
  halfSize = 0.12;

  /** World-space radius of the hover/hit sphere. Slightly larger than halfSize for easier targeting. */
  hitRadius = 0.15;

  private _material?: ShaderMaterial;
  private _texture?: Texture;
  private _mesh?: Mesh;
  private _hovered = false;

  private _headPosition = new Vec3();
  private _headRotation = new Quat();
  private _worldOffset = new Vec3();
  private _faceButtons = new FaceButtonPressTracker();

  private _hold: HoldState = INITIAL_HOLD_STATE;
  private _arming = new ButtonArmingLatch();

  private _isVrActive = () => this.app.xr?.active === true && this.app.xr?.type === XRTYPE_VR;

  private _onXrStart = () => {
    this.entity.enabled = this._isVrActive();
    this._resetProgress();
  };

  private _onXrEnd = () => {
    this.entity.enabled = false;
    this._hovered = false;
    this._resetProgress();
    this.entity.setLocalScale(1, 1, 1);
    this._material?.setParameter('uOpacity', IDLE_OPACITY);
  };

  private _onSelect = (inputSource: XrInputSource) => {
    if (!this.entity.enabled) {
      return;
    }
    if (this.rayHitsButton(inputSource.getOrigin(), inputSource.getDirection())) {
      this.app.xr?.end();
    }
  };

  /** True when the ray points at the button's hit sphere. False while the button entity is disabled. */
  rayHitsButton(origin: Vec3, direction: Vec3): boolean {
    if (!this.entity.enabled) {
      return false;
    }

    return raySphereIntersect(origin, direction, this.entity.getPosition(), this.hitRadius);
  }

  /** The button's static artwork, painted once. Only the sweep changes per frame, and that lives in
   * the shader. */
  private _createMaskTexture(): Texture {
    const canvas = document.createElement('canvas');
    canvas.width = TEXTURE_SIZE;
    canvas.height = TEXTURE_SIZE;

    const ctx = canvas.getContext('2d');
    if (ctx) {
      drawExitButtonMask(ctx, TEXTURE_SIZE);
    }

    const texture = new Texture(this.app.graphicsDevice, {
      name: 'xr-exit-button-mask',
      width: TEXTURE_SIZE,
      height: TEXTURE_SIZE,
      addressU: ADDRESS_CLAMP_TO_EDGE,
      addressV: ADDRESS_CLAMP_TO_EDGE,
      minFilter: FILTER_LINEAR,
      magFilter: FILTER_LINEAR,
      mipmaps: true,
    });
    texture.setSource(canvas);

    return texture;
  }

  private _resetProgress() {
    this._hold = INITIAL_HOLD_STATE;
    this._material?.setParameter('uProgress', 0);
  }

  initialize() {
    this._texture = this._createMaskTexture();
    this._material = createProgressPieMaterial({
      uniqueName: 'xr-exit-button',
      maskMap: this._texture,
      discColor: [20 / 255, 20 / 255, 20 / 255],
      discAlpha: 0.75,
    });
    this._material.setParameter('uOpacity', IDLE_OPACITY);
    this._resetProgress();

    this._mesh = progressPieQuadMesh(this.app.graphicsDevice, this.halfSize);
    const meshInstance = new MeshInstance(this._mesh, this._material);

    // Immediate layer draws after the World layer (where the splats render) so the button is never
    // composited behind them; depthTest:false keeps it on top within the layer.
    this.entity.addComponent('render', { meshInstances: [meshInstance], layers: [LAYERID_IMMEDIATE] });

    this.entity.enabled = this._isVrActive();
    this.app.xr?.on('start', this._onXrStart);
    this.app.xr?.on('end', this._onXrEnd);
    this.app.xr?.input?.on('select', this._onSelect);
  }

  update(dt: number) {
    if (!this.entity.enabled) {
      return;
    }

    this._trackHead();

    const sources = this.app.xr?.input?.inputSources ?? [];
    let hovered = false;
    let holdActive = false;
    for (const source of sources) {
      const sourceHovers = this.rayHitsButton(source.getOrigin(), source.getDirection());
      hovered = hovered || sourceHovers;

      // A face-button press exits only while that controller is aimed at the button, matching the
      // trigger. Edge-detected so holding a button and then aiming onto it doesn't fire.
      const facePressed = this._faceButtons.justPressed(source);

      if (sourceHovers && facePressed) {
        this.app.xr?.end();

        return;
      }

      // Two statements, not `holdActive = holdActive || this._arming.trackPress(...)`: trackPress
      // arms the source as a side effect and must run for every source every frame, but `||`
      // short-circuits once holdActive is true and would skip arming later sources.
      const armedPress = this._arming.trackPress(source, secondaryFaceButtonPressed(source));
      holdActive = holdActive || armedPress;
    }

    const hold = advanceHold(this._hold, holdActive, dt, EXIT_HOLD_SECONDS);
    this._hold = hold.state;
    this._material?.setParameter('uProgress', pieShaderProgress(hold.progress));

    if (hold.justFired) {
      this.app.xr?.end();

      return;
    }

    if (hovered !== this._hovered) {
      this._hovered = hovered;
      const scale = hovered ? 1.15 : 1;
      this.entity.setLocalScale(scale, scale, scale);
      this._material?.setParameter('uOpacity', hovered ? 1 : IDLE_OPACITY);
    }
  }

  /**
   * Pin the button to the upper-right of the headset view. The camera entity's transform is
   * overwritten every frame by WalkthroughCamera and is not the rendered head pose, so the head
   * pose is read from the XR views (each view's inverse-view matrix is that eye's world transform)
   * and the button places itself in world space, offset in head space.
   */
  private _trackHead() {
    const views = this.app.xr?.views?.list;
    if (!views || views.length === 0) {
      return;
    }

    this._headPosition.set(0, 0, 0);
    for (const view of views) {
      view.viewInvOffMat.getTranslation(this._worldOffset);
      this._headPosition.add(this._worldOffset);
    }
    this._headPosition.mulScalar(1 / views.length);
    this._headRotation.setFromMat4(views[0].viewInvOffMat);

    this._headRotation.transformVector(this.offset, this._worldOffset);
    this.entity.setPosition(
      this._headPosition.x + this._worldOffset.x,
      this._headPosition.y + this._worldOffset.y,
      this._headPosition.z + this._worldOffset.z
    );
    this.entity.setRotation(this._headRotation);
  }

  destroy() {
    this.app.xr?.off('start', this._onXrStart);
    this.app.xr?.off('end', this._onXrEnd);
    this.app.xr?.input?.off('select', this._onSelect);
    if (this.entity.render) {
      this.entity.render.meshInstances = [];
    }
    this._mesh?.destroy();
    this._material?.destroy();
    this._texture?.destroy();
    this._mesh = undefined;
    this._material = undefined;
    this._texture = undefined;
  }
}
