import { Script, XRTYPE_VR } from 'playcanvas';

import { xrStartRigPose, yawFromBasis } from './xr-start-pose';

/**
 * Starts a VR session at the scene's camera position rather than at the world origin.
 *
 * PlayCanvas overwrites the camera entity's local transform with the head pose every frame, so the
 * head lands wherever the headset's reference space puts it — near (0, 0) for a rig that has never
 * been moved. This script moves the rig on the first frame of a session so the head instead starts
 * at `targetX`/`targetZ` facing `focusX`/`focusZ`.
 *
 * Only XZ is touched: the user stands on the rig floor, which the boundary wall is also built
 * against, so lifting the rig onto the splat's ground plane would put them through it.
 *
 * Attach to the rig entity — the camera's parent, alongside TfXrNavigation, whose bounds clamp
 * pulls the start point back inside the scene bounds when the camera position sits outside them.
 *
 * VR only: an AR user is anchored to the room they can see, so moving them is disorienting.
 */
export class XrStartPose extends Script {
  static scriptName = 'xrStartPose';

  /** World-space X the head should start at, i.e. the viewer's `cameraPosition`. */
  targetX = 0;

  /** World-space Z the head should start at. */
  targetZ = 0;

  /** World-space X the head should face from there, i.e. the viewer's `origin`. */
  focusX = 0;

  /** World-space Z the head should face from there. */
  focusZ = 0;

  /** Set when a session starts, cleared once the rig has been placed. */
  private _pending = false;

  private _onXrStart = () => {
    this._pending = true;
  };

  initialize() {
    // Covers mounting into a session that is already running as well as the usual mount before one.
    this._pending = this._isVrActive();
    this.app.xr?.on('start', this._onXrStart);
  }

  private _isVrActive = () => this.app.xr?.active === true && this.app.xr?.type === XRTYPE_VR;

  /**
   * Runs in update rather than on the 'start' event: the head pose for the frame is written before
   * scripts update (and a frame with no pose skips the update entirely), so this is the first point
   * at which there is a head to solve the rig pose from. Running before postUpdate also leaves
   * TfXrNavigation's clamp to bring the head inside the bounds on this same frame.
   */
  update() {
    if (!this._pending || !this._isVrActive()) {
      return;
    }

    const camera = this.entity.findComponent('camera')?.entity;
    if (!camera) {
      return;
    }

    const head = camera.getPosition();
    const rig = this.entity.getPosition();
    const rigY = rig.y;
    const pose = xrStartRigPose({
      head: { x: head.x, z: head.z },
      headYaw: yawFromBasis(camera.forward, camera.right),
      rig: { x: rig.x, z: rig.z },
      target: { x: this.targetX, z: this.targetZ },
      focus: { x: this.focusX, z: this.focusZ },
    });

    this.entity.rotate(0, pose.yawDelta, 0);
    this.entity.setPosition(pose.x, rigY, pose.z);
    this._pending = false;
  }

  destroy() {
    this.app.xr?.off('start', this._onXrStart);
  }
}
