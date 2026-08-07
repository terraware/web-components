import { Vec3 } from 'playcanvas';

// The real base script is an .mjs file that Jest's default CRA transform config never transforms
// (node_modules is excluded), so importing it directly fails to parse. TfXrNavigation.postUpdate
// never calls into the base class, so a stub with no behaviour is enough to satisfy `extends`.
jest.mock('playcanvas/scripts/esm/xr/xr-navigation.mjs', () => ({
  XrNavigation: class {},
}));

import { TfXrNavigation } from './TfXrNavigation';

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
