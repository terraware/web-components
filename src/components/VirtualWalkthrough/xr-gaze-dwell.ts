import {
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

import { HOTSPOT_HALF_EXTENT, collectAnnotationHitCandidates } from './xr-annotation-candidates';
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

  initialize() {
    this._pieMask = emptyMaskTexture(this.app.graphicsDevice);
    this._pieMaterial = createProgressPieMaterial({
      uniqueName: 'xr-gaze-dwell-pie',
      maskMap: this._pieMask,
    });

    this._pieMesh = progressPieQuadMesh(this.app.graphicsDevice, HOTSPOT_HALF_EXTENT);
    const meshInstance = new MeshInstance(this._pieMesh, this._pieMaterial);

    this._pieEntity = new Entity('xr-gaze-dwell-pie');
    this._pieEntity.addComponent('render', { meshInstances: [meshInstance], layers: [LAYERID_IMMEDIATE] });
    this._pieEntity.enabled = false;
    this.entity.addChild(this._pieEntity);
  }

  update(dt: number) {
    if (!this._pieEntity || !this._pieMaterial) {
      return;
    }
    if (!this._isVrActive() || !this._trackHead()) {
      this._dwell = INITIAL_DWELL_STATE;
      this._pieEntity.enabled = false;

      return;
    }

    // Enabled for the whole session rather than only while a sweep runs. A mesh instance compiles
    // its shader variant the first time it is drawn, and that variant is cached against the camera
    // it was drawn for, so the quad has to be drawn by the XR camera to be of any use. Holding it
    // enabled from the first XR frame puts the compile in the session-start transition instead of on
    // the frame a pie first appears. At zero progress every fragment discards, so it costs nothing
    // visible in between.
    this._pieEntity.enabled = true;

    const activeName = `annotation-${this.activeIndex}`;
    const candidates = collectAnnotationHitCandidates(this.app, GAZE_HIT_RADIUS_PAD).filter(
      (candidate) => candidate.entity.name !== activeName
    );
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
      const camera = this.app.root.findByName('camera') as any;
      const screen = camera?.camera?.worldToScreen(entity.getPosition());
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
