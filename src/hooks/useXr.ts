import { useCallback, useEffect, useMemo, useState } from 'react';

import { useApp } from '@playcanvas/react/hooks';
import { CameraComponent, XRSPACE_LOCALFLOOR, XRTYPE_AR, XRTYPE_VR } from 'playcanvas';

export type XrType = 'VR' | 'AR';

interface UseXrOptions {
  onError?: (error: Error) => void;
}

const XR_TYPES: Record<XrType, string> = {
  VR: XRTYPE_VR,
  AR: XRTYPE_AR,
};

/**
 * Factor PlayCanvas applies on top of the device pixel ratio to compute the headset's
 * framebuffer resolution: `app.graphicsDevice.maxPixelRatio / window.devicePixelRatio *
 * XR_FRAMEBUFFER_SCALE_FACTOR`. Splat rendering in stereo is fill-rate bound, so this (and
 * `maxPixelRatio`, which also multiplies XR resolution) is the largest lever on XR framerate.
 * Read once when the session starts and fixed for its lifetime.
 */
const XR_FRAMEBUFFER_SCALE_FACTOR = 1;

export const useXr = ({ onError }: UseXrOptions = {}) => {
  const app = useApp();
  // Seeded from the manager rather than defaulting to unavailable, so a caller acting in a mount
  // effect isn't told VR is unsupported while the effect below is still waiting to run.
  const [available, setAvailable] = useState<Record<XrType, boolean>>(() => ({
    VR: app.xr?.isAvailable(XRTYPE_VR) ?? false,
    AR: app.xr?.isAvailable(XRTYPE_AR) ?? false,
  }));
  // `type` is set as soon as a session is requested, so gate on `active` to ignore pending sessions.
  const [currentXrType, setCurrentXrType] = useState<string | null>(app.xr?.active ? app.xr.type : null);

  useEffect(() => {
    // We subscribe to the manager directly because `app` doesn't update when XR's availability changes.
    const handleAvailable = (type: string, isAvailable: boolean) => {
      if (type === XRTYPE_VR) {
        setAvailable((prev) => ({ ...prev, VR: isAvailable }));
      } else if (type === XRTYPE_AR) {
        setAvailable((prev) => ({ ...prev, AR: isAvailable }));
      }
    };

    setAvailable({
      VR: app.xr?.isAvailable(XRTYPE_VR) ?? false,
      AR: app.xr?.isAvailable(XRTYPE_AR) ?? false,
    });

    app.xr?.on('available', handleAvailable);

    return () => {
      app.xr?.off('available', handleAvailable);
    };
  }, [app]);

  useEffect(() => {
    const handleStart = () => setCurrentXrType(app.xr?.type ?? null);
    // `app.xr.type` isn't cleared until after the `end` event fires, so don't read it here.
    const handleEnd = () => setCurrentXrType(null);

    setCurrentXrType(app.xr?.active ? app.xr.type : null);

    app.xr?.on('start', handleStart);
    app.xr?.on('end', handleEnd);

    return () => {
      app.xr?.off('start', handleStart);
      app.xr?.off('end', handleEnd);
    };
  }, [app]);

  const isXrAvailable = useCallback((type: XrType) => available[type], [available]);

  const startXr = useCallback(
    (type: XrType) => {
      const camera = app.root.findComponent('camera') as CameraComponent;
      app.xr?.start(camera, XR_TYPES[type], XRSPACE_LOCALFLOOR, {
        framebufferScaleFactor: XR_FRAMEBUFFER_SCALE_FACTOR,
        callback: (err: Error | null) => {
          if (err) {
            onError?.(err);
            app.xr?.end();
          }
        },
      });
    },
    [app, onError]
  );

  const endXr = useCallback(() => {
    app.xr?.end();
  }, [app]);

  return useMemo(
    () => ({
      isXrAvailable,
      startXr,
      endXr,
      isCurrentlyInXr: currentXrType !== null,
      isCurrentlyInAr: currentXrType === XRTYPE_AR,
      isCurrentlyInVr: currentXrType === XRTYPE_VR,
    }),
    [isXrAvailable, startXr, endXr, currentXrType]
  );
};

export default useXr;
