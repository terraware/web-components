import { CameraComponent, Entity, Quat, Vec3 } from 'playcanvas';

/**
 * The pose an adopted camera is put back to when the walkthrough releases it.
 */
interface AdoptedPose {
  parent: Entity;
  position: Vec3;
  rotation: Quat;
}

/**
 * Hands the scene's existing camera to a walkthrough rig that hasn't been given one.
 *
 * A caller mounting the viewer into a scene it doesn't own passes `camera={null}`, because an XR
 * session is welded to the camera component it was started on — `XrManager.camera` is read-only and
 * `start` refuses while a session is running — so a walkthrough that brought a camera of its own
 * could only become the session's camera by ending it, which drops the user out of the headset.
 *
 * That leaves the rig with no camera under it, and everything that solves against the head resolves
 * it with `findComponent('camera')` on the rig: `XrStartPose`, `XrNavigation`'s thumbstick movement
 * and turning, and the bounds clamp all go inert, so the head is never placed at the walkthrough's
 * start point and can never be moved from wherever the host scene left it. Splat LOD is chosen from
 * the camera's distance to each octree node, so the far side of the model stays coarse for the whole
 * session no matter which way the headset turns.
 *
 * Reparenting carries the live camera component with it, so the session, its views, and the host's
 * own clear color and clip planes are all untouched — only which entity the camera hangs off
 * changes. The camera becomes a direct child of the rig, which is exactly where a camera the viewer
 * owns sits, so the rig means the same thing either way.
 *
 * @param root - The scene root to look for a camera in, expected to hold exactly one camera.
 * @param rig - The entity the walkthrough's XR scripts move, `camera-root`.
 * @param ownCamera - The entity the viewer mounts its own camera on. Nothing is adopted when it
 * already carries one.
 * @returns A function that puts the camera back, or null when there was nothing to adopt.
 */
export const adoptSceneCamera = (root: Entity, rig: Entity, ownCamera: Entity): (() => void) | null => {
  if (ownCamera.camera) {
    return null;
  }

  const camera = (root.findComponent('camera') as CameraComponent | null)?.entity;
  // isDescendantOf covers a host that mounted the walkthrough inside its own camera, where
  // reparenting would make a cycle.
  if (!camera || camera === rig || !camera.parent || rig.isDescendantOf(camera)) {
    return null;
  }

  const previous: AdoptedPose = {
    parent: camera.parent as Entity,
    position: camera.getLocalPosition().clone(),
    rotation: camera.getLocalRotation().clone(),
  };

  // addChild keeps the local transform, so the host's authored camera pose survives the move and
  // only has to be restored because a session overwrites it with the head pose every frame.
  rig.addChild(camera);

  return () => {
    previous.parent.addChild(camera);
    camera.setLocalPosition(previous.position);
    camera.setLocalRotation(previous.rotation);
  };
};
