import { XrInputSource } from 'playcanvas';

/** xr-standard gamepad button indices for the face buttons: A/X (4) and B/Y (5). */
const FACE_BUTTON_INDICES = [4, 5];

/** xr-standard gamepad button index for the secondary face button: B on the right hand, Y on the left. */
const SECONDARY_FACE_BUTTON_INDICES = [5];

const anyButtonPressed = (inputSource: XrInputSource, indices: number[]): boolean => {
  const buttons = inputSource.gamepad?.buttons;

  return buttons ? indices.some((index) => buttons[index]?.pressed === true) : false;
};

/** True while either face button is held. False for hand-tracked sources, which have no gamepad. */
export const faceButtonPressed = (inputSource: XrInputSource): boolean =>
  anyButtonPressed(inputSource, FACE_BUTTON_INDICES);

/** True while B or Y is held, regardless of which hand holds the controller. */
export const secondaryFaceButtonPressed = (inputSource: XrInputSource): boolean =>
  anyButtonPressed(inputSource, SECONDARY_FACE_BUTTON_INDICES);

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
