import { useCallback, useContext, useMemo } from 'react';

import { useApp } from '@playcanvas/react/hooks';
import { Entity, Vec3 } from 'playcanvas';

import { CameraEntityContext } from './cameraEntityContext';

/**
 * @param cameraEntity - The camera to drive. Callers above {@link CameraEntityContext} pass it
 * directly; the ones beneath take it from the context, and anything with neither falls back to
 * looking an entity named `camera` in the scene graph.
 */
export const useCameraPosition = (cameraEntity?: Entity | null) => {
  const app = useApp();
  const contextCamera = useContext(CameraEntityContext);
  const resolvedCamera = cameraEntity ?? contextCamera;
  const findCamera = useCallback(() => resolvedCamera ?? app.root.findByName('camera'), [app, resolvedCamera]);

  const setCamera = useCallback(
    (focus: [number, number, number], position?: [number, number, number], horizontalNdcBias = 0) => {
      const camera = findCamera();
      // @ts-expect-error - scripts are added dynamically to the camera entity
      const controls = camera?.script?.cameraControls ?? camera?.script?.walkthroughCamera;
      if (controls && camera) {
        // The extra bias arg is only honored by WalkthroughCamera; CameraControls ignores it.
        controls.reset(new Vec3(focus), position ? new Vec3(position) : camera.getPosition(), horizontalNdcBias);
      }
    },
    [findCamera]
  );

  const getCameraState = useCallback(() => {
    const camera = findCamera();
    // @ts-expect-error - scripts are added dynamically to the camera entity
    const controls = camera?.script?.cameraControls ?? camera?.script?.walkthroughCamera;
    if (camera && controls) {
      const position = camera.getPosition();
      const focusPoint = controls?.focusPoint;

      return {
        position: [position.x, position.y, position.z] as [number, number, number],
        focus: [focusPoint.x, focusPoint.y, focusPoint.z] as [number, number, number],
      };
    }

    return null;
  }, [findCamera]);

  return useMemo(() => ({ setCamera, getCameraState }), [setCamera, getCameraState]);
};
