import { XrInputSource } from 'playcanvas';

/** Per-frame aim state for one input source, sampled while its select gesture is in progress. */
export interface TeleportGestureFrame {
  pressed: boolean;
  teleportDisabled: boolean;
  uiBlocked: boolean;
}

/**
 * Decides whether the select gesture that just ended is allowed to teleport. The two reasons to
 * refuse have deliberately different lifetimes:
 *
 * - `teleportDisabled` latches for the rest of the press. The React flag behind it re-enables as
 *   soon as the select dismisses the panel, which can land before the selectend that ends the press.
 * - `uiBlocked` keeps only the newest frame, because that frame is the one whose arc hit the base
 *   script has cached and would commit on release. Re-deciding from the release-time ray instead
 *   would let a flick off the UI commit a target that was aimed while over it, and latching the
 *   whole press would refuse an aim that merely swept across UI before coming to rest on floor.
 *
 * Callers must poll every frame for every source they care about; a press and release between polls
 * is missed.
 */
export class TeleportGestureLatch {
  private _teleportDisabled = new WeakSet<XrInputSource>();
  private _uiBlocked = new WeakSet<XrInputSource>();

  /** Records a frame of an in-progress press. A source that isn't pressed drops both latches. */
  track(inputSource: XrInputSource, frame: TeleportGestureFrame) {
    if (!frame.pressed) {
      this._teleportDisabled.delete(inputSource);
      this._uiBlocked.delete(inputSource);

      return;
    }

    if (frame.teleportDisabled) {
      this._teleportDisabled.add(inputSource);
    }

    if (frame.uiBlocked) {
      this._uiBlocked.add(inputSource);
    } else {
      this._uiBlocked.delete(inputSource);
    }
  }

  /** True when the press may not teleport. Clears both latches so they never outlive the press. */
  consumeBlocked(inputSource: XrInputSource): boolean {
    const blocked = this._teleportDisabled.has(inputSource) || this._uiBlocked.has(inputSource);
    this._teleportDisabled.delete(inputSource);
    this._uiBlocked.delete(inputSource);

    return blocked;
  }
}
