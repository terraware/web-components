export interface HoldState {
  elapsed: number;
  armed: boolean;
}

export interface HoldUpdate {
  state: HoldState;
  progress: number;
  justFired: boolean;
}

export const INITIAL_HOLD_STATE: HoldState = { elapsed: 0, armed: false };

const RELEASED_STATE: HoldState = { elapsed: 0, armed: true };

/**
 * Advances a press-and-hold timer by one frame. `held` is whether the button is down right now.
 *
 * A hold only counts once a release has been seen, so a button that is already down when tracking
 * starts does nothing until the user lets go - otherwise entering a session with a thumb on the
 * button would fire `threshold` seconds later. `justFired` is true only on the frame elapsed first
 * reaches `threshold`, so continuing to hold fires once.
 */
export const advanceHold = (prev: HoldState, held: boolean, dt: number, threshold: number): HoldUpdate => {
  if (!held) {
    return { state: RELEASED_STATE, progress: 0, justFired: false };
  }
  if (!prev.armed) {
    return { state: prev, progress: 0, justFired: false };
  }

  const elapsed = Math.min(prev.elapsed + dt, threshold);
  const justFired = prev.elapsed < threshold && elapsed >= threshold;

  return { state: { elapsed, armed: true }, progress: elapsed / threshold, justFired };
};
