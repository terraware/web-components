import { useEffect } from 'react';

import { useApp } from '@playcanvas/react/hooks';

import { GsplatTuningParams, XR_FIXED_FOVEATION, applyGsplatTuning, restoreGsplatTuning } from './xr-render-tuning';

/**
 * Holds the XR render settings in place for the duration of a session, including one that is
 * already running when this mounts.
 *
 * Call this once per application. The gsplat settings it writes are scene-global, so a second
 * caller would capture the first caller's tuned values as the state to restore, and the scene would
 * come out of the session still tuned.
 */
export const useXrRenderTuning = () => {
  const app = useApp();

  useEffect(() => {
    const xr = app.xr;
    if (!xr) {
      return;
    }

    let previous: GsplatTuningParams | null = null;

    const restore = () => {
      if (previous) {
        restoreGsplatTuning(app.scene.gsplat, previous);
        previous = null;
      }
    };

    const handleStart = () => {
      // Guards against capturing already-tuned values as the restore target if `start` ever
      // fires again before a matching `end`.
      if (!previous) {
        previous = applyGsplatTuning(app.scene.gsplat);
      }
      // Only settable on an active session, so it cannot go in the start options alongside
      // framebufferScaleFactor. A no-op when the presentation layer doesn't support it.
      xr.fixedFoveation = XR_FIXED_FOVEATION;
    };

    xr.on('start', handleStart);
    xr.on('end', restore);

    // A viewer can be mounted into a scene that is already in a headset, in which case `start`
    // fired before this hook existed and waiting for it would leave the whole session rendering
    // with the desktop settings. `handleStart` is idempotent, so a session that goes on to fire
    // `start` anyway does not capture the tuned values as the ones to restore.
    if (xr.active) {
      handleStart();
    }

    return () => {
      xr.off('start', handleStart);
      xr.off('end', restore);
      restore();
    };
  }, [app]);
};

export default useXrRenderTuning;
