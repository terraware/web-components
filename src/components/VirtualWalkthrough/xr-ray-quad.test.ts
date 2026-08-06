import { Vec3 } from 'playcanvas';

import { rayQuadHit } from './xr-ray-quad';

const CENTER = new Vec3(0, 0, 0);
const RIGHT = new Vec3(1, 0, 0);
const UP = new Vec3(0, 1, 0);

describe('rayQuadHit', () => {
  it('hits the centre straight on', () => {
    const hit = rayQuadHit(new Vec3(0, 0, 5), new Vec3(0, 0, -1), CENTER, RIGHT, UP, 1, 1);
    expect(hit).not.toBeNull();
    expect(hit?.u).toBeCloseTo(0, 5);
    expect(hit?.v).toBeCloseTo(0, 5);
  });

  it('maps an off-centre hit to normalized quad coordinates', () => {
    const hit = rayQuadHit(new Vec3(0.5, -0.25, 5), new Vec3(0, 0, -1), CENTER, RIGHT, UP, 1, 1);
    expect(hit?.u).toBeCloseTo(0.5, 5);
    expect(hit?.v).toBeCloseTo(-0.25, 5);
  });

  it('returns null when the hit falls outside the rectangle', () => {
    expect(rayQuadHit(new Vec3(2, 0, 5), new Vec3(0, 0, -1), CENTER, RIGHT, UP, 1, 1)).toBeNull();
  });

  it('returns null for a ray parallel to the quad plane', () => {
    expect(rayQuadHit(new Vec3(0, 0, 5), new Vec3(1, 0, 0), CENTER, RIGHT, UP, 1, 1)).toBeNull();
  });

  it('returns null when the quad is behind the ray origin', () => {
    expect(rayQuadHit(new Vec3(0, 0, 5), new Vec3(0, 0, 1), CENTER, RIGHT, UP, 1, 1)).toBeNull();
  });

  it('respects half extents (scales u/v by them)', () => {
    // half width 2: an x offset of 1 maps to u = 0.5.
    const hit = rayQuadHit(new Vec3(1, 0, 5), new Vec3(0, 0, -1), CENTER, RIGHT, UP, 2, 1);
    expect(hit?.u).toBeCloseTo(0.5, 5);
  });

  it('normalizes a non-unit ray direction', () => {
    const hit = rayQuadHit(new Vec3(0, 0, 5), new Vec3(0, 0, -3), CENTER, RIGHT, UP, 1, 1);
    expect(hit).not.toBeNull();
    expect(hit?.u).toBeCloseTo(0, 5);
  });
});
