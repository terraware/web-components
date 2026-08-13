import { createRef } from 'react';

import { renderHook } from '@testing-library/react';
import { Script, XRTYPE_AR, XRTYPE_VR } from 'playcanvas';

import { useRestartOnVr } from './useRestartOnVr';

const handlers = new Map<string, () => void>();

// Plain functions rather than jest.fn: the app-wide `resetMocks` would strip their implementations
// before each test, leaving nothing to register the handlers.
const mockApp = {
  xr: {
    type: null as string | null,
    on: (name: string, handler: () => void) => {
      handlers.set(name, handler);
    },
    off: (name: string, handler: () => void) => {
      if (handlers.get(name) === handler) {
        handlers.delete(name);
      }
    },
  },
};

// Virtual: jest's resolver doesn't follow the package's subpath exports.
jest.mock('@playcanvas/react/hooks', () => ({ useApp: () => mockApp }), { virtual: true });

/**
 * Stands in for a script instance, recording the transitions its `enabled` setter would turn into
 * `enable` and `disable` events. PlayCanvas only fires those on a change of state.
 */
const createScript = (enabled: boolean) => {
  const transitions: boolean[] = [];

  const script = {
    get enabled() {
      return enabled;
    },
    set enabled(value: boolean) {
      if (value !== enabled) {
        transitions.push(value);
      }
      enabled = value;
    },
  };

  return { script: script as unknown as Script, transitions };
};

const startSession = (type: string) => {
  mockApp.xr.type = type;
  handlers.get('start')?.();
};

beforeEach(() => {
  handlers.clear();
  mockApp.xr.type = null;
});

describe('useRestartOnVr', () => {
  it('re-enables an effect that has already played out', () => {
    const { script, transitions } = createScript(false);
    const ref = createRef<Script>();
    ref.current = script;

    renderHook(() => useRestartOnVr(ref, true));
    startSession(XRTYPE_VR);

    expect(transitions).toEqual([true]);
  });

  it('takes an effect that is still playing back through disabled', () => {
    const { script, transitions } = createScript(true);
    const ref = createRef<Script>();
    ref.current = script;

    renderHook(() => useRestartOnVr(ref, true));
    startSession(XRTYPE_VR);

    // Without the trip through false the setter sees no change and never fires `enable`, which is
    // what resets the effect's timeline.
    expect(transitions).toEqual([false, true]);
  });

  it('leaves the effect alone for an AR session', () => {
    const { script, transitions } = createScript(false);
    const ref = createRef<Script>();
    ref.current = script;

    renderHook(() => useRestartOnVr(ref, true));
    startSession(XRTYPE_AR);

    expect(transitions).toEqual([]);
  });

  it('does not enable an effect the caller has turned off', () => {
    const { script, transitions } = createScript(false);
    const ref = createRef<Script>();
    ref.current = script;

    renderHook(() => useRestartOnVr(ref, false));
    startSession(XRTYPE_VR);

    expect(transitions).toEqual([]);
  });

  it('survives a session that starts before the script instance exists', () => {
    const ref = createRef<Script>();

    renderHook(() => useRestartOnVr(ref, true));

    expect(() => startSession(XRTYPE_VR)).not.toThrow();
  });

  it('stops listening when unmounted', () => {
    const { script, transitions } = createScript(false);
    const ref = createRef<Script>();
    ref.current = script;

    const { unmount } = renderHook(() => useRestartOnVr(ref, true));
    unmount();
    startSession(XRTYPE_VR);

    expect(handlers.has('start')).toBe(false);
    expect(transitions).toEqual([]);
  });
});
