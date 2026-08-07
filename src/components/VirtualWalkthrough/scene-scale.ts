/**
 * Scene-space points — `origin`, `cameraPosition`, annotation positions — are expressed in the
 * splat's own coordinates, which the `content-root` entity scales by `scaleFactor`. The camera rig
 * sits outside that entity, so any scene point handed to the camera has to be converted to world
 * space first, the same way `cameraBoundsCenter` and the ground plane already are.
 */
export const toWorldScale = (point: [number, number, number], scaleFactor: number): [number, number, number] => [
  point[0] * scaleFactor,
  point[1] * scaleFactor,
  point[2] * scaleFactor,
];

/**
 * Inverse of {@link toWorldScale}, for reporting a camera pose back in the coordinates the viewer's
 * props are written in. A scaleFactor of 0 collapses the scene, leaving no scene-space point to
 * report, so the world point is passed through rather than divided into infinities.
 */
export const fromWorldScale = (point: [number, number, number], scaleFactor: number): [number, number, number] =>
  scaleFactor === 0 ? [...point] : toWorldScale(point, 1 / scaleFactor);
