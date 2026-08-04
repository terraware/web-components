import { Color, Script, Vec3 } from 'playcanvas';

/** Length of the drawn pointer ray, in world meters. */
const RAY_LENGTH = 5;

/** Ray colour (cyan) — bright enough to read against the scene. */
const RAY_COLOR = new Color(0.25, 0.8, 1);

export class XrPointerRay extends Script {
  static scriptName = 'xrPointerRay';

  private _end = new Vec3();

  update() {
    if (this.app.xr?.active !== true) {
      return;
    }

    const sources = this.app.xr?.input?.inputSources ?? [];
    for (const source of sources) {
      const origin = source.getOrigin();
      const direction = source.getDirection();
      this._end.copy(direction).mulScalar(RAY_LENGTH).add(origin);
      this.app.drawLine(origin, this._end, RAY_COLOR, false);
    }
  }
}
