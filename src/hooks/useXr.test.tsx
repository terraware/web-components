import { renderHook } from '@testing-library/react';
import { XRTYPE_VR } from 'playcanvas';

import { useXr } from './useXr';

const mockApp = {
  xr: {
    active: false,
    type: null,
    isAvailable: (type: string) => type === XRTYPE_VR,
    on: jest.fn(),
    off: jest.fn(),
  },
  root: { findComponent: jest.fn() },
};

// Virtual: jest's resolver doesn't follow the package's subpath exports.
jest.mock('@playcanvas/react/hooks', () => ({ useApp: () => mockApp }), { virtual: true });

describe('useXr', () => {
  it('reports availability on the first render, before any effect has run', () => {
    const reported: boolean[] = [];

    renderHook(() => {
      const { isXrAvailable } = useXr();
      reported.push(isXrAvailable('VR'));
    });

    // Callers that act in a mount effect — starting a session the moment the viewer appears — read
    // this value before a state update from another effect could reach them.
    expect(reported[0]).toBe(true);
  });
});
