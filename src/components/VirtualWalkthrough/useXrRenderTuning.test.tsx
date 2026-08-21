import { renderHook } from '@testing-library/react';

import { useXrRenderTuning } from './useXrRenderTuning';
import { XR_FIXED_FOVEATION, XR_GSPLAT_TUNING } from './xr-render-tuning';

const handlers = new Map<string, () => void>();

const DESKTOP_GSPLAT = { radialSorting: false, alphaClipForward: 0, minPixelSize: 0 };

// Plain functions rather than jest.fn: the app-wide `resetMocks` would strip their implementations
// before each test, leaving nothing to register the handlers.
const mockApp = {
  xr: {
    active: false,
    fixedFoveation: null as number | null,
    on: (name: string, handler: () => void) => {
      handlers.set(name, handler);
    },
    off: (name: string, handler: () => void) => {
      if (handlers.get(name) === handler) {
        handlers.delete(name);
      }
    },
  },
  scene: { gsplat: { ...DESKTOP_GSPLAT } },
};

// Virtual: jest's resolver doesn't follow the package's subpath exports.
jest.mock('@playcanvas/react/hooks', () => ({ useApp: () => mockApp }), { virtual: true });

const startSession = () => {
  mockApp.xr.active = true;
  handlers.get('start')?.();
};

const endSession = () => {
  mockApp.xr.active = false;
  handlers.get('end')?.();
};

beforeEach(() => {
  handlers.clear();
  mockApp.xr.active = false;
  mockApp.xr.fixedFoveation = null;
  mockApp.scene.gsplat = { ...DESKTOP_GSPLAT };
});

describe('useXrRenderTuning', () => {
  it('tunes the scene when a session starts', () => {
    renderHook(() => useXrRenderTuning());
    startSession();

    expect(mockApp.scene.gsplat).toEqual(XR_GSPLAT_TUNING);
    expect(mockApp.xr.fixedFoveation).toBe(XR_FIXED_FOVEATION);
  });

  it('tunes the scene when it mounts into a session that is already running', () => {
    mockApp.xr.active = true;

    renderHook(() => useXrRenderTuning());

    // `start` fired before this viewer existed, so waiting for the event would leave a headset
    // rendering with the desktop settings for the whole session.
    expect(mockApp.scene.gsplat).toEqual(XR_GSPLAT_TUNING);
    expect(mockApp.xr.fixedFoveation).toBe(XR_FIXED_FOVEATION);
  });

  it('restores the desktop settings when the session ends', () => {
    renderHook(() => useXrRenderTuning());
    startSession();
    endSession();

    expect(mockApp.scene.gsplat).toEqual(DESKTOP_GSPLAT);
  });

  it('restores the desktop settings when unmounted mid-session', () => {
    const { unmount } = renderHook(() => useXrRenderTuning());
    startSession();
    unmount();

    expect(mockApp.scene.gsplat).toEqual(DESKTOP_GSPLAT);
    expect(handlers.size).toBe(0);
  });

  it('restores the desktop settings when unmounted from a session it did not start', () => {
    mockApp.xr.active = true;

    const { unmount } = renderHook(() => useXrRenderTuning());
    unmount();

    expect(mockApp.scene.gsplat).toEqual(DESKTOP_GSPLAT);
  });

  it('captures the desktop settings once when a running session also fires start', () => {
    mockApp.xr.active = true;

    const { unmount } = renderHook(() => useXrRenderTuning());
    // Nothing stops the engine firing `start` for a session this hook has already tuned for.
    handlers.get('start')?.();
    unmount();

    expect(mockApp.scene.gsplat).toEqual(DESKTOP_GSPLAT);
  });
});
