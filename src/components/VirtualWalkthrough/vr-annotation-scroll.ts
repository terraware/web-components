/** Deflection the stick must pass before the text moves, so a resting thumb doesn't drift it. */
export const SCROLL_DEADZONE = 0.15;

/** Canvas px per second at full deflection. */
export const SCROLL_SPEED = 1200;

interface ThumbstickSource {
  handedness: string;
  gamepad?: { axes: ArrayLike<number> } | null;
}

/**
 * Thumbstick Y for a source that can scroll the panel. Only the right hand scrolls: the left
 * stick drives locomotion, and right-stick Y is free because snap-vertical is turned off.
 * Hand-tracked sources report a gamepad with no axes, which would read as NaN.
 */
export const readScrollAxis = (inputSource: ThumbstickSource): number => {
  const axes = inputSource.gamepad?.axes;
  if (inputSource.handedness !== 'right' || !axes || axes.length < 4) {
    return 0;
  }

  return axes[3];
};

/**
 * Advances the scroll position for one frame of stick deflection, ramping from a standstill at
 * the deadzone edge. A forward push reports negative Y and moves further into the text.
 */
export const nextScrollY = (scrollY: number, axisY: number, dt: number, maxScroll: number): number => {
  const magnitude = Math.abs(axisY);
  if (magnitude <= SCROLL_DEADZONE) {
    return Math.min(Math.max(scrollY, 0), maxScroll);
  }

  const ramped = (magnitude - SCROLL_DEADZONE) / (1 - SCROLL_DEADZONE);
  const delta = -Math.sign(axisY) * ramped * SCROLL_SPEED * dt;

  return Math.min(Math.max(scrollY + delta, 0), maxScroll);
};
