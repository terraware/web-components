import { useLayoutEffect, useState } from 'react';

import { useApp } from '@playcanvas/react/hooks';
import { Entity } from 'playcanvas';

import { adoptSceneCamera } from './camera-adoption';

/**
 * Keeps the walkthrough's rig holding a camera for as long as the viewer is mounted, adopting the
 * scene's own when the viewer wasn't given one. See {@link adoptSceneCamera} for why.
 *
 * @param rig - The `camera-root` entity, or null before it exists.
 * @param ownCamera - The entity the viewer mounts its own camera on, or null before it exists.
 * @returns The adopted camera, or null when the viewer brought one of its own. Held as state so the
 * viewer re-renders and re-points everything that addresses the camera at the entity now carrying
 * it.
 */
export const useAdoptedCamera = (rig: Entity | null, ownCamera: Entity | null): Entity | null => {
  const app = useApp();
  const [adopted, setAdopted] = useState<Entity | null>(null);

  // A layout effect, so that the camera is handed back before the rig it was parented into is
  // destroyed. `@playcanvas/react`'s Entity destroys its entity in a layout effect's teardown, and
  // destroying an entity destroys its children — so a release deferred to a passive effect runs
  // after the host's camera has already been destroyed along with the walkthrough, leaving the host
  // scene with no camera to render through at all.
  //
  // The rig is a child of the viewer, and React tears an unmounting tree's layout effects down from
  // the top, so this runs first.
  useLayoutEffect(() => {
    if (!rig || !ownCamera) {
      return;
    }

    // Both entities are state set from refs, so this runs a commit after the child that mounts the
    // camera component: a viewer that was given a camera is recognised as owning one rather than
    // adopted on top of.
    const adoption = adoptSceneCamera(app.root, rig, ownCamera);
    setAdopted(adoption?.camera ?? null);

    return () => {
      adoption?.release();
      setAdopted(null);
    };
  }, [app, rig, ownCamera]);

  return adopted;
};

export default useAdoptedCamera;
