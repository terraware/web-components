import { XRTYPE_AR, XRTYPE_VR } from 'playcanvas';

import { XrStartPose } from './XrStartPose';

const DEG_TO_RAD = Math.PI / 180;

type Point3 = { x: number; y: number; z: number };

/** Minimal stand-ins for the pieces of the engine the script touches. */
const buildRig = ({
  head = { x: 0, y: 1.7, z: 0 },
  headForward = { x: 0, z: -1 },
  headRight = { x: 1, z: 0 },
  rig = { x: 0, y: 0, z: 0 },
  navigation,
}: {
  head?: Point3;
  headForward?: { x: number; z: number };
  headRight?: { x: number; z: number };
  rig?: Point3;
  navigation?: { boundsCenter: { x: number; z: number }; boundsRadius: number };
} = {}) => {
  const camera = { getPosition: () => head, forward: headForward, right: headRight };
  const rigPosition = { ...rig };
  const entity = {
    enabled: true,
    script: { enabled: true, tfXrNavigation: navigation },
    findComponent: (type: string) => (type === 'camera' ? { entity: camera } : null),
    getPosition: () => rigPosition,
    rotate: jest.fn((_x: number, y: number) => {
      entity.yaw += y;
    }),
    setPosition: jest.fn((x: number, y: number, z: number) => {
      rigPosition.x = x;
      rigPosition.y = y;
      rigPosition.z = z;
    }),
    yaw: 0,
  };

  return { entity, head, rig, rigPosition };
};

const buildApp = ({ active = false, type = XRTYPE_VR }: { active?: boolean; type?: string } = {}) => {
  const handlers = new Map<string, () => void>();

  return {
    xr: {
      active,
      type,
      on: (event: string, handler: () => void) => handlers.set(event, handler),
      off: (event: string) => handlers.delete(event),
    },
    /**
     * Starts a session the way the engine does: the session object exists (so `active` is already
     * true) and 'start' fires once the reference space resolves — both before any head pose.
     */
    startSession(sessionType: string = XRTYPE_VR) {
      this.xr.active = true;
      this.xr.type = sessionType;
      handlers.get('start')?.();
    },
    /** A frame carrying a viewer pose, after which the camera holds a real head transform. */
    poseFrame() {
      handlers.get('update')?.();
    },
    endSession() {
      this.xr.active = false;
      handlers.get('end')?.();
    },
  };
};

/* eslint-disable @typescript-eslint/no-explicit-any */
const mountScript = (app: any, entity: any) => {
  const script = new XrStartPose({ app, entity } as any);
  script.initialize();

  return script;
};
/* eslint-enable @typescript-eslint/no-explicit-any */

/** Where the head ends up once the rig has been turned about its own origin and moved. */
const headAfter = (rigBefore: Point3, headBefore: Point3, rigAfter: Point3, yawDelta: number) => {
  const radians = yawDelta * DEG_TO_RAD;
  const cos = Math.cos(radians);
  const sin = Math.sin(radians);
  const ox = headBefore.x - rigBefore.x;
  const oz = headBefore.z - rigBefore.z;

  return { x: rigAfter.x + (ox * cos + oz * sin), z: rigAfter.z + (-ox * sin + oz * cos) };
};

/** Yaw of the heading from `from` to `to`, in PlayCanvas' convention. */
const headingYaw = (from: { x: number; z: number }, to: { x: number; z: number }) =>
  (Math.atan2(-(to.x - from.x), -(to.z - from.z)) * 180) / Math.PI;

