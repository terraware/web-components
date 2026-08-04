import { Color, Quat, Script, Vec3, XRTYPE_VR } from 'playcanvas';

import { collectAnnotationHitCandidates } from './xr-annotation-candidates';
import { nearestAnnotationHit } from './xr-annotation-targeting';
import { DwellState, INITIAL_DWELL_STATE, advanceDwell } from './xr-gaze-dwell-state';

/** Multiplier on the hotspot's world radius for gaze targeting. */
const GAZE_HIT_RADIUS_PAD = 2.5;

/** Seconds of continuous gaze required to open an annotation. */
const DWELL_SECONDS = 1.5;

/** Local half-extent of the unit-plane hotspot quad. */
const HOTSPOT_HALF_EXTENT = 0.5;

/** Ring radius as a multiple of the hotspot's rendered half-extent (just outside the hotspot). */
const RING_RADIUS_SCALE = 1.4;

/** Segments in a full (100%) ring. */
const RING_SEGMENTS = 48;

const RING_COLOR = new Color(0.25, 0.8, 1);

const LOCAL_FORWARD = new Vec3(0, 0, -1);
const LOCAL_RIGHT = new Vec3(1, 0, 0);
const LOCAL_UP = new Vec3(0, 1, 0);

export class XrGazeDwell extends Script {
  static scriptName = 'xrGazeDwell';

  private _dwell: DwellState = INITIAL_DWELL_STATE;

  private _headPos = new Vec3();
  private _headRot = new Quat();
  private _viewOffset = new Vec3();
  private _forward = new Vec3();
  private _right = new Vec3();
  private _up = new Vec3();
  private _scratchScale = new Vec3();
  private _p0 = new Vec3();
  private _p1 = new Vec3();

  private _isVrActive = () => this.app.xr?.active === true && this.app.xr?.type === XRTYPE_VR;

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
    if (!this._isVrActive() || !this._trackHead()) {
      this._dwell = INITIAL_DWELL_STATE;

      return;
    }

    const candidates = collectAnnotationHitCandidates(this.app, GAZE_HIT_RADIUS_PAD);
    this._headRot.transformVector(LOCAL_FORWARD, this._forward);
    const target = nearestAnnotationHit(this._headPos, this._forward, candidates);

    const result = advanceDwell(this._dwell, target, dt, DWELL_SECONDS);
    this._dwell = result.state;

    if (target !== null && result.progress > 0 && result.progress < 1) {
      this._drawRing(candidates[target].entity, result.progress);
    }

    if (result.justOpened && target !== null) {
      const { entity, script } = candidates[target];
      const camera = this.app.root.findByName('camera') as any;
      const screen = camera?.camera?.worldToScreen(entity.getPosition());
      script.onVrOpenCallback(screen?.x ?? 0, screen?.y ?? 0);
    }
  }

  private _drawRing(entity: any, progress: number) {
    const center = entity.getPosition();
    entity.getWorldTransform().getScale(this._scratchScale);
    const radius = HOTSPOT_HALF_EXTENT * this._scratchScale.x * RING_RADIUS_SCALE;

    this._headRot.transformVector(LOCAL_RIGHT, this._right);
    this._headRot.transformVector(LOCAL_UP, this._up);

    const segments = Math.max(1, Math.ceil(progress * RING_SEGMENTS));
    const step = (Math.PI * 2) / RING_SEGMENTS;
    for (let i = 0; i < segments; i++) {
      this._ringPoint(center, radius, i * step, this._p0);
      this._ringPoint(center, radius, (i + 1) * step, this._p1);
      this.app.drawLine(this._p0, this._p1, RING_COLOR, false);
    }
  }

  private _ringPoint(center: Vec3, radius: number, angle: number, out: Vec3) {
    const c = Math.cos(angle) * radius;
    const s = Math.sin(angle) * radius;
    out.set(
      center.x + this._right.x * c + this._up.x * s,
      center.y + this._right.y * c + this._up.y * s,
      center.z + this._right.z * c + this._up.z * s
    );
  }
}
