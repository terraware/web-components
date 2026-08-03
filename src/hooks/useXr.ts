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

export const useXr = ({ onError }: UseXrOptions = {}) => {
  const app = useApp();
  const [available, setAvailable] = useState<Record<XrType, boolean>>({ VR: false, AR: false });
  const [isCurrentlyInXr, setIsCurrentlyInXr] = useState(app.xr?.active ?? false);

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
    const handleStart = () => setIsCurrentlyInXr(true);
    const handleEnd = () => setIsCurrentlyInXr(false);

    setIsCurrentlyInXr(app.xr?.active ?? false);

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
    () => ({ isXrAvailable, startXr, endXr, isCurrentlyInXr }),
    [isXrAvailable, startXr, endXr, isCurrentlyInXr]
  );
};

export default useXr;
