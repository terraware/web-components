import { XrInputSource } from 'playcanvas';
import { XrNavigation as PcXrNavigation } from 'playcanvas/scripts/esm/xr/xr-navigation.mjs';

interface ArcVisual {
  entity: { enabled: boolean };
  ringEntity: { enabled: boolean };
}

/** The base script's per-source aim state, which it exposes only as underscore-private fields. */
interface XrNavigationInternals {
  _inputSources: Set<XrInputSource>;
  _arcVisuals: Map<XrInputSource, ArcVisual>;
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

  private _isBlocked(inputSource: XrInputSource): boolean {
    return !this.enableTeleport || this.isTeleportBlocked?.(inputSource) === true;
  }

  tryTeleport(inputSource: XrInputSource) {
    if (this._isBlocked(inputSource)) {
      return;
    }

    super.tryTeleport(inputSource);
  }

  update(dt: number) {
    super.update(dt);

    // The base hides the arc only from inside its own teleport handling, which it skips entirely once
    // teleport is off - so an arc raised before the block (gaze dwell can open a panel while the
    // trigger is held) would otherwise stay frozen in the world. These writes are idempotent, and the
    // base re-enables the visuals itself on the first frame a source is unblocked.
    const internals = this as unknown as XrNavigationInternals;
    for (const inputSource of internals._inputSources) {
      if (this._isBlocked(inputSource)) {
        const visual = internals._arcVisuals.get(inputSource);
        if (visual) {
          visual.entity.enabled = false;
          visual.ringEntity.enabled = false;
        }
      }
    }
  }
}
