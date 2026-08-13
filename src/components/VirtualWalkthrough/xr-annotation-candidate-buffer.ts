import { Vec3 } from 'playcanvas';

/** Local half-extent of the unit-plane hotspot quad. */
export const HOTSPOT_HALF_EXTENT = 0.5;

export interface AnnotationCandidate {
  entity: any;
  script: any;
  position: Vec3;
  radius: number;
}

/** Pulls the stock annotation script off a hotspot entity, or undefined if it carries none. */
export type AnnotationScriptLookup = (entity: any) => any;

const scratchScale = new Vec3();

/**
 * Whether `node` still hangs beneath `sceneRoot`. An entity that has been removed from the scene
 * keeps its own `children` array - a destroyed one keeps it as an empty array - so only a walk back
 * up the parent chain tells a live root apart from a detached one.
 */
const isInScene = (node: any, sceneRoot: any): boolean => {
  for (let current = node; current; current = current.parent) {
    if (current === sceneRoot) {
      return true;
    }
  }

  return false;
};

/**
 * Collects world-space hit candidates for the openable annotation hotspots into a buffer it owns and
 * reuses, so a caller running every frame allocates nothing. The returned array and the candidate
 * objects inside it are overwritten by the next `collect`, which is why each caller holds its own
 * buffer rather than sharing one.
 *
 * Positions and radii are re-read on every call, so hotspots that move or resize stay targetable.
 * That read is cheap; it is the allocation around it that a per-frame caller cannot afford.
 */
export class AnnotationCandidateBuffer {
  private readonly _candidates: AnnotationCandidate[] = [];
  private _root: any = null;

  constructor(private readonly _getScript: AnnotationScriptLookup) {}

  /**
   * Hit candidates for every openable hotspot except `excludeName`, with hit spheres derived from
   * each hotspot's rendered world size and padded by `radiusPad` for easier aiming.
   */
  collect(app: any, radiusPad: number, excludeName?: string): AnnotationCandidate[] {
    // The root is looked up by a walk of the whole scene graph, so it is held onto between frames.
    // It is re-resolved whenever it leaves the scene: annotations mount after the scene does, and
    // the root is torn down and built afresh every time the annotation list empties and refills.
    if (!isInScene(this._root, app.root)) {
      this._root = app.root.findByName('annotations-root');
    }

    const children = this._root?.children;
    if (!children) {
      this._candidates.length = 0;

      return this._candidates;
    }

    let count = 0;
    for (const entity of children) {
      if (excludeName !== undefined && entity.name === excludeName) {
        continue;
      }

      const script = this._getScript(entity);
      if (!script || script.enabled === false || typeof script.onVrOpenCallback !== 'function') {
        continue;
      }

      entity.getWorldTransform().getScale(scratchScale);
      const radius = HOTSPOT_HALF_EXTENT * scratchScale.x * radiusPad;
      const existing = this._candidates[count];

      if (existing) {
        existing.entity = entity;
        existing.script = script;
        existing.position = entity.getPosition();
        existing.radius = radius;
      } else {
        this._candidates.push({ entity, script, position: entity.getPosition(), radius });
      }
      count++;
    }

    this._candidates.length = count;

    return this._candidates;
  }
}
