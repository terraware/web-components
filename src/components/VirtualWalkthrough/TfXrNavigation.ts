import { XrInputSource } from 'playcanvas';
import { XrNavigation as PcXrNavigation } from 'playcanvas/scripts/esm/xr/xr-navigation.mjs';

import { TeleportGestureLatch } from './xr-teleport-gesture';

interface ArcVisual {
  entity: { enabled: boolean };
  ringEntity: { enabled: boolean };
}

/** The base script's per-source aim state, which it exposes only as underscore-private fields. */
interface XrNavigationInternals {
  _inputSources: Set<XrInputSource>;
  _arcVisuals: Map<XrInputSource, ArcVisual>;
  _activePointers: Map<XrInputSource, boolean>;
}

/**
 * XrNavigation that never teleports on a select meant for something else: it honours the
 * enableTeleport flag (which the base ignores in tryTeleport) and skips sources whose ray is over
 * interactive UI.
 */
export class TfXrNavigation extends PcXrNavigation {
  static scriptName = 'tfXrNavigation';

  /** Assigned by the React wrapper. True when this source's ray is over interactive UI. */
  isTeleportBlocked?: (inputSource: XrInputSource) => boolean;

  private _gestures = new TeleportGestureLatch();

  private _isBlocked(inputSource: XrInputSource): boolean {
    return !this.enableTeleport || this.isTeleportBlocked?.(inputSource) === true;
  }

  tryTeleport(inputSource: XrInputSource) {
    // The latch decides on the frames the press actually aimed through, because super.tryTeleport
    // commits the arc hit cached back then rather than re-tracing the release-time ray. The live
    // check stays too: the same release also fires 'select', so a ray that lands on UI at release
    // is operating that UI and must not move the rig as well.
    if (this._gestures.consumeBlocked(inputSource) || this._isBlocked(inputSource)) {
      return;
    }

    super.tryTeleport(inputSource);
  }

  update(dt: number) {
    super.update(dt);

    const internals = this as unknown as XrNavigationInternals;
    for (const inputSource of internals._inputSources) {
      // Sampled once per source per frame: isTeleportBlocked ray-tests every hotspot.
      const uiBlocked = this.isTeleportBlocked?.(inputSource) === true;

      // Tracked unconditionally, and before the arc-hiding work below. super.update has just cached
      // this frame's arc hit, which is what a release would commit, so the latch has to see the same
      // frame. A source that isn't pressed carries no gesture, so any stale entry from a press that
      // ended while teleport was disabled (skipping tryTeleport entirely) is dropped here rather
      // than leaking into the source's next press.
      this._gestures.track(inputSource, {
        pressed: internals._activePointers.get(inputSource) === true,
        teleportDisabled: !this.enableTeleport,
        uiBlocked,
      });

      // The base hides the arc only from inside its own teleport handling, which it skips entirely
      // once teleport is off - so an arc raised before the block (gaze dwell can open a panel while
      // the trigger is held) would otherwise stay frozen in the world. These writes are idempotent,
      // and the base re-enables the visuals itself on the first frame a source is unblocked.
      const visual = internals._arcVisuals.get(inputSource);
      if (!visual || (!visual.entity.enabled && !visual.ringEntity.enabled)) {
        continue;
      }

      if (!this.enableTeleport || uiBlocked) {
        visual.entity.enabled = false;
        visual.ringEntity.enabled = false;
      }
    }
  }
}
