import { Vec3 } from 'playcanvas';

import {
  rayHitsAnnotationHotspot,
  rayHitsAnnotationPanel,
  rayHitsExitButton,
  rayHitsInteractiveUi,
} from './xr-interactive-ui';

// Jest cannot parse the PlayCanvas ESM scripts that xr-annotation-candidates imports.
jest.mock('playcanvas/scripts/esm/annotations.mjs', () => ({ Annotation: { scriptName: 'annotation' } }));

const ORIGIN = new Vec3(0, 0, 5);
const FORWARD = new Vec3(0, 0, -1);

/** Fake annotation hotspot entity: unit quad at `position`, scale 1, with the stock open callback. */
const hotspot = (position: Vec3) => ({
  getPosition: () => position,
  getWorldTransform: () => ({ getScale: (out: Vec3) => out.set(1, 1, 1) }),
  script: { get: () => ({ onVrOpenCallback: () => undefined }) },
});

interface FakeSceneOptions {
  hotspots?: ReturnType<typeof hotspot>[];
  panelHit?: boolean;
  panelHasScript?: boolean;
  exitHit?: boolean;
}

/**
 * Fake app whose `findByName` serves only the entities the helpers look up. The script stubs ignore the
 * requested script name, so these tests cover the ray plumbing, not the script-name wiring.
 */
const fakeApp = ({ hotspots, panelHit, panelHasScript = true, exitHit }: FakeSceneOptions) => ({
  root: {
    findByName: (name: string) => {
      if (name === 'annotations-root') {
        return hotspots ? { children: hotspots } : null;
      }
      if (name === 'vr-annotation-panel') {
        if (panelHit === undefined) {
          return null;
        }

        return { script: { get: () => (panelHasScript ? { rayHitsPanel: () => panelHit } : {}) } };
      }
      if (name === 'xr-exit-button') {
        return exitHit === undefined ? null : { script: { get: () => ({ rayHitsButton: () => exitHit }) } };
      }

      return null;
    },
  },
});

describe('rayHitsAnnotationHotspot', () => {
  it('is true when the ray enters a hotspot sphere', () => {
    const app = fakeApp({ hotspots: [hotspot(new Vec3(0, 0, 0))] });
    expect(rayHitsAnnotationHotspot(app, ORIGIN, FORWARD)).toBe(true);
  });

  it('is false when the ray misses every hotspot', () => {
    const app = fakeApp({ hotspots: [hotspot(new Vec3(0, 8, 0))] });
    expect(rayHitsAnnotationHotspot(app, ORIGIN, FORWARD)).toBe(false);
  });

  it('is false when there is no annotations root', () => {
    expect(rayHitsAnnotationHotspot(fakeApp({}), ORIGIN, FORWARD)).toBe(false);
  });
});

describe('rayHitsAnnotationPanel', () => {
  it('delegates to the panel script', () => {
    expect(rayHitsAnnotationPanel(fakeApp({ panelHit: true }), ORIGIN, FORWARD)).toBe(true);
    expect(rayHitsAnnotationPanel(fakeApp({ panelHit: false }), ORIGIN, FORWARD)).toBe(false);
  });

  it('is false when no panel is mounted', () => {
    expect(rayHitsAnnotationPanel(fakeApp({}), ORIGIN, FORWARD)).toBe(false);
  });

  it('is false when the panel entity has no hit-test method', () => {
    const app = fakeApp({ panelHit: true, panelHasScript: false });
    expect(rayHitsAnnotationPanel(app, ORIGIN, FORWARD)).toBe(false);
  });
});

describe('rayHitsExitButton', () => {
  it('delegates to the exit button script', () => {
    expect(rayHitsExitButton(fakeApp({ exitHit: true }), ORIGIN, FORWARD)).toBe(true);
    expect(rayHitsExitButton(fakeApp({ exitHit: false }), ORIGIN, FORWARD)).toBe(false);
  });

  it('is false when no exit button is mounted', () => {
    expect(rayHitsExitButton(fakeApp({}), ORIGIN, FORWARD)).toBe(false);
  });
});

describe('rayHitsInteractiveUi', () => {
  it('is false when the ray hits nothing interactive', () => {
    const app = fakeApp({ hotspots: [hotspot(new Vec3(0, 8, 0))], panelHit: false, exitHit: false });
    expect(rayHitsInteractiveUi(app, ORIGIN, FORWARD)).toBe(false);
  });

  it('is true for a hotspot hit', () => {
    const app = fakeApp({ hotspots: [hotspot(new Vec3(0, 0, 0))], panelHit: false, exitHit: false });
    expect(rayHitsInteractiveUi(app, ORIGIN, FORWARD)).toBe(true);
  });

  it('is true for a panel hit', () => {
    expect(rayHitsInteractiveUi(fakeApp({ panelHit: true }), ORIGIN, FORWARD)).toBe(true);
  });

  it('is true for an exit button hit', () => {
    expect(rayHitsInteractiveUi(fakeApp({ exitHit: true }), ORIGIN, FORWARD)).toBe(true);
  });

  it('is false in an empty scene', () => {
    expect(rayHitsInteractiveUi(fakeApp({}), ORIGIN, FORWARD)).toBe(false);
  });
});
