import { Vec3 } from 'playcanvas';

// The real base script is an .mjs file that Jest's default CRA transform config never transforms
// (node_modules is excluded), so importing it directly fails to parse. Nothing under test relies on
// the base's behaviour, so stubs for the two methods that are called through are enough.
jest.mock('playcanvas/scripts/esm/xr/xr-navigation.mjs', () => ({
  XrNavigation: class {
    update() {
      return undefined;
    }
    tryTeleport() {
      return undefined;
    }
  },
}));

import { TfXrNavigation } from './TfXrNavigation';
import { TeleportGestureLatch } from './xr-teleport-gesture';

const BOUNDS_CENTER = new Vec3(2, 0, 3);
const BOUNDS_RADIUS = 5;

const makeNavigation = (options: { xrActive: boolean; boundsRadius: number; head: Vec3 }) => {
  const translate = jest.fn();
  const navigation = Object.create(TfXrNavigation.prototype) as TfXrNavigation;

  navigation.boundsCenter = BOUNDS_CENTER.clone();
  navigation.boundsRadius = options.boundsRadius;
  navigation.clampDistance = 0;
  navigation.app = { xr: { active: options.xrActive } };
  navigation.entity = { translate };
  Object.assign(navigation, { _cameraEntity: { getPosition: () => options.head } });

  return { navigation, translate };
};

describe('TfXrNavigation.postUpdate', () => {
  it('does not clamp when there is no active XR session, even with the head far outside the circle', () => {
    const { navigation, translate } = makeNavigation({
      xrActive: false,
      boundsRadius: BOUNDS_RADIUS,
      head: new Vec3(1000, 1.5, 1000),
    });

    navigation.postUpdate();

    expect(translate).not.toHaveBeenCalled();
    expect(navigation.clampDistance).toBe(0);
  });

  it('does not clamp when boundsRadius is 0', () => {
    const { navigation, translate } = makeNavigation({
      xrActive: true,
      boundsRadius: 0,
      head: new Vec3(1000, 1.5, 1000),
    });

    navigation.postUpdate();

    expect(translate).not.toHaveBeenCalled();
    expect(navigation.clampDistance).toBe(0);
  });

  it('does not clamp when the head is inside the circle', () => {
    const { navigation, translate } = makeNavigation({
      xrActive: true,
      boundsRadius: BOUNDS_RADIUS,
      head: new Vec3(3, 1.5, 4),
    });

    navigation.postUpdate();

    expect(translate).not.toHaveBeenCalled();
    expect(navigation.clampDistance).toBe(0);
  });

  it('pulls the rig back and records the overshoot when the head is outside the circle in an active session', () => {
    const { navigation, translate } = makeNavigation({
      xrActive: true,
      boundsRadius: BOUNDS_RADIUS,
      head: new Vec3(10, 1.5, 3),
    });

    navigation.postUpdate();

    expect(translate).toHaveBeenCalledTimes(1);
    expect(translate).toHaveBeenCalledWith(-3, 0, 0);
    expect(navigation.clampDistance).toBe(3);
  });

  it('does not latch clampDistance across frames', () => {
    const { navigation, translate } = makeNavigation({
      xrActive: true,
      boundsRadius: BOUNDS_RADIUS,
      head: new Vec3(10, 1.5, 3),
    });

    navigation.postUpdate();
    expect(navigation.clampDistance).toBe(3);

    Object.assign(navigation, { _cameraEntity: { getPosition: () => new Vec3(3, 1.5, 4) } });
    navigation.postUpdate();

    expect(translate).toHaveBeenCalledTimes(1);
    expect(navigation.clampDistance).toBe(0);
  });
});

/** The slice of an XR input source the navigation attaches to. */
const makeInputSource = (handedness: string) => {
  const handlers = new Map<string, () => void>();

  return {
    handedness,
    gamepad: { axes: [0, 0, 0, 0] },
    on: (name: string, handler: () => void) => {
      handlers.set(name, handler);
    },
    off: (name: string) => {
      handlers.delete(name);
    },
    fire: (name: string) => handlers.get(name)?.(),
  };
};

const makeSessionNavigation = (inputSources: unknown[]) => {
  const navigation = Object.create(TfXrNavigation.prototype) as TfXrNavigation;

  navigation.boundsRadius = 0;
  navigation.enableTeleport = true;
  navigation.app = { xr: { active: true, input: { inputSources } } };
  navigation.entity = { findComponent: () => null };
  Object.assign(navigation, {
    _gestures: new TeleportGestureLatch(),
    _inputSources: new Set(),
    _inputHandlers: new Map(),
    _activePointers: new Map(),
    _arcHits: new Map(),
    _arcVisuals: new Map(),
  });

  return navigation;
};

/**
 * The base script learns about controllers from the XR input 'add' event, which it subscribes to in
 * initialize. A walkthrough that adopts the host's camera is mounted into a session that is already
 * running, so those events fired before the script existed.
 */
describe('TfXrNavigation input sources', () => {
  it('tracks controllers that were already present when it started', () => {
    const left = makeInputSource('left');
    const right = makeInputSource('right');
    const navigation = makeSessionNavigation([left, right]);

    navigation.update(1 / 60);

    const tracked = (navigation as unknown as { _inputSources: Set<unknown> })._inputSources;
    expect(tracked.has(left)).toBe(true);
    expect(tracked.has(right)).toBe(true);
  });

  it('teleports on a select from a controller it picked up', () => {
    const source = makeInputSource('right');
    const navigation = makeSessionNavigation([source]);
    const tryTeleport = jest.spyOn(navigation, 'tryTeleport').mockImplementation(() => undefined);

    navigation.update(1 / 60);
    source.fire('selectend');

    expect(tryTeleport).toHaveBeenCalledWith(source);
  });

  it('does not track the same controller twice', () => {
    const source = makeInputSource('left');
    const navigation = makeSessionNavigation([source]);

    navigation.update(1 / 60);
    navigation.update(1 / 60);

    const handlers = (navigation as unknown as { _inputHandlers: Map<unknown, unknown> })._inputHandlers;
    expect(handlers.size).toBe(1);
  });
});
