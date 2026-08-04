import { XrInputSource } from 'playcanvas';

/** xr-standard gamepad button indices for the face buttons: A/X (4) and B/Y (5). */
export const FACE_BUTTON_INDICES = [4, 5];

/** True while either face button is held. False for hand-tracked sources, which have no gamepad. */
export const faceButtonPressed = (inputSource: XrInputSource): boolean => {
  const buttons = inputSource.gamepad?.buttons;

  return buttons ? FACE_BUTTON_INDICES.some((index) => buttons[index]?.pressed === true) : false;
};

/**
 * Edge-detects face-button presses per input source so one press fires once. Callers must poll every
 * frame for every source they care about; a press and release between polls is missed.
 */
export class FaceButtonPressTracker {
  private _down = new WeakMap<XrInputSource, boolean>();

  /** True only on the poll where a face button goes from released to pressed. */
  justPressed(inputSource: XrInputSource): boolean {
    const pressed = faceButtonPressed(inputSource);
    const wasPressed = this._down.get(inputSource) ?? false;
    this._down.set(inputSource, pressed);

    return pressed && !wasPressed;
  }
}
