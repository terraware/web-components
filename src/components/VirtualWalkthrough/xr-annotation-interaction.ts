import { Script, Vec3, XRTYPE_VR, XrInputSource } from 'playcanvas';

import { VrAnnotationPanel } from './vr-annotation-panel';
import { collectAnnotationHitCandidates } from './xr-annotation-candidates';
import { nearestAnnotationHit } from './xr-annotation-targeting';

/** Multiplier on the hotspot's world radius to make controller targeting forgiving. */
const HIT_RADIUS_PAD = 2.5;

export class XrAnnotationInteraction extends Script {
  static scriptName = 'xrAnnotationInteraction';

  onEmptySelectCallback?: () => void;

  private _isVrActive = () => this.app.xr?.active === true && this.app.xr?.type === XRTYPE_VR;

  private _onSelect = (inputSource: XrInputSource) => {
    if (!this._isVrActive()) {
      return;
    }
    this._openAnnotationUnderRay(inputSource.getOrigin(), inputSource.getDirection());
  };

  /** True when an open panel is under the ray; it draws in front of everything, so it wins. */
  private _rayHitsOpenPanel(origin: Vec3, direction: Vec3): boolean {
    const panel = this.app.root.findByName('vr-annotation-panel') as any;
    const panelScript = panel?.script?.get(VrAnnotationPanel.scriptName);

    return typeof panelScript?.rayHitsPanel === 'function' && panelScript.rayHitsPanel(origin, direction);
  }

  private _openAnnotationUnderRay(origin: Vec3, direction: Vec3) {
    // Checked before the hotspots so aiming at the panel (e.g. its carousel arrows) neither
    // dismisses it nor opens an annotation whose padded hit sphere sits behind it.
    if (this._rayHitsOpenPanel(origin, direction)) {
      return;
    }

    const candidates = collectAnnotationHitCandidates(this.app, HIT_RADIUS_PAD);
    const index = nearestAnnotationHit(origin, direction, candidates);
    if (index === null) {
      if (typeof this.onEmptySelectCallback === 'function') {
        this.onEmptySelectCallback();
      }

      return;
    }

    const { entity, script } = candidates[index];
    const camera = this.app.root.findByName('camera') as any;
    const screen = camera?.camera?.worldToScreen(entity.getPosition());
    script.onVrOpenCallback(screen?.x ?? 0, screen?.y ?? 0);
  }

  initialize() {
    this.app.xr?.input?.on('select', this._onSelect);
    this.once('destroy', () => this.app.xr?.input?.off('select', this._onSelect));
  }
}
