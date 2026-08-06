import { Vec3 } from 'playcanvas';
import { Annotation as PcAnnotation } from 'playcanvas/scripts/esm/annotations.mjs';

/** Local half-extent of the unit-plane hotspot quad. */
export const HOTSPOT_HALF_EXTENT = 0.5;

export interface AnnotationCandidate {
  entity: any;
  script: any;
  position: Vec3;
  radius: number;
}

const scratchScale = new Vec3();

/**
 * World-space hit candidates for every openable annotation hotspot: its entity, its stock
 * annotation script (which carries `onVrOpenCallback`), its world position, and a hit-sphere
 * radius derived from the hotspot's rendered world size, padded by `radiusPad` for easier aiming.
 */
export const collectAnnotationHitCandidates = (app: any, radiusPad: number): AnnotationCandidate[] => {
  const root = app.root.findByName('annotations-root');
  if (!root) {
    return [];
  }

  return root.children
    .map((entity: any) => ({ entity, script: entity.script?.get(PcAnnotation.scriptName) }))
    .filter(({ script }: any) => script && script.enabled !== false && typeof script.onVrOpenCallback === 'function')
    .map(({ entity, script }: any) => {
      entity.getWorldTransform().getScale(scratchScale);

      return {
        entity,
        script,
        position: entity.getPosition(),
        radius: HOTSPOT_HALF_EXTENT * scratchScale.x * radiusPad,
      };
    });
};
