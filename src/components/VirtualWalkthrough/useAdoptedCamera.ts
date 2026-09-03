import { useEffect } from 'react';

import { useApp } from '@playcanvas/react/hooks';
import { Entity } from 'playcanvas';

import { adoptSceneCamera } from './camera-adoption';

/**
 * Keeps the walkthrough's rig holding a camera for as long as the viewer is mounted, adopting the
 * scene's own when the viewer wasn't given one. See {@link adoptSceneCamera} for why.
 *
 * @param rig - The `camera-root` entity, or null before it exists.
 * @param ownCamera - The entity the viewer mounts its own camera on, or null before it exists.
 */
export const useAdoptedCamera = (rig: Entity | null, ownCamera: Entity | null) => {
  const app = useApp();

  useEffect(() => {
    if (!rig || !ownCamera) {
      return;
    }

    // Runs after the child that mounts the camera component has committed, so a viewer that was
    // given a camera is recognised as owning one rather than adopting on top of it.
    return adoptSceneCamera(app.root, rig, ownCamera) ?? undefined;
  }, [app, rig, ownCamera]);
};

export default useAdoptedCamera;
