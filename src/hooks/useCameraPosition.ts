import { useCallback, useContext, useMemo } from 'react';

import { useApp } from '@playcanvas/react/hooks';
import { Entity, GraphNode, Vec3 } from 'playcanvas';

import { CameraEntityContext } from './cameraEntityContext';

/** The camera-driving scripts this hook talks to. */
interface CameraDriver {
  reset: (focus: Vec3, position: Vec3, horizontalNdcBias?: number) => void;
  focusPoint: Vec3;
}

/** Scripts are added to entities dynamically, so they aren't on the engine's types. */
const scriptsOn = (node: GraphNode | null | undefined) =>
  (node as unknown as { script?: { cameraControls?: CameraDriver; walkthroughCamera?: CameraDriver } } | null)?.script;

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

  /**
   * The script driving the camera. WalkthroughCamera is mounted on the rig above the camera rather
   * than on the camera entity, so that it poses a camera the walkthrough adopted from a host scene
   * as readily as one of its own; CameraControls sits on the camera entity itself.
   */
  const findControls = useCallback((camera: GraphNode | null): CameraDriver | undefined => {
    const own = scriptsOn(camera);

    return own?.cameraControls ?? own?.walkthroughCamera ?? scriptsOn(camera?.parent)?.walkthroughCamera;
  }, []);

  const setCamera = useCallback(
    (focus: [number, number, number], position?: [number, number, number], horizontalNdcBias = 0) => {
      const camera = findCamera();
      const controls = findControls(camera);
      if (controls && camera) {
        // The extra bias arg is only honored by WalkthroughCamera; CameraControls ignores it.
        controls.reset(new Vec3(focus), position ? new Vec3(position) : camera.getPosition(), horizontalNdcBias);
      }
    },
    [findCamera, findControls]
  );

  const getCameraState = useCallback(() => {
    const camera = findCamera();
    const controls = findControls(camera);
    if (camera && controls) {
      const position = camera.getPosition();
      const focusPoint = controls?.focusPoint;

      return {
        position: [position.x, position.y, position.z] as [number, number, number],
        focus: [focusPoint.x, focusPoint.y, focusPoint.z] as [number, number, number],
      };
    }

    return null;
  }, [findCamera, findControls]);

  return useMemo(() => ({ setCamera, getCameraState }), [setCamera, getCameraState]);
};
