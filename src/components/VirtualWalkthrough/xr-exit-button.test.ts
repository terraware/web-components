import { Vec3 } from 'playcanvas';

import { XrExitButton, raySphereIntersect } from './xr-exit-button';

describe('raySphereIntersect', () => {
  const CENTER = new Vec3(0, 0, 0);

  it('hits a sphere straight ahead of the ray', () => {
    expect(raySphereIntersect(new Vec3(0, 0, 5), new Vec3(0, 0, -1), CENTER, 1)).toBe(true);
  });

  it('misses a sphere off to the side', () => {
    expect(raySphereIntersect(new Vec3(0, 5, 5), new Vec3(0, 0, -1), CENTER, 1)).toBe(false);
  });

  it('misses when the sphere is behind the ray origin', () => {
    expect(raySphereIntersect(new Vec3(0, 0, 5), new Vec3(0, 0, 1), CENTER, 1)).toBe(false);
  });

  it('hits when the ray origin is inside the sphere', () => {
    expect(raySphereIntersect(new Vec3(0, 0, 0), new Vec3(1, 0, 0), CENTER, 1)).toBe(true);
  });

  it('normalizes a non-unit direction', () => {
    expect(raySphereIntersect(new Vec3(0, 0, 5), new Vec3(0, 0, -3), CENTER, 1)).toBe(true);
  });

  it('grazes a tangent sphere', () => {
    expect(raySphereIntersect(new Vec3(0, 1, 5), new Vec3(0, 0, -1), CENTER, 1)).toBe(true);
  });
});

describe('XrExitButton.close', () => {
  const makeButton = () => {
    const end = jest.fn();
    const button = Object.create(XrExitButton.prototype) as XrExitButton;
    Object.assign(button, { app: { xr: { end } } });

    return { button, end };
  };

  it('ends the session when no handler is set', () => {
    const { button, end } = makeButton();

    button.close();

    expect(end).toHaveBeenCalledTimes(1);
  });

  it('calls the handler and leaves the session running', () => {
    const { button, end } = makeButton();
    const onClose = jest.fn();
    button.onClose = onClose;

    button.close();

    expect(onClose).toHaveBeenCalledTimes(1);
    expect(end).not.toHaveBeenCalled();
  });
});
