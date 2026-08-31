import {
  CameraComponent,
  Entity,
  LAYERID_IMMEDIATE,
  Mesh,
  MeshInstance,
  Quat,
  Script,
  ShaderMaterial,
  Texture,
  Vec3,
  XRTYPE_VR,
} from 'playcanvas';

import { HOTSPOT_HALF_EXTENT, createAnnotationCandidateBuffer } from './xr-annotation-candidates';
import { nearestAnnotationHit } from './xr-annotation-targeting';
import { DwellState, INITIAL_DWELL_STATE, advanceDwell } from './xr-gaze-dwell-state';
import { pieShaderProgress } from './xr-progress-pie';
import { createProgressPieMaterial, emptyMaskTexture, progressPieQuadMesh } from './xr-progress-pie-material';

/** Multiplier on the hotspot's world radius for gaze targeting. */
const GAZE_HIT_RADIUS_PAD = 5;

/** Seconds of continuous gaze required to open an annotation. */
const DWELL_SECONDS = 1.25;

/** Progress-pie quad radius as a multiple of the hotspot's rendered half-extent (covers the hotspot). */
const PIE_RADIUS_SCALE = 1.25;

const LOCAL_FORWARD = new Vec3(0, 0, -1);

export class XrGazeDwell extends Script {
  static scriptName = 'xrGazeDwell';

  /** Index of the annotation whose panel is currently open, or -1. Excluded from gaze targets so
   * dwell opens OTHER annotations while one is open (and never re-dwells the open one). */
  activeIndex = -1;

  private _dwell: DwellState = INITIAL_DWELL_STATE;
  private _candidates = createAnnotationCandidateBuffer();

  private _pieEntity?: Entity;
  private _pieMaterial?: ShaderMaterial;
  private _pieMesh?: Mesh;
  private _pieMask?: Texture;

  private _headPos = new Vec3();
  private _headRot = new Quat();
  private _viewOffset = new Vec3();
  private _forward = new Vec3();
  private _scratchScale = new Vec3();

  private _isVrActive = () => this.app.xr?.active === true && this.app.xr?.type === XRTYPE_VR;

  /**
   * A render component hands its mesh instances to a layer only when it flips from disabled to
   * enabled, and hands over nothing if the layer cannot be resolved yet. The session events are the
   * points where the layers are known to exist, so the pie flips there: start registers it, and end
   * restores the transition for the next session.
   */
  private _onXrStart = () => {
    this._dwell = INITIAL_DWELL_STATE;
    this._setPieEnabled(this._isVrActive());
  };

  private _onXrEnd = () => {
    this._dwell = INITIAL_DWELL_STATE;
    this._pieMaterial?.setParameter('uProgress', 0);
    this._setPieEnabled(false);
  };

  private _setPieEnabled(enabled: boolean) {
    if (this._pieEntity) {
      this._pieEntity.enabled = enabled;
    }
  }

  initialize() {
    this._pieMask = emptyMaskTexture(this.app.graphicsDevice);
    this._pieMaterial = createProgressPieMaterial({
      uniqueName: 'xr-gaze-dwell-pie',
      maskMap: this._pieMask,
    });

    this._pieMesh = progressPieQuadMesh(this.app.graphicsDevice, HOTSPOT_HALF_EXTENT);
    const meshInstance = new MeshInstance(this._pieMesh, this._pieMaterial);

    // Never frustum-culled. The quad only takes a position once a sweep starts, and until then sits
    // at the origin where culling would drop it from the render list - taking the shader compile it
    // stays enabled for along with it. An always-submitted quad that discards every fragment costs
    // less than that compile landing mid-gaze.
    meshInstance.cull = false;

    this._pieEntity = new Entity('xr-gaze-dwell-pie');
    this._pieEntity.addComponent('render', { meshInstances: [meshInstance], layers: [LAYERID_IMMEDIATE] });
    this._pieEntity.enabled = false;
    this.entity.addChild(this._pieEntity);

    // Both orders happen: the walkthrough can mount into a session that has already started (as it
    // does when VR is entered from outside the canvas), or mount first and wait for one.
    this._setPieEnabled(this._isVrActive());
    this.app.xr?.on('start', this._onXrStart);
    this.app.xr?.on('end', this._onXrEnd);
  }

  update(dt: number) {
    if (!this._pieEntity || !this._pieMaterial) {
      return;
    }
    if (!this._isVrActive() || !this._trackHead()) {
      this._dwell = INITIAL_DWELL_STATE;
      this._pieMaterial.setParameter('uProgress', 0);

      return;
    }

    const candidates = this._candidates.collect(this.app, GAZE_HIT_RADIUS_PAD, `annotation-${this.activeIndex}`);
    this._headRot.transformVector(LOCAL_FORWARD, this._forward);
    const target = nearestAnnotationHit(this._headPos, this._forward, candidates);

    const result = advanceDwell(this._dwell, target, dt, DWELL_SECONDS);
    this._dwell = result.state;

    const progress = pieShaderProgress(result.progress);
    this._pieMaterial.setParameter('uProgress', progress);
    if (progress > 0 && target !== null) {
      this._placePie(candidates[target].entity);
    }

    if (result.justOpened && target !== null) {
      const { entity, script } = candidates[target];
      const camera = this.app.root.findComponent('camera') as CameraComponent | null;
      const screen = camera?.worldToScreen(entity.getPosition());
      script.onVrOpenCallback(screen?.x ?? 0, screen?.y ?? 0);
    }
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

  /** Sits the pie on the hotspot, square to the head. */
  private _placePie(entity: any) {
    if (!this._pieEntity) {
      return;
    }

    // The unit quad has half-extent HOTSPOT_HALF_EXTENT, so scale it to reach the desired world size.
    entity.getWorldTransform().getScale(this._scratchScale);
    const scale = this._scratchScale.x * PIE_RADIUS_SCALE;

    this._pieEntity.setLocalScale(scale, scale, scale);
    this._pieEntity.setPosition(entity.getPosition());
    this._pieEntity.setRotation(this._headRot);
  }

  destroy() {
    this.app.xr?.off('start', this._onXrStart);
    this.app.xr?.off('end', this._onXrEnd);
    if (this._pieEntity) {
      if (this._pieEntity.render) {
        this._pieEntity.render.meshInstances = [];
      }
      this._pieEntity.destroy();
      this._pieEntity = undefined;
    }
    this._pieMesh?.destroy();
    this._pieMaterial?.destroy();
    this._pieMask?.destroy();
    this._pieMesh = undefined;
    this._pieMaterial = undefined;
    this._pieMask = undefined;
  }
}
