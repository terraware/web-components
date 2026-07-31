import React from 'react';

import { fireEvent, render, screen, waitFor } from '@testing-library/react';

import PhotosCarousel, { PhotoItem } from '.';

// BusySpinner transitively imports the ESM-only `hex-rgb` package, which CRA's default
// Jest config (transformIgnorePatterns excludes node_modules) cannot parse. Mocked here
// (scoped to this test file only) to work around that pre-existing, repo-wide
// incompatibility; index.tsx/styles.scss remain unmodified from the brief. Rendered as
// an identifiable stub (rather than null) so tests can assert on its presence/absence.
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

const photos: PhotoItem[] = [
  { url: 'https://example.com/a.jpg', alt: 'Photo A' },
  { url: 'https://example.com/b.jpg', alt: 'Photo B' },
  { url: 'https://example.com/c.jpg', alt: 'Photo C' },
];

test('renders an image for every photo', () => {
  render(<PhotosCarousel photos={photos} />);
  // Only the currently-visible slide is exposed in the accessibility tree
  // (react-multi-carousel marks off-screen slides aria-hidden); { hidden: true }
  // includes those so we can confirm all 3 images actually mounted in the DOM.
  expect(screen.getAllByRole('img', { hidden: true })).toHaveLength(3);
});

test('shows the slide counter when numbered', () => {
  render(<PhotosCarousel photos={photos} numbered={true} />);
  expect(screen.getByText('1/3')).toBeInTheDocument();
});

test('renders the current slide decoration', () => {
  const decorated: PhotoItem[] = [{ url: 'https://example.com/a.jpg', decoration: <span>Caption A</span> }, ...photos];
  render(<PhotosCarousel photos={decorated} selectedSlide={0} />);
  expect(screen.getByText('Caption A')).toBeInTheDocument();
});

test('resets the loading state when the photo URLs change, even if the count stays the same', () => {
  const { rerender } = render(<PhotosCarousel photos={photos} />);
  // Simulate every image finishing its load so no spinners remain.
  screen.getAllByRole('img', { hidden: true }).forEach((img) => fireEvent.load(img));
  expect(screen.queryAllByTestId('busy-spinner')).toHaveLength(0);

  const swappedPhotos: PhotoItem[] = [
    { url: 'https://example.com/x.jpg', alt: 'Photo X' },
    { url: 'https://example.com/y.jpg', alt: 'Photo Y' },
    { url: 'https://example.com/z.jpg', alt: 'Photo Z' },
  ];
  rerender(<PhotosCarousel photos={swappedPhotos} />);
  // Same length as before, but different URLs: loading state must reset, not stay stale.
  expect(screen.getAllByTestId('busy-spinner')).toHaveLength(3);
});

test('renders built-in arrows only when showArrows is set', () => {
  const { container, rerender } = render(<PhotosCarousel photos={photos} showArrows={false} />);
  expect(container.querySelectorAll('.react-multiple-carousel__arrow')).toHaveLength(0);
  rerender(<PhotosCarousel photos={photos} showArrows={true} />);
  // react-multi-carousel omits the "previous" arrow entirely while on the first slide
  // (non-infinite mode), so exactly 2 arrows only appears once the carousel is not at
  // a boundary. Relaxed per the known jsdom/library-boundary risk noted in the brief:
  // assert arrows appear at all rather than pinning an exact count.
  expect(container.querySelectorAll('.react-multiple-carousel__arrow').length).toBeGreaterThan(0);
});

test('reflects the controlled selectedSlide prop in the numbered counter', () => {
  const { rerender } = render(<PhotosCarousel photos={photos} numbered={true} selectedSlide={0} />);
  expect(screen.getByText('1/3')).toBeInTheDocument();
  rerender(<PhotosCarousel photos={photos} numbered={true} selectedSlide={2} />);
  expect(screen.getByText('3/3')).toBeInTheDocument();
});

test('invokes onSlideChange when an uncontrolled next-arrow click advances the slide', async () => {
  const onSlideChange = jest.fn();
  const { container } = render(
    <PhotosCarousel photos={photos} showArrows={true} numbered={true} onSlideChange={onSlideChange} />
  );

  const nextArrow = container.querySelector('.react-multiple-carousel__arrow--right');
  expect(nextArrow).not.toBeNull();
  fireEvent.click(nextArrow as Element);

  // react-multi-carousel updates currentSlide synchronously but fires afterChange only
  // after its internal transitionDuration timeout (400ms default), so onSlideChange and
  // the counter text lag one tick behind the click.
  await waitFor(() => expect(screen.getByText('2/3')).toBeInTheDocument());
  expect(onSlideChange).toHaveBeenCalledWith(1);
});
