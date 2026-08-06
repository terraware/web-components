/** A world-space XZ point clamped into the bounds circle, and how far it had to move to get there. */
export type ClampResult = { x: number; z: number; distance: number };

/**
 * Clamp a world-space XZ point into the circle of `radius` about (centerX, centerZ).
 *
 * `distance` is how far the point was moved and is 0 whenever the point was already inside, which
 * callers use as the "was this clamped?" signal. A non-positive radius means "no bounds" and leaves
 * the point untouched; so does a point at the exact center, which has no direction to project along.
 */
export const clampToCircle = (x: number, z: number, centerX: number, centerZ: number, radius: number): ClampResult => {
  if (radius <= 0) {
    return { x, z, distance: 0 };
  }

  const dx = x - centerX;
  const dz = z - centerZ;
  const dist = Math.sqrt(dx * dx + dz * dz);
  if (dist <= radius) {
    return { x, z, distance: 0 };
  }

  const scale = radius / dist;

  return { x: centerX + dx * scale, z: centerZ + dz * scale, distance: dist - radius };
};

/** Horizontal distance from a world-space XZ point to the circle's edge: negative inside, positive outside. */
export const distanceToCircleEdge = (
  x: number,
  z: number,
  centerX: number,
  centerZ: number,
  radius: number
): number => {
  const dx = x - centerX;
  const dz = z - centerZ;

  return Math.sqrt(dx * dx + dz * dz) - radius;
};
