import { Script, XRTYPE_VR } from 'playcanvas';

import { XrStartBounds, xrStartRigPose, yawFromBasis } from './xr-start-pose';

/**
 * Structural shape of the TfXrNavigation instance sharing this entity, kept local so this script
 * does not have to import the navigation script. Read rather than duplicated as props so the circle
 * the start point is placed in is always the one the head will actually be held inside.
 */
type XrStartPoseNavigation = { boundsCenter: { x: number; z: number }; boundsRadius: number };

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

  /**
   * Whether the engine has written a head pose for this session yet.
   *
   * `app.xr.active` goes true the moment the session object exists, but the camera entity keeps
   * whatever transform it had until a frame carrying a viewer pose arrives. In between, a
   * `window.requestAnimationFrame` tick scheduled before the session started can still run scripts
   * (AppBase.tick only skips the update for *XR* frames without a pose), and on that frame the
   * camera still holds the desktop pose. Solving from it would place the rig as though the user
   * were already standing at the desktop camera — which, since that is where the target usually is,
   * lands them back at the world origin.
   */
  private _posed = false;

  private _onXrStart = () => {
    this._pending = true;
  };

  /** Fired from XrManager.update only after the head pose has been written to the camera. */
  private _onXrUpdate = () => {
    this._posed = true;
  };

  private _onXrEnd = () => {
    this._posed = false;
  };

  initialize() {
    // Covers mounting into a session that is already running as well as the usual mount before one.
    this._pending = this._isVrActive();
    this.app.xr?.on('start', this._onXrStart);
    this.app.xr?.on('update', this._onXrUpdate);
    this.app.xr?.on('end', this._onXrEnd);
    // Script removal fires a 'destroy' event rather than calling a destroy() method, so the
    // teardown has to be registered as a listener or these handlers outlive the script.
    this.once('destroy', () => this._teardown());
  }

  private _isVrActive = () => this.app.xr?.active === true && this.app.xr?.type === XRTYPE_VR;

  /**
   * The bounds circle to place the start point in, or undefined when nothing is clamping the head.
   * Resolved per call rather than cached: the React wrapper assigns the bounds to the navigation
   * script imperatively, so they can land after this script initializes.
   */
  private _bounds = (): XrStartBounds | undefined => {
    // @ts-expect-error - scripts are added dynamically to the entity
    const navigation = this.entity.script?.tfXrNavigation as XrStartPoseNavigation | undefined;
    if (!navigation || navigation.boundsRadius <= 0) {
      return undefined;
    }

    return { x: navigation.boundsCenter.x, z: navigation.boundsCenter.z, radius: navigation.boundsRadius };
  };

  /**
   * Runs in update rather than on the 'start' event: the engine writes the head pose during
   * xr.update, which precedes the script update in the same tick, so a frame that has posed is the
   * first point at which there is a real head to solve the rig pose from. Running before postUpdate
   * also leaves TfXrNavigation's clamp free to act on the same frame if it needs to.
   */
  update() {
    if (!this._pending || !this._posed || !this._isVrActive()) {
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
      bounds: this._bounds(),
    });

    this.entity.rotate(0, pose.yawDelta, 0);
    this.entity.setPosition(pose.x, rigY, pose.z);
    this._pending = false;
  }

  private _teardown() {
    this.app.xr?.off('start', this._onXrStart);
    this.app.xr?.off('update', this._onXrUpdate);
    this.app.xr?.off('end', this._onXrEnd);
  }
}
