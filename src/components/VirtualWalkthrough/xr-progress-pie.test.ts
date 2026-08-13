import { pieShaderProgress } from './xr-progress-pie';

describe('pieShaderProgress', () => {
  it('passes an in-flight progress through unchanged', () => {
    expect(pieShaderProgress(0.4)).toBeCloseTo(0.4);
  });

  it('hides the pie before any progress has accumulated', () => {
    expect(pieShaderProgress(0)).toBe(0);
  });

  it('hides the pie once progress completes', () => {
    expect(pieShaderProgress(1)).toBe(0);
  });
});
