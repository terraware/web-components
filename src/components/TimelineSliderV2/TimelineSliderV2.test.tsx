import React from 'react';

import { render, screen } from '@testing-library/react';

import TimelineSliderV2 from '.';

const CONTAINER_WIDTH = 500;

class ResizeObserverMock {
  disconnect = jest.fn();
  observe = jest.fn();
  unobserve = jest.fn();
}

beforeAll(() => {
  global.ResizeObserver = ResizeObserverMock as unknown as typeof ResizeObserver;

  Object.defineProperty(HTMLElement.prototype, 'clientWidth', { configurable: true, value: CONTAINER_WIDTH });
});

test('names a dot from its mark label', () => {
  render(<TimelineSliderV2 marks={[{ color: '#0f0', id: 'a', label: 'Jul 2022', value: 0 }]} />);

  expect(screen.getByRole('button', { name: 'Jul 2022' })).toBeInTheDocument();
});

test('prefers an explicit ariaLabel over the label', () => {
  render(
    <TimelineSliderV2
      marks={[{ ariaLabel: 'July 2022 observation', color: '#0f0', id: 'a', label: 'Jul 2022', value: 0 }]}
    />
  );

  expect(screen.getByRole('button', { name: 'July 2022 observation' })).toBeInTheDocument();
});

test('joins member names on a clustered dot', () => {
  render(
    <TimelineSliderV2
      marks={[
        { color: '#0f0', id: 'a', label: 'Jul 2022', value: 0 },
        { color: '#f90', id: 'b', label: 'Aug 2022', value: 1 },
        { color: '#00f', id: 'c', label: 'Aug 2025', value: 100 },
      ]}
    />
  );

  expect(screen.getByRole('button', { name: 'Jul 2022, Aug 2022' })).toBeInTheDocument();
  expect(screen.getByRole('button', { name: 'Aug 2025' })).toBeInTheDocument();
});

test('omits the accessible name when a mark has no label', () => {
  render(<TimelineSliderV2 marks={[{ color: '#0f0', id: 'a', value: 0 }]} />);

  expect(screen.getByRole('button')).not.toHaveAttribute('aria-label');
});
