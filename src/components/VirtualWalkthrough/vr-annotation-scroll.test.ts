import { SCROLL_DEADZONE, SCROLL_SPEED, nextScrollY, readScrollAxis } from './vr-annotation-scroll';

const source = (handedness: string, axes?: number[]) =>
  ({ handedness, gamepad: axes ? { axes } : null }) as Parameters<typeof readScrollAxis>[0];

describe('readScrollAxis', () => {
  it('reads the right thumbstick Y axis', () => {
    expect(readScrollAxis(source('right', [0, 0, 0.2, -0.8]))).toBe(-0.8);
  });

  it('ignores the left hand, which still drives locomotion', () => {
    expect(readScrollAxis(source('left', [0, 0, 0.2, -0.8]))).toBe(0);
  });

  it('ignores sources without a gamepad', () => {
    expect(readScrollAxis(source('right'))).toBe(0);
  });

  it('ignores gamepads without thumbstick axes, which read as NaN', () => {
    expect(readScrollAxis(source('right', [0, 0]))).toBe(0);
  });
});

describe('nextScrollY', () => {
  it('holds position for deflections inside the deadzone', () => {
    expect(nextScrollY(100, SCROLL_DEADZONE - 0.01, 0.1, 500)).toBe(100);
    expect(nextScrollY(100, -SCROLL_DEADZONE + 0.01, 0.1, 500)).toBe(100);
  });

  it('scrolls further into the text when the stick is pushed forward', () => {
    // xr-standard reports a forward push as negative Y.
    expect(nextScrollY(0, -1, 0.5, 5000)).toBe(SCROLL_SPEED * 0.5);
  });

  it('scrolls back toward the top when the stick is pulled back', () => {
    expect(nextScrollY(1000, 1, 0.5, 5000)).toBe(1000 - SCROLL_SPEED * 0.5);
  });

  it('ramps from a standstill at the deadzone edge rather than jumping', () => {
    expect(nextScrollY(0, -SCROLL_DEADZONE, 0.5, 5000)).toBe(0);

    const halfway = nextScrollY(0, -(SCROLL_DEADZONE + (1 - SCROLL_DEADZONE) / 2), 0.5, 5000);
    expect(halfway).toBeCloseTo((SCROLL_SPEED * 0.5) / 2);
  });

  it('clamps to the ends of the scroll range', () => {
    expect(nextScrollY(10, 1, 1, 5000)).toBe(0);
    expect(nextScrollY(4900, -1, 1, 5000)).toBe(5000);
  });

  it('stays at the top when there is nothing to scroll', () => {
    expect(nextScrollY(0, -1, 1, 0)).toBe(0);
  });
});
