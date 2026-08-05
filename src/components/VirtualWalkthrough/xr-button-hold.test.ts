import { HoldState, INITIAL_HOLD_STATE, advanceHold } from './xr-button-hold';

const THRESHOLD = 1.25;

/** Arms the timer the way a real release does, so a press can start accumulating. */
const released = (): HoldState => advanceHold(INITIAL_HOLD_STATE, false, 0.1, THRESHOLD).state;

describe('advanceHold', () => {
  it('ignores a button that is already held when tracking starts', () => {
    const result = advanceHold(INITIAL_HOLD_STATE, true, 2, THRESHOLD);

    expect(result.progress).toBe(0);
    expect(result.justFired).toBe(false);
  });

  it('stays unarmed for as long as a pre-held button is down', () => {
    let state = INITIAL_HOLD_STATE;
    for (let frame = 0; frame < 5; frame += 1) {
      state = advanceHold(state, true, 1, THRESHOLD).state;
    }

    expect(advanceHold(state, true, 1, THRESHOLD).justFired).toBe(false);
  });

  it('arms on release so the next press accumulates', () => {
    expect(advanceHold(released(), true, 0.5, THRESHOLD).progress).toBeCloseTo(0.4);
  });

  it('accumulates progress across frames', () => {
    let state = released();
    let progress = 0;
    for (let frame = 0; frame < 3; frame += 1) {
      const result = advanceHold(state, true, 0.25, THRESHOLD);
      state = result.state;
      progress = result.progress;
    }

    expect(progress).toBeCloseTo(0.6);
  });

  it('fires once when the hold reaches the threshold', () => {
    const partial = advanceHold(released(), true, 1, THRESHOLD).state;
    const firing = advanceHold(partial, true, 1, THRESHOLD);

    expect(firing.justFired).toBe(true);
    expect(firing.progress).toBe(1);
    expect(advanceHold(firing.state, true, 1, THRESHOLD).justFired).toBe(false);
  });

  it('clamps progress to the threshold', () => {
    const result = advanceHold(released(), true, 99, THRESHOLD);

    expect(result.progress).toBe(1);
    expect(result.justFired).toBe(true);
  });

  it('resets to zero on release', () => {
    const partial = advanceHold(released(), true, 1, THRESHOLD).state;
    const result = advanceHold(partial, false, 0.1, THRESHOLD);

    expect(result.progress).toBe(0);
    expect(result.state.elapsed).toBe(0);
  });

  it('fires again only after a fresh press', () => {
    const fired = advanceHold(advanceHold(released(), true, 1, THRESHOLD).state, true, 1, THRESHOLD).state;
    const afterRelease = advanceHold(fired, false, 0.1, THRESHOLD).state;
    const rePressed = advanceHold(afterRelease, true, 1, THRESHOLD);

    expect(rePressed.justFired).toBe(false);
    expect(advanceHold(rePressed.state, true, 1, THRESHOLD).justFired).toBe(true);
  });
});
