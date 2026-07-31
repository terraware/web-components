import React from 'react';

import { render, screen } from '@testing-library/react';

import AnnotationPanel from './AnnotationPanel';

// BusySpinner (rendered transitively via PhotosCarousel) imports the ESM-only `hex-rgb`
// package, which CRA's default Jest config (transformIgnorePatterns excludes node_modules)
// cannot parse. Mocked here (scoped to this test file only) to work around that
// pre-existing, repo-wide incompatibility.
jest.mock('../BusySpinner', () => ({
  __esModule: true,
  default: () => <div data-testid='busy-spinner' />,
}));

// jsdom reports 0 for layout measurements like offsetWidth, but react-multi-carousel
// only mounts slide/arrow content once it measures a non-zero container width. Stubbing
// it here (scoped to this test file) lets the carousel render as it would in a browser.
Object.defineProperty(HTMLElement.prototype, 'offsetWidth', {
  configurable: true,
  value: 500,
});

const baseAnnotation = {
  position: [0, 0, 0] as [number, number, number],
  title: 'Mangrove nursery',
};

test('renders a carousel image for every annotation image', () => {
  render(
    <AnnotationPanel
      annotation={{ ...baseAnnotation, imageUrls: ['https://example.com/a.jpg', 'https://example.com/b.jpg'] }}
      onClose={() => undefined}
    />
  );
  // Only the currently-visible slide is exposed in the accessibility tree
  // (react-multi-carousel marks off-screen slides aria-hidden); { hidden: true }
  // includes those so we can confirm both images actually mounted in the DOM.
  expect(screen.getAllByRole('img', { hidden: true })).toHaveLength(2);
});

test('renders the title and no image when there are no images', () => {
  render(<AnnotationPanel annotation={baseAnnotation} onClose={() => undefined} />);
  expect(screen.getByTestId('annotation-panel-title')).toHaveTextContent('Mangrove nursery');
  expect(screen.queryByRole('img', { hidden: true })).not.toBeInTheDocument();
});
