import { Script, Vec3, XRTYPE_VR, XrInputSource } from 'playcanvas';
import { Annotation as PcAnnotation } from 'playcanvas/scripts/esm/annotations.mjs';

import { VrAnnotationPanel } from './vr-annotation-panel';
import { nearestAnnotationHit } from './xr-annotation-targeting';

/** Local half-extent of the unit-plane hotspot quad. */
const HOTSPOT_HALF_EXTENT = 0.5;

/** Multiplier on the hotspot's world radius to make controller targeting forgiving. */
const HIT_RADIUS_PAD = 2.5;

export class XrAnnotationInteraction extends Script {
  static scriptName = 'xrAnnotationInteraction';

  onEmptySelectCallback?: () => void;

  private _scratchScale = new Vec3();

  private _isVrActive = () => this.app.xr?.active === true && this.app.xr?.type === XRTYPE_VR;

  private _onSelect = (inputSource: XrInputSource) => {
    if (!this._isVrActive()) {
      return;
    }
    this._openAnnotationUnderRay(inputSource.getOrigin(), inputSource.getDirection());
  };

  private _collectAnnotationEntities() {
    const root = this.app.root.findByName('annotations-root');

    return root ? root.children : [];
  }

  private _hitRadius(entity: any): number {
    entity.getWorldTransform().getScale(this._scratchScale);

    return HOTSPOT_HALF_EXTENT * this._scratchScale.x * HIT_RADIUS_PAD;
  }

  private _openAnnotationUnderRay(origin: Vec3, direction: Vec3) {
    const entities = this._collectAnnotationEntities();
    const openable = entities
      .map((ent: any) => ({ entity: ent, script: ent.script?.get(PcAnnotation.scriptName) }))
      .filter(({ script: scr }: any) => scr && scr.enabled !== false && typeof scr.onVrOpenCallback === 'function');

    const candidates = openable.map(({ entity: ent }: any) => ({
      position: ent.getPosition(),
      radius: this._hitRadius(ent),
    }));

    const index = nearestAnnotationHit(origin, direction, candidates);
    if (index === null) {
      // Aiming at the open panel (e.g. its carousel arrows) must not dismiss it.
      const panel = this.app.root.findByName('vr-annotation-panel') as any;
      const panelScript = panel?.script?.get(VrAnnotationPanel.scriptName);
      if (
        panelScript &&
        typeof panelScript.rayHitsPanel === 'function' &&
        panelScript.rayHitsPanel(origin, direction)
      ) {
        return;
      }

      if (typeof this.onEmptySelectCallback === 'function') {
        this.onEmptySelectCallback();
      }

      return;
    }

    const { entity, script } = openable[index];
    const camera = this.app.root.findByName('camera') as any;
    const screen = camera?.camera?.worldToScreen(entity.getPosition());
    script.onVrOpenCallback(screen?.x ?? 0, screen?.y ?? 0);
  }

  initialize() {
    this.app.xr?.input?.on('select', this._onSelect);
  }

  destroy() {
    this.app.xr?.input?.off('select', this._onSelect);
  }
}
