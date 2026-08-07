import React from 'react';

import { act, render, screen } from '@testing-library/react';

import { TruncateConfig } from './Textfield';
import TruncatedTextArea from './TruncatedTextArea';

const MAX_HEIGHT = 100;

const truncateConfig: TruncateConfig = {
  maxHeight: MAX_HEIGHT,
  showMoreText: 'Show more',
  showLessText: 'Show less',
};

// jsdom has no layout engine and no ResizeObserver, so both have to be faked: heights are derived
// from the amount of text in the node, and the observer callbacks are fired by hand.
let resizeCallbacks: (() => void)[] = [];
const originalGetBoundingClientRect = Element.prototype.getBoundingClientRect;

const notifyResize = () => act(() => resizeCallbacks.forEach((callback) => callback()));

beforeEach(() => {
  resizeCallbacks = [];

  (global as any).ResizeObserver = class {
    constructor(callback: () => void) {
      resizeCallbacks.push(callback);
    }
    observe() {}
    unobserve() {}
    disconnect() {}
  };

  Element.prototype.getBoundingClientRect = function (this: Element) {
    return { height: this.textContent?.length ?? 0 } as DOMRect;
  };
});

afterEach(() => {
  Element.prototype.getBoundingClientRect = originalGetBoundingClientRect;
  delete (global as any).ResizeObserver;
});

const longText = 'x'.repeat(MAX_HEIGHT + 1);
const shortText = 'x';

test('offers the show more control when the content is taller than maxHeight', () => {
  render(<TruncatedTextArea truncateConfig={truncateConfig}>{longText}</TruncatedTextArea>);

  expect(screen.getByText('Show more')).toBeInTheDocument();
});

test('does not offer the show more control when the content fits', () => {
  render(<TruncatedTextArea truncateConfig={truncateConfig}>{shortText}</TruncatedTextArea>);

  expect(screen.queryByText('Show more')).not.toBeInTheDocument();
});

test('re-measures when long content is replaced by short content', () => {
  const { rerender } = render(<TruncatedTextArea truncateConfig={truncateConfig}>{longText}</TruncatedTextArea>);
  expect(screen.getByText('Show more')).toBeInTheDocument();

  rerender(<TruncatedTextArea truncateConfig={truncateConfig}>{shortText}</TruncatedTextArea>);
  notifyResize();

  expect(screen.queryByText('Show more')).not.toBeInTheDocument();
});

test('re-measures when short content is replaced by long content', () => {
  const { rerender } = render(<TruncatedTextArea truncateConfig={truncateConfig}>{shortText}</TruncatedTextArea>);
  expect(screen.queryByText('Show more')).not.toBeInTheDocument();

  rerender(<TruncatedTextArea truncateConfig={truncateConfig}>{longText}</TruncatedTextArea>);
  notifyResize();

  expect(screen.getByText('Show more')).toBeInTheDocument();
});

test('measures content that only becomes non-empty after the first render', () => {
  // The markdown branch parses in an effect, so the first measurement can run against an empty node
  const { rerender } = render(<TruncatedTextArea truncateConfig={truncateConfig}>{''}</TruncatedTextArea>);
  expect(screen.queryByText('Show more')).not.toBeInTheDocument();

  rerender(<TruncatedTextArea truncateConfig={truncateConfig}>{longText}</TruncatedTextArea>);
  notifyResize();

  expect(screen.getByText('Show more')).toBeInTheDocument();
});

test('stays expanded when the toggle loses focus', () => {
  render(<TruncatedTextArea truncateConfig={truncateConfig}>{longText}</TruncatedTextArea>);

  act(() => screen.getByText('Show more').click());
  expect(screen.getByText('Show less')).toBeInTheDocument();

  act(() => screen.getByText('Show less').closest('button')!.blur());
  expect(screen.getByText('Show less')).toBeInTheDocument();
});

test('collapses on blur when collapseOnBlur is set', () => {
  render(
    <TruncatedTextArea truncateConfig={{ ...truncateConfig, collapseOnBlur: true }}>{longText}</TruncatedTextArea>
  );

  const button = screen.getByText('Show more').closest('button')!;
  act(() => button.focus());
  act(() => screen.getByText('Show more').click());
  expect(screen.getByText('Show less')).toBeInTheDocument();

  act(() => screen.getByText('Show less').closest('button')!.blur());
  expect(screen.getByText('Show more')).toBeInTheDocument();
});
