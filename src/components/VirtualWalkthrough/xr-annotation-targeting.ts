import { Vec3 } from 'playcanvas';

export interface AnnotationHitCandidate {
  position: Vec3;
  radius: number;
}

// Reused across calls: this runs per candidate per frame, where fresh vectors would be steady GC churn.
const scratchDir = new Vec3();
const scratchToCenter = new Vec3();

/**
 * Distance along a (normalized) ray to where it first enters the sphere, or null if it never does.
 * A ray starting inside the sphere returns 0.
 */
const raySphereEntryDistance = (origin: Vec3, dir: Vec3, center: Vec3, radius: number): number | null => {
  const m = scratchToCenter.sub2(origin, center);
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
  const dir = scratchDir.copy(direction).normalize();
  let bestIndex: number | null = null;
  let bestDistance = Infinity;

  for (let index = 0; index < candidates.length; index++) {
    const candidate = candidates[index];
    const distance = raySphereEntryDistance(origin, dir, candidate.position, candidate.radius);
    if (distance !== null && distance < bestDistance) {
      bestDistance = distance;
      bestIndex = index;
    }
  }

  return bestIndex;
};
