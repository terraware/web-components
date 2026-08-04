import { Vec3 } from 'playcanvas';

import { VrAnnotationPanel } from './vr-annotation-panel';
import { HIT_RADIUS_PAD, collectAnnotationHitCandidates } from './xr-annotation-candidates';
import { nearestAnnotationHit } from './xr-annotation-targeting';
import { XrExitButton } from './xr-exit-button';

/** True when the ray points at an openable annotation hotspot. */
export const rayHitsAnnotationHotspot = (app: any, origin: Vec3, direction: Vec3): boolean =>
  nearestAnnotationHit(origin, direction, collectAnnotationHitCandidates(app, HIT_RADIUS_PAD)) !== null;

/** True when the ray points at the open VR annotation panel. False when no panel is mounted. */
export const rayHitsAnnotationPanel = (app: any, origin: Vec3, direction: Vec3): boolean => {
  const script = app.root.findByName('vr-annotation-panel')?.script?.get(VrAnnotationPanel.scriptName);

  return typeof script?.rayHitsPanel === 'function' && script.rayHitsPanel(origin, direction) === true;
};

/** True when the ray points at the VR exit button. */
export const rayHitsExitButton = (app: any, origin: Vec3, direction: Vec3): boolean => {
  const script = app.root.findByName('xr-exit-button')?.script?.get(XrExitButton.scriptName);

  return typeof script?.rayHitsButton === 'function' && script.rayHitsButton(origin, direction) === true;
};

/**
 * True when the ray points at anything the trigger is meant to operate. Teleport consults this so a
 * select that lands on UI doesn't also move the rig.
 */
export const rayHitsInteractiveUi = (app: any, origin: Vec3, direction: Vec3): boolean =>
  rayHitsAnnotationHotspot(app, origin, direction) ||
  rayHitsAnnotationPanel(app, origin, direction) ||
  rayHitsExitButton(app, origin, direction);