describe('XrStartPose', () => {
  it('does nothing before a session starts', () => {
    const app = buildApp();
    const { entity } = buildRig();
    const script = mountScript(app, entity);
    script.targetX = 5;
    script.targetZ = -3;

    script.update();

    expect(entity.setPosition).not.toHaveBeenCalled();
    expect(entity.rotate).not.toHaveBeenCalled();
  });

  it('lands the head on the target facing the focus on the first frame of a session', () => {
    const app = buildApp();
    // Head offset from the rig, i.e. the user standing away from their reference space origin.
    const head = { x: 2, y: 1.7, z: 1 };
    const { entity, rig, rigPosition } = buildRig({ head });
    const script = mountScript(app, entity);
    script.targetX = 12;
    script.targetZ = -9;
    script.focusX = 0;
    script.focusZ = 0;

    app.startSession();
    app.poseFrame();
    script.update();

    const landed = headAfter(rig, head, rigPosition, entity.yaw);
    expect(landed.x).toBeCloseTo(12);
    expect(landed.z).toBeCloseTo(-9);
    // The head started facing -z (yaw 0), so the rig's turn is the whole heading to the focus.
    expect(entity.yaw).toBeCloseTo(headingYaw({ x: 12, z: -9 }, { x: 0, z: 0 }));
  });

  it('ignores an update that runs before the session has posed', () => {
    const app = buildApp();
    // The camera still holds the desktop pose, which sits on the target it was reset to.
    const head = { x: 5, y: 1.5, z: -3 };
    const { entity } = buildRig({ head });
    const script = mountScript(app, entity);
    script.targetX = 5;
    script.targetZ = -3;

    // A window.requestAnimationFrame tick scheduled before the session started still runs scripts,
    // and solving from the desktop pose here would put the rig — and so the head — on the origin.
    app.startSession();
    script.update();

    expect(entity.setPosition).not.toHaveBeenCalled();

    app.poseFrame();
    script.update();

    expect(entity.setPosition).toHaveBeenCalledTimes(1);
  });

  it('waits for a pose again in a second session', () => {
    const app = buildApp();
    const { entity } = buildRig();
    const script = mountScript(app, entity);
    script.targetX = 6;

    app.startSession();
    app.poseFrame();
    script.update();
    app.endSession();

    app.startSession();
    script.update();

    expect(entity.setPosition).toHaveBeenCalledTimes(1);
  });

  it('places the rig only once per session', () => {
    const app = buildApp();
    const { entity } = buildRig();
    const script = mountScript(app, entity);
    script.targetX = 4;

    app.startSession();
    app.poseFrame();
    script.update();
    script.update();

    expect(entity.setPosition).toHaveBeenCalledTimes(1);
  });

  it('places the rig when mounted into a session that is already running', () => {
    const app = buildApp({ active: true });
    const { entity } = buildRig();
    const script = mountScript(app, entity);
    script.targetX = 7;
    script.targetZ = 7;

    app.poseFrame();
    script.update();

    expect(entity.setPosition).toHaveBeenCalledTimes(1);
  });

  it('leaves an AR session where it is', () => {
    const app = buildApp();
    const { entity } = buildRig();
    const script = mountScript(app, entity);
    script.targetX = 5;

    app.startSession(XRTYPE_AR);
    app.poseFrame();
    script.update();

    expect(entity.setPosition).not.toHaveBeenCalled();
  });

  it('keeps the start point inside the navigation bounds, facing the focus from where it lands', () => {
    const app = buildApp();
    const navigation = { boundsCenter: { x: 0, z: -1.5 }, boundsRadius: 15 };
    const head = { x: 0, y: 1.7, z: 0 };
    const { entity, rig, rigPosition } = buildRig({ head, navigation });
    const script = mountScript(app, entity);
    // 87 m out, well beyond the 15 m circle the head will be held inside.
    script.targetX = 75;
    script.targetZ = -45;
    script.focusX = 0;
    script.focusZ = 0;

    app.startSession();
    app.poseFrame();
    script.update();

    const landed = headAfter(rig, head, rigPosition, entity.yaw);
    const distance = Math.hypot(landed.x - navigation.boundsCenter.x, landed.z - navigation.boundsCenter.z);
    expect(distance).toBeCloseTo(navigation.boundsRadius);
    // The heading is solved from the clamped landing point, not the target that was asked for.
    expect(entity.yaw).toBeCloseTo(headingYaw(landed, { x: 0, z: 0 }));
    expect(entity.yaw).not.toBeCloseTo(headingYaw({ x: 75, z: -45 }, { x: 0, z: 0 }));
  });

  it('places the head on the target as given when nothing is clamping it', () => {
    const app = buildApp();
    const navigation = { boundsCenter: { x: 0, z: 0 }, boundsRadius: 0 };
    const head = { x: 0, y: 1.7, z: 0 };
    const { entity, rig, rigPosition } = buildRig({ head, navigation });
    const script = mountScript(app, entity);
    script.targetX = 75;
    script.targetZ = -45;

    app.startSession();
    app.poseFrame();
    script.update();

    const landed = headAfter(rig, head, rigPosition, entity.yaw);
    expect(landed.x).toBeCloseTo(75);
    expect(landed.z).toBeCloseTo(-45);
  });
});
