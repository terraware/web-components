import { XrInputSource } from 'playcanvas';

import { FaceButtonPressTracker, faceButtonPressed } from './xr-face-buttons';

/** Fake input source whose gamepad reports `pressedIndices` as held. */
const source = (pressedIndices: number[], buttonCount = 6): XrInputSource =>
  ({
    gamepad: {
      buttons: Array.from({ length: buttonCount }, (_, index) => ({ pressed: pressedIndices.includes(index) })),
    },
  }) as unknown as XrInputSource;

const handTrackedSource = (): XrInputSource => ({}) as unknown as XrInputSource;

describe('faceButtonPressed', () => {
  it('is false for an input source with no gamepad', () => {
    expect(faceButtonPressed(handTrackedSource())).toBe(false);
  });

  it('is false when the gamepad has fewer buttons than the face buttons', () => {
    expect(faceButtonPressed(source([0], 2))).toBe(false);
  });

  it('is true when A/X is pressed', () => {
    expect(faceButtonPressed(source([4]))).toBe(true);
  });

  it('is true when B/Y is pressed', () => {
    expect(faceButtonPressed(source([5]))).toBe(true);
  });

  it('is false when only the trigger and grip are pressed', () => {
    expect(faceButtonPressed(source([0, 1]))).toBe(false);
  });

  it('is false when nothing is pressed', () => {
    expect(faceButtonPressed(source([]))).toBe(false);
  });
});

describe('FaceButtonPressTracker', () => {
  it('fires once for a held press and re-arms after release', () => {
    const tracker = new FaceButtonPressTracker();
    // One persistent source whose button state mutates, as a real XrInputSource does across frames.
    const buttons = Array.from({ length: 6 }, () => ({ pressed: false }));
    const controller = { gamepad: { buttons } } as unknown as XrInputSource;
    const holdFaceButton = (pressed: boolean) => {
      buttons[4].pressed = pressed;
    };

    expect(tracker.justPressed(controller)).toBe(false);

    holdFaceButton(true);
    expect(tracker.justPressed(controller)).toBe(true);
    expect(tracker.justPressed(controller)).toBe(false);

    holdFaceButton(false);
    expect(tracker.justPressed(controller)).toBe(false);

    holdFaceButton(true);
    expect(tracker.justPressed(controller)).toBe(true);
  });

  it('tracks each input source independently', () => {
    const tracker = new FaceButtonPressTracker();
    const left = source([4]);
    const right = source([]);

    expect(tracker.justPressed(left)).toBe(true);
    expect(tracker.justPressed(right)).toBe(false);
    expect(tracker.justPressed(left)).toBe(false);
  });
});
