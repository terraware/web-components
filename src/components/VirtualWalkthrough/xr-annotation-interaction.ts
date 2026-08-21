import { CameraComponent, Script, Vec3, XRTYPE_VR, XrInputSource } from 'playcanvas';

import { HIT_RADIUS_PAD, collectAnnotationHitCandidates } from './xr-annotation-candidates';
import { nearestAnnotationHit } from './xr-annotation-targeting';
import { FaceButtonPressTracker } from './xr-face-buttons';
import { rayHitsAnnotationPanel } from './xr-interactive-ui';

export class XrAnnotationInteraction extends Script {
  static scriptName = 'xrAnnotationInteraction';

  onDismissCallback?: () => void;

  private _faceButtons = new FaceButtonPressTracker();

  private _isVrActive = () => this.app.xr?.active === true && this.app.xr?.type === XRTYPE_VR;

  private _dismiss = () => {
    if (typeof this.onDismissCallback === 'function') {
      this.onDismissCallback();
    }
  };

  private _onSelect = (inputSource: XrInputSource) => {
    if (!this._isVrActive()) {
      return;
    }
    this._openAnnotationUnderRay(inputSource.getOrigin(), inputSource.getDirection());
  };

  private _openAnnotationUnderRay(origin: Vec3, direction: Vec3) {
    // Checked before the hotspots so aiming at the panel (e.g. its carousel arrows) neither
    // dismisses it nor opens an annotation whose padded hit sphere sits behind it.
    if (rayHitsAnnotationPanel(this.app, origin, direction)) {
      return;
    }

    const candidates = collectAnnotationHitCandidates(this.app, HIT_RADIUS_PAD);
    const index = nearestAnnotationHit(origin, direction, candidates);
    if (index === null) {
      this._dismiss();

      return;
    }

    const { entity, script } = candidates[index];
    // Resolved by component rather than by entity name: the walkthrough can be mounted into a host
    // scene whose own camera entity is also called `camera`, and can be handed no camera of its own.
    const camera = this.app.root.findComponent('camera') as CameraComponent | null;
    const screen = camera?.worldToScreen(entity.getPosition());
    script.onVrOpenCallback(screen?.x ?? 0, screen?.y ?? 0);
  }

  initialize() {
    this.app.xr?.input?.on('select', this._onSelect);
    this.once('destroy', () => this.app.xr?.input?.off('select', this._onSelect));
  }

  update() {
    if (!this._isVrActive()) {
      return;
    }

    // A face button dismisses from any aim direction, unlike the click-out select. Harmless when
    // nothing is open: the React close handler re-sets state it already holds.
    for (const inputSource of this.app.xr?.input?.inputSources ?? []) {
      if (this._faceButtons.justPressed(inputSource)) {
        this._dismiss();

        return;
      }
    }
  }
}
