import { XrInputSource } from 'playcanvas';

import { ButtonArmingLatch } from './xr-button-arming';

const source = (): XrInputSource => ({}) as unknown as XrInputSource;

describe('ButtonArmingLatch', () => {
  it('never counts a source pressed from the very first poll, while it stays down', () => {
    const latch = new ButtonArmingLatch();
    const src = source();

    expect(latch.trackPress(src, true)).toBe(false);
    expect(latch.trackPress(src, true)).toBe(false);
    expect(latch.trackPress(src, true)).toBe(false);
  });

  it('counts a press that follows a release', () => {
    const latch = new ButtonArmingLatch();
    const src = source();

    latch.trackPress(src, true);
    latch.trackPress(src, false);

    expect(latch.trackPress(src, true)).toBe(true);
  });

  it('tracks each input source independently, so one held from the first poll does not block another', () => {
    const latch = new ButtonArmingLatch();
    const held = source();
    const other = source();

    latch.trackPress(held, true);
    latch.trackPress(other, false);

    expect(latch.trackPress(held, true)).toBe(false);
    expect(latch.trackPress(other, true)).toBe(true);
  });

  it('stays armed across later press/release cycles', () => {
    const latch = new ButtonArmingLatch();
    const src = source();

    latch.trackPress(src, false);
    expect(latch.trackPress(src, true)).toBe(true);
    latch.trackPress(src, false);
    expect(latch.trackPress(src, true)).toBe(true);
  });
});
