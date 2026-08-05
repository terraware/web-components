import {
  ADDRESS_CLAMP_TO_EDGE,
  BLEND_NORMAL,
  CULLFACE_NONE,
  Color,
  Entity,
  FILTER_LINEAR,
  LAYERID_IMMEDIATE,
  Mesh,
  MeshInstance,
  Quat,
  Script,
  StandardMaterial,
  Texture,
  Vec3,
  XRTYPE_VR,
} from 'playcanvas';

import { HOTSPOT_HALF_EXTENT, collectAnnotationHitCandidates } from './xr-annotation-candidates';
import { nearestAnnotationHit } from './xr-annotation-targeting';
import { DwellState, INITIAL_DWELL_STATE, advanceDwell } from './xr-gaze-dwell-state';

/** Multiplier on the hotspot's world radius for gaze targeting. */
const GAZE_HIT_RADIUS_PAD = 5;

/** Seconds of continuous gaze required to open an annotation. */
const DWELL_SECONDS = 1.25;

/** Progress-pie quad radius as a multiple of the hotspot's rendered half-extent (covers the hotspot). */
const PIE_RADIUS_SCALE = 1.25;

/** Progress-pie texture resolution. */
const PIE_TEXTURE_SIZE = 128;

/** Sweep starts at 12 o'clock. */
const PIE_START_ANGLE = -Math.PI / 2;

const LOCAL_FORWARD = new Vec3(0, 0, -1);

export class XrGazeDwell extends Script {
  static scriptName = 'xrGazeDwell';

  /** Index of the annotation whose panel is currently open, or -1. Excluded from gaze targets so
   * dwell opens OTHER annotations while one is open (and never re-dwells the open one). */
  activeIndex = -1;

  private _dwell: DwellState = INITIAL_DWELL_STATE;

  private _pieEntity?: Entity;
  private _pieCanvas?: HTMLCanvasElement;
  private _pieTexture?: Texture;
  private _pieMaterial?: StandardMaterial;
  private _pieMesh?: Mesh;
  private _drawnProgress = -1;

  private _headPos = new Vec3();
  private _headRot = new Quat();
  private _viewOffset = new Vec3();
  private _forward = new Vec3();
  private _scratchScale = new Vec3();

  private _isVrActive = () => this.app.xr?.active === true && this.app.xr?.type === XRTYPE_VR;

  initialize() {
    this._pieCanvas = document.createElement('canvas');
    this._pieCanvas.width = PIE_TEXTURE_SIZE;
    this._pieCanvas.height = PIE_TEXTURE_SIZE;

    this._pieTexture = new Texture(this.app.graphicsDevice, {
      name: 'xr-gaze-dwell-pie',
      width: PIE_TEXTURE_SIZE,
      height: PIE_TEXTURE_SIZE,
      addressU: ADDRESS_CLAMP_TO_EDGE,
      addressV: ADDRESS_CLAMP_TO_EDGE,
      minFilter: FILTER_LINEAR,
      magFilter: FILTER_LINEAR,
      mipmaps: true,
    });
    this._pieTexture.setSource(this._pieCanvas);

    const material = new StandardMaterial();
    material.useLighting = false;
    material.emissive = new Color(1, 1, 1);
    material.emissiveMap = this._pieTexture;
    material.opacityMap = this._pieTexture;
    material.opacityMapChannel = 'a';
    material.blendType = BLEND_NORMAL;
    material.depthTest = false;
    material.depthWrite = false;
    material.cull = CULLFACE_NONE;
    material.update();
    this._pieMaterial = material;

    this._pieMesh = this._createQuad();
    const meshInstance = new MeshInstance(this._pieMesh, material);

    this._pieEntity = new Entity('xr-gaze-dwell-pie');
    this._pieEntity.addComponent('render', { meshInstances: [meshInstance], layers: [LAYERID_IMMEDIATE] });
    this._pieEntity.enabled = false;
    this.entity.addChild(this._pieEntity);
  }

  private _createQuad(): Mesh {
    const h = HOTSPOT_HALF_EXTENT;
    const mesh = new Mesh(this.app.graphicsDevice);
    mesh.setPositions([-h, -h, 0, h, -h, 0, h, h, 0, -h, h, 0]);
    mesh.setNormals([0, 0, 1, 0, 0, 1, 0, 0, 1, 0, 0, 1]);
    mesh.setUvs(0, [0, 1, 1, 1, 1, 0, 0, 0]);
    mesh.setIndices([0, 1, 2, 0, 2, 3]);
    mesh.update();

    return mesh;
  }

