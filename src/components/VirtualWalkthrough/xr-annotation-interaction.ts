import { Script, Vec3, XRTYPE_VR, XrInputSource } from 'playcanvas';

export interface AnnotationHitCandidate {
  position: Vec3;
  radius: number;
}

/**
 * Distance along a (normalized) ray to where it first enters the sphere, or null if it never does.
 * A ray starting inside the sphere returns 0.
 */
const raySphereEntryDistance = (origin: Vec3, dir: Vec3, center: Vec3, radius: number): number | null => {
  const m = new Vec3().sub2(origin, center);
  const b = m.dot(dir);
  const c = m.dot(m) - radius * radius;
  if (c > 0 && b > 0) {
    return null;
  }
  const disc = b * b - c;
  if (disc < 0) {
    return null;
  }
  const t = -b - Math.sqrt(disc);

  return t < 0 ? 0 : t;
};

/**
 * Index of the closest candidate sphere the ray enters, or null if it hits none.
 */
export const nearestAnnotationHit = (
  origin: Vec3,
  direction: Vec3,
  candidates: AnnotationHitCandidate[]
): number | null => {
  const dir = direction.clone().normalize();
  let bestIndex: number | null = null;
  let bestDistance = Infinity;

  candidates.forEach((candidate, index) => {
    const distance = raySphereEntryDistance(origin, dir, candidate.position, candidate.radius);
    if (distance !== null && distance < bestDistance) {
      bestDistance = distance;
      bestIndex = index;
    }
  });

  return bestIndex;
};

/** Local half-extent of the unit-plane hotspot quad. */
const HOTSPOT_HALF_EXTENT = 0.5;

/** Multiplier on the hotspot's world radius to make controller targeting forgiving. */
const HIT_RADIUS_PAD = 2.5;

/** PlayCanvas annotation script name. */
const ANNOTATION_SCRIPT_NAME = 'Annotation';

export class XrAnnotationInteraction extends Script {
  static scriptName = 'xrAnnotationInteraction';

  private _scratchScale = new Vec3();

  private _isVrActive = () => this.app.xr?.active === true && this.app.xr?.type === XRTYPE_VR;

  private _onSelect = (inputSource: XrInputSource) => {
    if (!this._isVrActive()) {
      return;
    }
    this._openAnnotationUnderRay(inputSource.getOrigin(), inputSource.getDirection());
  };

  private _collectAnnotationEntities() {
    const root = this.app.root.findByName('annotations-root');

    return root ? root.children : [];
  }

  private _hitRadius(entity: any): number {
    entity.getWorldTransform().getScale(this._scratchScale);

    return HOTSPOT_HALF_EXTENT * this._scratchScale.x * HIT_RADIUS_PAD;
  }

  private _openAnnotationUnderRay(origin: Vec3, direction: Vec3) {
    const entities = this._collectAnnotationEntities();
    const openable = entities
      .map((ent: any) => ({ entity: ent, script: ent.script?.get(ANNOTATION_SCRIPT_NAME) }))
      .filter(({ script: scr }: any) => scr && scr.enabled !== false && typeof scr.onVrOpenCallback === 'function');

    const candidates = openable.map(({ entity: ent }: any) => ({
      position: ent.getPosition(),
      radius: this._hitRadius(ent),
    }));

    const index = nearestAnnotationHit(origin, direction, candidates);
    if (index === null) {
      return;
    }

    const { entity, script } = openable[index];
    const camera = this.app.root.findByName('camera') as any;
    const screen = camera?.camera?.worldToScreen(entity.getPosition());
    script.onVrOpenCallback(screen?.x ?? 0, screen?.y ?? 0);
  }

  initialize() {
    this.app.xr?.input?.on('select', this._onSelect);
  }

  destroy() {
    this.app.xr?.input?.off('select', this._onSelect);
  }
}
