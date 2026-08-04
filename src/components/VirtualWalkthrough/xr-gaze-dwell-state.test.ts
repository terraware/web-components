import { INITIAL_DWELL_STATE, advanceDwell } from './xr-gaze-dwell-state';

const THRESHOLD = 1.5;

describe('advanceDwell', () => {
  it('stays reset when there is no gaze target', () => {
    const r = advanceDwell({ targetIndex: 2, elapsed: 1.0 }, null, 0.1, THRESHOLD);
    expect(r.state).toEqual(INITIAL_DWELL_STATE);
    expect(r.progress).toBe(0);
    expect(r.justOpened).toBe(false);
  });

  it('resets to zero when the target changes', () => {
    const r = advanceDwell({ targetIndex: 0, elapsed: 1.0 }, 1, 0.1, THRESHOLD);
    expect(r.state).toEqual({ targetIndex: 1, elapsed: 0 });
    expect(r.progress).toBe(0);
    expect(r.justOpened).toBe(false);
  });

  it('accumulates dwell time while the same target is held', () => {
    const r = advanceDwell({ targetIndex: 3, elapsed: 0.5 }, 3, 0.25, THRESHOLD);
    expect(r.state).toEqual({ targetIndex: 3, elapsed: 0.75 });
    expect(r.progress).toBeCloseTo(0.5, 5);
    expect(r.justOpened).toBe(false);
  });

  it('fires justOpened once when crossing the threshold and clamps elapsed', () => {
    const r = advanceDwell({ targetIndex: 3, elapsed: 1.4 }, 3, 0.5, THRESHOLD);
    expect(r.justOpened).toBe(true);
    expect(r.progress).toBe(1);
    expect(r.state).toEqual({ targetIndex: 3, elapsed: THRESHOLD });
  });

  it('does not re-fire while the target stays held past the threshold', () => {
    const r = advanceDwell({ targetIndex: 3, elapsed: THRESHOLD }, 3, 0.5, THRESHOLD);
    expect(r.justOpened).toBe(false);
    expect(r.progress).toBe(1);
    expect(r.state).toEqual({ targetIndex: 3, elapsed: THRESHOLD });
  });
});
