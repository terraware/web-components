import { fromWorldScale, toWorldScale } from './scene-scale';

describe('toWorldScale', () => {
  it('scales every axis by the scale factor', () => {
    expect(toWorldScale([1, 0.1, -2], 15)).toEqual([15, 1.5, -30]);
  });

  it('is a no-op at a scale factor of 1', () => {
    expect(toWorldScale([1, 0.1, -2], 1)).toEqual([1, 0.1, -2]);
  });

  it('does not mutate the input', () => {
    const point: [number, number, number] = [1, 2, 3];
    toWorldScale(point, 15);
    expect(point).toEqual([1, 2, 3]);
  });
});

describe('fromWorldScale', () => {
  it('round-trips a point scaled to world space', () => {
    const point: [number, number, number] = [1, 0.1, -2];
    const [x, y, z] = fromWorldScale(toWorldScale(point, 15), 15);
    expect(x).toBeCloseTo(1);
    expect(y).toBeCloseTo(0.1);
    expect(z).toBeCloseTo(-2);
  });

  it('passes the point through at a scale factor of 0 rather than dividing by zero', () => {
    expect(fromWorldScale([1, 2, 3], 0)).toEqual([1, 2, 3]);
  });
});
