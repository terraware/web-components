import { XrInputSource } from 'playcanvas';

import { TeleportGestureLatch } from './xr-teleport-gesture';

const source = (): XrInputSource => ({}) as unknown as XrInputSource;

/** An ordinary aiming frame: pressed, teleport on, ray clear of interactive UI. */
const AIMING = { pressed: true, teleportDisabled: false, uiBlocked: false };

describe('TeleportGestureLatch', () => {
  it('allows a press that never aimed at UI', () => {
    const latch = new TeleportGestureLatch();
    const src = source();

    latch.track(src, AIMING);
    latch.track(src, AIMING);

    expect(latch.consumeBlocked(src)).toBe(false);
  });

  it('blocks a press whose last aiming frame was over UI, even after the ray leaves on release', () => {
    const latch = new TeleportGestureLatch();
    const src = source();

    latch.track(src, { ...AIMING, uiBlocked: true });

    // The release-time ray no longer hits the UI, but the cached arc hit is from the frame above.
    expect(latch.consumeBlocked(src)).toBe(true);
  });

  it('allows a press that swept across UI but came to rest on open floor', () => {
    const latch = new TeleportGestureLatch();
    const src = source();

    latch.track(src, AIMING);
    latch.track(src, { ...AIMING, uiBlocked: true });
    latch.track(src, AIMING);

    expect(latch.consumeBlocked(src)).toBe(false);
  });

  it('latches a teleport-disabled frame for the rest of the press', () => {
    const latch = new TeleportGestureLatch();
    const src = source();

    latch.track(src, { ...AIMING, teleportDisabled: true });
    latch.track(src, AIMING);

    expect(latch.consumeBlocked(src)).toBe(true);
  });

  it('clears the latches once consumed, so the next press starts clean', () => {
    const latch = new TeleportGestureLatch();
    const src = source();

    latch.track(src, { pressed: true, teleportDisabled: true, uiBlocked: true });
    expect(latch.consumeBlocked(src)).toBe(true);

    latch.track(src, AIMING);
    expect(latch.consumeBlocked(src)).toBe(false);
  });

  it('drops latches from a press that ended without being consumed', () => {
    const latch = new TeleportGestureLatch();
    const src = source();

    latch.track(src, { pressed: true, teleportDisabled: true, uiBlocked: true });
    latch.track(src, { pressed: false, teleportDisabled: true, uiBlocked: true });
    latch.track(src, AIMING);

    expect(latch.consumeBlocked(src)).toBe(false);
  });

  it('tracks each input source independently', () => {
    const latch = new TeleportGestureLatch();
    const left = source();
    const right = source();

    latch.track(left, { ...AIMING, uiBlocked: true });
    latch.track(right, AIMING);

    expect(latch.consumeBlocked(right)).toBe(false);
    expect(latch.consumeBlocked(left)).toBe(true);
  });
});
