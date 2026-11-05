import React from 'react';

import { act, fireEvent, render, screen } from '@testing-library/react';

import MultiSelect from '.';

let resizeObserverCallbacks: (() => void)[] = [];

class ResizeObserverMock {
  constructor(callback: () => void) {
    resizeObserverCallbacks.push(callback);
  }
  disconnect = rstest.fn();
  observe = rstest.fn();
  unobserve = rstest.fn();
}

beforeAll(() => {
  global.ResizeObserver = ResizeObserverMock as unknown as typeof ResizeObserver;
});

afterEach(() => {
  resizeObserverCallbacks = [];
  rstest.restoreAllMocks();
});

const mockLayout = (rects: { trigger: Partial<DOMRect>; optionsContainer: Partial<DOMRect> }) => {
  rstest.spyOn(HTMLElement.prototype, 'getBoundingClientRect').mockImplementation(function (this: HTMLElement) {
    const rect = this.classList.contains('multi-select__options-container')
      ? rects.optionsContainer
      : this.classList.contains('multi-select__container')
        ? rects.trigger
        : {};

    return { top: 0, left: 0, width: 0, height: 0, ...rect } as DOMRect;
  });
};

const renderFixedMenu = () =>
  render(
    <MultiSelect
      fixedMenu
      onAdd={() => undefined}
      onRemove={() => undefined}
      options={new Map([[1, 'foo']])}
      valueRenderer={(v: string) => v}
      selectedOptions={[]}
      placeHolder='Select...'
    />
  );

test('show options when placeholder is clicked', () => {
  render(
    <MultiSelect
      onAdd={() => undefined}
      onRemove={() => undefined}
      options={
        new Map([
          [1, 'foo'],
          [2, 'bar'],
          [3, 'baz'],
        ])
      }
      valueRenderer={(v: string) => v}
      selectedOptions={[]}
      placeHolder='Select...'
    />
  );

  // we should find the placeholder text
  const placeHolder = screen.getByText('Select...');
  expect(placeHolder).toBeInTheDocument();

  // we should not find the options yet
  expect(screen.queryByText('foo')).not.toBeInTheDocument();
  expect(screen.queryByText('bar')).not.toBeInTheDocument();
  expect(screen.queryByText('baz')).not.toBeInTheDocument();

  // click the placeholder
  fireEvent.click(placeHolder);

  // now the options should be visible
  expect(screen.queryByText('foo')).toBeInTheDocument();
  expect(screen.queryByText('bar')).toBeInTheDocument();
  expect(screen.queryByText('baz')).toBeInTheDocument();
});

test('clicking an option calls the onAdd handler', () => {
  const handleAdd = rstest.fn();
  render(
    <MultiSelect
      onAdd={handleAdd}
      onRemove={() => undefined}
      options={
        new Map([
          [1, 'foo'],
          [2, 'bar'],
          [3, 'baz'],
        ])
      }
      valueRenderer={(v: string) => v}
      selectedOptions={[]}
      placeHolder='Select...'
    />
  );

  // click the dropdown chevron
  const dropdown = screen.getByLabelText('show-options');
  fireEvent.click(dropdown);

  // click one of the options
  const option = screen.getByText('bar');
  fireEvent.click(option);

  // addHandler should have been called with id 2
  expect(handleAdd).toBeCalledWith(2);
});

test('clicking the pill remove button calls the onRemove handler', () => {
  const handleRemove = rstest.fn();
  render(
    <MultiSelect
      onAdd={() => undefined}
      onRemove={handleRemove}
      options={new Map([[1, 'foo']])}
      valueRenderer={(v: string) => v}
      selectedOptions={[1]}
    />
  );

  // find a pill with the 'foo' text
  expect(screen.queryByText('foo')).toBeInTheDocument();

  // click the remove button
  const removeButton = screen.getByLabelText('remove');
  fireEvent.click(removeButton);

  // handleRemove should have been called with id 1
  expect(handleRemove).toBeCalledWith(1);
});

test('options list is positioned relative to the viewport when fixedMenu is set', () => {
  mockLayout({ trigger: { top: 100 }, optionsContainer: { top: 140, left: 20, width: 302 } });
  renderFixedMenu();

  fireEvent.click(screen.getByText('Select...'));

  expect(screen.getByRole('list')).toHaveStyle({ position: 'fixed', top: '140px', left: '20px', width: '300px' });
});

test('fixed options list follows the field when the field changes size', () => {
  const layout = { trigger: { top: 100 }, optionsContainer: { top: 140, width: 302 } };
  mockLayout(layout);
  renderFixedMenu();
  fireEvent.click(screen.getByText('Select...'));

  layout.optionsContainer.top = 180;
  act(() => resizeObserverCallbacks.forEach((callback) => callback()));

  expect(screen.getByRole('list')).toHaveStyle({ top: '180px' });
});

test('fixed options list opens above the field when there is no room below', () => {
  mockLayout({
    trigger: { top: window.innerHeight - 80 },
    optionsContainer: { top: window.innerHeight - 40, width: 302 },
  });
  renderFixedMenu();

  fireEvent.click(screen.getByText('Select...'));

  expect(screen.getByRole('list')).toHaveStyle({ top: 'auto', bottom: '80px', maxHeight: '140px' });
});

test('fixed options list height leaves room for its padding, border, and margin at the viewport edge', () => {
  rstest.spyOn(window, 'innerHeight', 'get').mockReturnValue(200);
  mockLayout({ trigger: { top: 50 }, optionsContainer: { top: 90, width: 302 } });
  const getComputedStyle = window.getComputedStyle;
  const getComputedStyleSpy = rstest
    .spyOn(window, 'getComputedStyle')
    .mockImplementation((element) =>
      element.tagName === 'UL'
        ? ({ paddingTop: '8px', paddingBottom: '8px', marginTop: '4px', marginBottom: '0px' } as CSSStyleDeclaration)
        : getComputedStyle(element)
    );
  rstest.spyOn(HTMLElement.prototype, 'offsetHeight', 'get').mockReturnValue(160);
  rstest.spyOn(HTMLElement.prototype, 'clientHeight', 'get').mockReturnValue(158);
  renderFixedMenu();

  fireEvent.click(screen.getByText('Select...'));
  getComputedStyleSpy.mockRestore();

  expect(screen.getByRole('list')).toHaveStyle({ top: '90px', maxHeight: '80px' });
});
