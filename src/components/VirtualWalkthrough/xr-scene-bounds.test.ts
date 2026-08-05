import { clampToCircle, distanceToCircleEdge } from './xr-scene-bounds';

describe('clampToCircle', () => {
  it('leaves a point inside the circle untouched', () => {
    expect(clampToCircle(1, 2, 0, 0, 5)).toEqual({ x: 1, z: 2, distance: 0 });
  });

  it('leaves a point exactly on the edge untouched', () => {
    expect(clampToCircle(5, 0, 0, 0, 5)).toEqual({ x: 5, z: 0, distance: 0 });
  });

  it('projects a point outside back onto the edge', () => {
    const result = clampToCircle(10, 0, 0, 0, 4);
    expect(result.x).toBeCloseTo(4);
    expect(result.z).toBeCloseTo(0);
    expect(result.distance).toBeCloseTo(6);
  });

  it('projects along the line from the center, preserving direction', () => {
    const result = clampToCircle(30, 40, 0, 0, 5);
    expect(result.x).toBeCloseTo(3);
    expect(result.z).toBeCloseTo(4);
    expect(result.distance).toBeCloseTo(45);
  });

  it('respects an off-origin center', () => {
    const result = clampToCircle(12, -3, 2, -3, 4);
    expect(result.x).toBeCloseTo(6);
    expect(result.z).toBeCloseTo(-3);
    expect(result.distance).toBeCloseTo(6);
  });

  it('leaves a point at the exact center untouched rather than dividing by zero', () => {
    const result = clampToCircle(2, -3, 2, -3, 4);
    expect(result).toEqual({ x: 2, z: -3, distance: 0 });
    expect(Number.isNaN(result.x)).toBe(false);
  });

  it('leaves the point untouched for a non-positive radius', () => {
    expect(clampToCircle(10, 10, 0, 0, 0)).toEqual({ x: 10, z: 10, distance: 0 });
    expect(clampToCircle(10, 10, 0, 0, -1)).toEqual({ x: 10, z: 10, distance: 0 });
  });
});

describe('distanceToCircleEdge', () => {
  it('is negative inside the circle', () => {
    expect(distanceToCircleEdge(1, 0, 0, 0, 5)).toBeCloseTo(-4);
  });

  it('is zero on the edge', () => {
    expect(distanceToCircleEdge(0, 5, 0, 0, 5)).toBeCloseTo(0);
  });

  it('is positive outside the circle', () => {
    expect(distanceToCircleEdge(8, 0, 0, 0, 5)).toBeCloseTo(3);
  });

  it('respects an off-origin center', () => {
    expect(distanceToCircleEdge(2, 9, 2, 3, 4)).toBeCloseTo(2);
  });
});