  /** Redraws the pie fill for the given dwell progress (0..1) onto the texture canvas. */
  private _drawPie(progress: number) {
    const ctx = this._pieCanvas?.getContext('2d');
    if (!ctx) {
      return;
    }
    const c = PIE_TEXTURE_SIZE / 2;
    const r = c * 0.92;
    ctx.clearRect(0, 0, PIE_TEXTURE_SIZE, PIE_TEXTURE_SIZE);

    // Faint full-circle track so the not-yet-filled portion still reads as a disc.
    ctx.beginPath();
    ctx.arc(c, c, r, 0, Math.PI * 2);
    ctx.fillStyle = 'rgba(255, 255, 255, 0.18)';
    ctx.fill();

    // Filled progress wedge from the centre, sweeping from 12 o'clock.
    ctx.beginPath();
    ctx.moveTo(c, c);
    ctx.arc(c, c, r, PIE_START_ANGLE, PIE_START_ANGLE + progress * Math.PI * 2);
    ctx.closePath();
    ctx.fillStyle = 'rgba(64, 200, 255, 0.85)';
    ctx.fill();

    this._pieTexture?.upload();
  }

  private _trackHead(): boolean {
    const views = this.app.xr?.views?.list;
    if (!views || views.length === 0) {
      return false;
    }
    this._headPos.set(0, 0, 0);
    for (const view of views) {
      view.viewInvOffMat.getTranslation(this._viewOffset);
      this._headPos.add(this._viewOffset);
    }
    this._headPos.mulScalar(1 / views.length);
    this._headRot.setFromMat4(views[0].viewInvOffMat);

    return true;
  }

  update(dt: number) {
    if (!this._pieEntity) {
      return;
    }
    if (!this._isVrActive() || !this._trackHead()) {
      this._dwell = INITIAL_DWELL_STATE;
      this._hidePie();

      return;
    }

    const activeName = `annotation-${this.activeIndex}`;
    const candidates = collectAnnotationHitCandidates(this.app, GAZE_HIT_RADIUS_PAD).filter(
      (candidate) => candidate.entity.name !== activeName
    );
    this._headRot.transformVector(LOCAL_FORWARD, this._forward);
    const target = nearestAnnotationHit(this._headPos, this._forward, candidates);

    const result = advanceDwell(this._dwell, target, dt, DWELL_SECONDS);
    this._dwell = result.state;

    if (target !== null && result.progress > 0 && result.progress < 1) {
      this._showPie(candidates[target].entity, result.progress);
    } else {
      this._hidePie();
    }

    if (result.justOpened && target !== null) {
      const { entity, script } = candidates[target];
      const camera = this.app.root.findByName('camera') as any;
      const screen = camera?.camera?.worldToScreen(entity.getPosition());
      script.onVrOpenCallback(screen?.x ?? 0, screen?.y ?? 0);
    }
  }

  private _showPie(entity: any, progress: number) {
    if (!this._pieEntity) {
      return;
    }
    if (Math.abs(progress - this._drawnProgress) > 0.001) {
      this._drawnProgress = progress;
      this._drawPie(progress);
    }

    // The unit quad has half-extent HOTSPOT_HALF_EXTENT, so scale it to reach the desired world size.
    entity.getWorldTransform().getScale(this._scratchScale);
    const scale = this._scratchScale.x * PIE_RADIUS_SCALE;

    this._pieEntity.enabled = true;
    this._pieEntity.setLocalScale(scale, scale, scale);
    this._pieEntity.setPosition(entity.getPosition());
    this._pieEntity.setRotation(this._headRot);
  }

  private _hidePie() {
    if (this._pieEntity && this._pieEntity.enabled) {
      this._pieEntity.enabled = false;
      this._drawnProgress = -1;
    }
  }

  destroy() {
    if (this._pieEntity) {
      if (this._pieEntity.render) {
        this._pieEntity.render.meshInstances = [];
      }
      this._pieEntity.destroy();
      this._pieEntity = undefined;
    }
    this._pieMesh?.destroy();
    this._pieMaterial?.destroy();
    this._pieTexture?.destroy();
    this._pieMesh = undefined;
    this._pieMaterial = undefined;
    this._pieTexture = undefined;
  }
}
