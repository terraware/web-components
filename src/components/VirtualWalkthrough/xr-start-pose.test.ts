import { XrStartPoseInput, xrStartRigPose, yawFromBasis, yawFromDirection } from './xr-start-pose';

/** A point one unit ahead of the origin along the heading `yaw` faces. */
const pointAtYaw = (yaw: number) => {
  const radians = (yaw * Math.PI) / 180;

  return { x: -Math.sin(radians), z: -Math.cos(radians) };
};

/** Where the head ends up once the rig is turned by `yawDelta` and moved to (x, z). */
const headAfter = (input: XrStartPoseInput) => {
  const pose = xrStartRigPose(input);
  const radians = (pose.yawDelta * Math.PI) / 180;
  const cos = Math.cos(radians);
  const sin = Math.sin(radians);
  const ox = input.head.x - input.rig.x;
  const oz = input.head.z - input.rig.z;

  return { x: pose.x + (ox * cos + oz * sin), z: pose.z + (-ox * sin + oz * cos) };
};

describe('yawFromDirection', () => {
  it('reads 0 for the -Z axis, which is PlayCanvas forward', () => {
    expect(yawFromDirection(0, -1)).toBeCloseTo(0);
  });

  it('reads 90 for the -X axis', () => {
    expect(yawFromDirection(-1, 0)).toBeCloseTo(90);
  });

  it('returns null for a direction with no horizontal component', () => {
    expect(yawFromDirection(0, 0)).toBeNull();
  });
});

describe('yawFromBasis', () => {
  it('reads the yaw from the forward vector', () => {
    expect(yawFromBasis({ x: -1, z: 0 }, { x: 0, z: -1 })).toBeCloseTo(90);
  });

  it('falls back to the right vector when forward is vertical', () => {
    // Head tipped straight down: forward has no horizontal component, right still faces -Z.
    expect(yawFromBasis({ x: 0, z: 0 }, { x: 0, z: -1 })).toBeCloseTo(90);
  });
});

describe('xrStartRigPose', () => {
  const origin = { x: 0, z: 0 };

  it('lands the head on the target when the head starts at the rig origin', () => {
    const pose = xrStartRigPose({
      head: origin,
      headYaw: 0,
      rig: origin,
      target: { x: 10, z: 0 },
      focus: origin,
    });

    expect(pose.x).toBeCloseTo(10);
    expect(pose.z).toBeCloseTo(0);
    // Facing -X, back toward the focus point.
    expect(pose.yawDelta).toBeCloseTo(90);
  });

  it('offsets the rig so a head standing away from the rig origin still lands on the target', () => {
    const input: XrStartPoseInput = {
      head: { x: 2, z: 0 },
      headYaw: 0,
      rig: origin,
      target: origin,
      focus: { x: 0, z: -10 },
    };
    const pose = xrStartRigPose(input);

    expect(pose.yawDelta).toBeCloseTo(0);
    expect(pose.x).toBeCloseTo(-2);
    expect(pose.z).toBeCloseTo(0);
    expect(headAfter(input).x).toBeCloseTo(0);
    expect(headAfter(input).z).toBeCloseTo(0);
  });

  it('keeps the head on the target when the turn swings it around the rig origin', () => {
    const input: XrStartPoseInput = {
      head: { x: 2, z: 0 },
      headYaw: 0,
      rig: origin,
      target: origin,
      focus: { x: 10, z: 0 },
    };
    const pose = xrStartRigPose(input);
    const head = headAfter(input);

    expect(pose.yawDelta).toBeCloseTo(-90);
    expect(head.x).toBeCloseTo(0);
    expect(head.z).toBeCloseTo(0);
  });

  it('turns the short way round rather than the long way', () => {
    const pose = xrStartRigPose({
      head: origin,
      headYaw: 170,
      rig: origin,
      target: origin,
      // Facing yaw of -170 degrees: 20 degrees away from 170, not 340.
      focus: pointAtYaw(-170),
    });

    expect(pose.yawDelta).toBeCloseTo(20);
  });

  it('only moves the rig when the focus point sits on the target', () => {
    const pose = xrStartRigPose({
      head: { x: 1, z: 1 },
      headYaw: 45,
      rig: origin,
      target: { x: 5, z: 5 },
      focus: { x: 5, z: 5 },
    });

    expect(pose.yawDelta).toBe(0);
    expect(pose.x).toBeCloseTo(4);
    expect(pose.z).toBeCloseTo(4);
  });

  it('lands the head on the target from an already-moved, already-turned rig', () => {
    const input: XrStartPoseInput = {
      head: { x: 7, z: -3 },
      headYaw: 125,
      rig: { x: 4, z: -1 },
      target: { x: -6, z: 2 },
      focus: { x: 1, z: 9 },
    };
    const head = headAfter(input);

    expect(head.x).toBeCloseTo(-6);
    expect(head.z).toBeCloseTo(2);
  });
});
