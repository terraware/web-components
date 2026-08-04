import { Vec3 } from 'playcanvas';

export interface QuadHit {
  u: number;
  v: number;
}

/**
 * Intersects the ray with the rectangle centred at `center` and spanned by unit axes `right`/`up`,
 * returning the hit in normalized quad coordinates (u,v in [-1,1]) or null. `u`/`v` divide the
 * in-plane offset by `halfWidth`/`halfHeight`. Null when the ray is parallel to the plane, the
 * plane is behind the origin, or the hit lands outside the rectangle.
 */
export const rayQuadHit = (
  origin: Vec3,
  direction: Vec3,
  center: Vec3,
  right: Vec3,
  up: Vec3,
  halfWidth: number,
  halfHeight: number
): QuadHit | null => {
  const dir = direction.clone().normalize();
  const normal = new Vec3().cross(right, up);
  const denom = dir.dot(normal);
  if (Math.abs(denom) < 1e-6) {
    return null;
  }

  const t = new Vec3().sub2(center, origin).dot(normal) / denom;
  if (t < 0) {
    return null;
  }

  const offset = new Vec3().copy(dir).mulScalar(t).add(origin).sub(center);
  const u = offset.dot(right) / halfWidth;
  const v = offset.dot(up) / halfHeight;
  if (u < -1 || u > 1 || v < -1 || v > 1) {
    return null;
  }

  return { u, v };
};
