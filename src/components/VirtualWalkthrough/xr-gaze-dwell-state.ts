export interface DwellState {
  targetIndex: number | null;
  elapsed: number;
}

export interface DwellUpdate {
  state: DwellState;
  progress: number;
  justOpened: boolean;
}

export const INITIAL_DWELL_STATE: DwellState = { targetIndex: null, elapsed: 0 };

/**
 * Advances gaze-dwell timing for one frame. `target` is the annotation index currently under the
 * gaze ray, or null. Dwell time accumulates while the same target is held and resets when it
 * changes or is lost. `justOpened` is true only on the frame the dwell first reaches `threshold`.
 */
export const advanceDwell = (prev: DwellState, target: number | null, dt: number, threshold: number): DwellUpdate => {
  if (target === null) {
    return { state: INITIAL_DWELL_STATE, progress: 0, justOpened: false };
  }
  if (target !== prev.targetIndex) {
    return { state: { targetIndex: target, elapsed: 0 }, progress: 0, justOpened: false };
  }

  const elapsed = Math.min(prev.elapsed + dt, threshold);
  const justOpened = prev.elapsed < threshold && elapsed >= threshold;

  return { state: { targetIndex: target, elapsed }, progress: elapsed / threshold, justOpened };
};
