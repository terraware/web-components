import { Vec3 } from 'playcanvas';

import { nearestAnnotationHit } from './xr-annotation-interaction';

describe('nearestAnnotationHit', () => {
  const origin = new Vec3(0, 0, 5);
  const forward = new Vec3(0, 0, -1);

  it('returns null when there are no candidates', () => {
    expect(nearestAnnotationHit(origin, forward, [])).toBeNull();
  });

  it('returns null when the ray misses every candidate', () => {
    const candidates = [{ position: new Vec3(0, 5, 0), radius: 1 }];
    expect(nearestAnnotationHit(origin, forward, candidates)).toBeNull();
  });

  it('returns the index of a single hit candidate', () => {
    const candidates = [{ position: new Vec3(0, 0, 0), radius: 1 }];
    expect(nearestAnnotationHit(origin, forward, candidates)).toBe(0);
  });

  it('returns the nearest candidate when several are hit, regardless of order', () => {
    const far = { position: new Vec3(0, 0, -5), radius: 1 };
    const near = { position: new Vec3(0, 0, 0), radius: 1 };
    expect(nearestAnnotationHit(origin, forward, [far, near])).toBe(1);
  });

  it('treats a ray starting inside a sphere as the nearest hit', () => {
    const inside = { position: new Vec3(0, 0, 5), radius: 1 };
    const ahead = { position: new Vec3(0, 0, 0), radius: 1 };
    expect(nearestAnnotationHit(origin, forward, [ahead, inside])).toBe(1);
  });

  it('normalizes a non-unit direction', () => {
    const candidates = [{ position: new Vec3(0, 0, 0), radius: 1 }];
    expect(nearestAnnotationHit(origin, new Vec3(0, 0, -4), candidates)).toBe(0);
  });

  it('returns null when the only candidate is behind the ray origin', () => {
    const candidates = [{ position: new Vec3(0, 0, 0), radius: 1 }];
    expect(nearestAnnotationHit(origin, new Vec3(0, 0, 1), candidates)).toBeNull();
  });

  it('registers a tangent graze as a hit', () => {
    const candidates = [{ position: new Vec3(0, 0, 0), radius: 1 }];
    expect(nearestAnnotationHit(new Vec3(0, 1, 5), new Vec3(0, 0, -1), candidates)).toBe(0);
  });
});
