/**
 * Where to put the XR rig so the head starts at a chosen spot facing a chosen point.
 *
 * PlayCanvas writes the head pose into the camera entity's *local* transform every frame, so the
 * only thing a scene can move is the rig the camera hangs off. The head sits at an arbitrary offset
 * within the rig — the reference space is pinned to wherever the user physically stood when the
 * session began — so the rig pose has to be solved backwards from the head pose rather than set to
 * the target outright.
 *
 * All angles are degrees and all coordinates world-space XZ; Y is left to the caller, since the
 * user stands on the rig floor rather than on the scene's ground plane.
 */
import { clampToCircle } from './xr-scene-bounds';

export type Point2 = { x: number; z: number };

export type XrStartBounds = Point2 & { radius: number };

export type XrStartPoseInput = {
  /** Where the head is now. */
  head: Point2;
  /** Yaw of the head's forward direction now. */
  headYaw: number;
  /** Where the rig is now. */
  rig: Point2;
  /** Where the head should end up. */
  target: Point2;
  /** What the head should face from there. */
  focus: Point2;
  /**
   * Circle to keep the target inside. Omit (or pass a non-positive radius) to place the head on the
   * target as given.
   */
  bounds?: XrStartBounds;
};

export type XrStartPose = {
  /** Yaw to turn the rig by, about its own origin. */
  yawDelta: number;
  /** Where the rig ends up once turned. */
  x: number;
  z: number;
};

const RAD_TO_DEG = 180 / Math.PI;
const DEG_TO_RAD = Math.PI / 180;

/** Below this length a direction vector carries no usable heading. */
const DIRECTION_EPSILON = 1e-6;

/** Wraps to (-180, 180] so the rig always turns the short way round. */
const normalizeAngle = (degrees: number): number => {
  const wrapped = ((((degrees + 180) % 360) + 360) % 360) - 180;

  return wrapped === -180 ? 180 : wrapped;
};

/**
 * Yaw of a heading on the XZ plane, matching PlayCanvas' right-handed CCW Y rotation:
 * forward = (-sin(yaw), 0, -cos(yaw)).
 */
export const yawFromDirection = (dx: number, dz: number): number | null =>
  Math.abs(dx) < DIRECTION_EPSILON && Math.abs(dz) < DIRECTION_EPSILON ? null : Math.atan2(-dx, -dz) * RAD_TO_DEG;

/**
 * Yaw an entity is facing, from its world basis vectors. Falls back to the right vector when the
 * forward vector is vertical — a head tipped fully up or down still has a heading, but its forward
 * vector has no horizontal component to read it from.
 */
export const yawFromBasis = (forward: { x: number; z: number }, right: { x: number; z: number }): number =>
  yawFromDirection(forward.x, forward.z) ?? Math.atan2(-right.z, right.x) * RAD_TO_DEG;

/** Rotates a point about the origin by `degrees` of PlayCanvas yaw. */
const rotateXz = (point: Point2, degrees: number): Point2 => {
  const radians = degrees * DEG_TO_RAD;
  const cos = Math.cos(radians);
  const sin = Math.sin(radians);

  return { x: point.x * cos + point.z * sin, z: -point.x * sin + point.z * cos };
};

/**
 * Solves for the rig pose that lands the head on `target` facing `focus`.
 *
 * Turning the rig swings the head around the rig's origin, so the turn is applied to the head's
 * offset within the rig first and the rig is then placed so that swung offset lands on the target.
 * A focus point on top of the target gives no heading, so the rig is only moved, not turned.
 */
export const xrStartRigPose = ({ head, headYaw, rig, target, focus, bounds }: XrStartPoseInput): XrStartPose => {
  const landing = bounds ? clampToCircle(target.x, target.z, bounds.x, bounds.z, bounds.radius) : target;
  const facingYaw = yawFromDirection(focus.x - landing.x, focus.z - landing.z);
  const yawDelta = facingYaw === null ? 0 : normalizeAngle(facingYaw - headYaw);
  const offset = rotateXz({ x: head.x - rig.x, z: head.z - rig.z }, yawDelta);

  return { yawDelta, x: landing.x - offset.x, z: landing.z - offset.z };
};
