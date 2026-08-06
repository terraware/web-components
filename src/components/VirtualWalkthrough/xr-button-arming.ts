import { XrInputSource } from 'playcanvas';

/**
 * Latches per input source whether a press may count toward a hold. A source arms itself the
 * moment it is seen released, and stays armed from then on - so a button already down when
 * tracking starts is ignored until it is released once, and one controller held down can't stop
 * another from arming and counting. Callers must poll every frame for every source they care
 * about; a press and release between polls is missed.
 */
export class ButtonArmingLatch {
  private _armed = new WeakSet<XrInputSource>();

  /** Records one frame for `inputSource` and returns whether its current press may count. */
  trackPress(inputSource: XrInputSource, pressed: boolean): boolean {
    if (!pressed) {
      this._armed.add(inputSource);

      return false;
    }

    return this._armed.has(inputSource);
  }
}
