import { Vec3 } from 'playcanvas';

/**
 * Boolean ray-sphere hit test. Treats the ray as a half-line (t >= 0) and returns true when it
 * intersects the sphere or starts inside it. `direction` is normalized internally.
 */
export const raySphereIntersect = (origin: Vec3, direction: Vec3, center: Vec3, radius: number): boolean => {
  const dir = direction.clone().normalize();
  const m = new Vec3().sub2(origin, center);
  const b = m.dot(dir);
  const c = m.dot(m) - radius * radius;
  if (c > 0 && b > 0) {
    return false;
  }
  return b * b - c >= 0;
};
