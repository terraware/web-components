import { Annotation as PcAnnotation } from 'playcanvas/scripts/esm/annotations.mjs';

import { AnnotationCandidate, AnnotationCandidateBuffer, HOTSPOT_HALF_EXTENT } from './xr-annotation-candidate-buffer';

export { HOTSPOT_HALF_EXTENT };
export type { AnnotationCandidate };

/** Multiplier on the hotspot's world radius to make controller targeting forgiving. */
export const HIT_RADIUS_PAD = 2.5;

const annotationScriptOf = (entity: any) => entity.script?.get(PcAnnotation.scriptName);

/** A buffer wired to the stock annotation script. Callers that collect every frame hold one of
 * these; its results are overwritten on the next collect, so one buffer cannot be shared. */
export const createAnnotationCandidateBuffer = (): AnnotationCandidateBuffer =>
  new AnnotationCandidateBuffer(annotationScriptOf);

/**
 * One-shot collection for callers that run on an input event rather than every frame, and so have no
 * reason to hold a buffer of their own.
 */
export const collectAnnotationHitCandidates = (app: any, radiusPad: number): AnnotationCandidate[] =>
  createAnnotationCandidateBuffer().collect(app, radiusPad);
