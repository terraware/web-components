import { fireEvent, render, screen } from '@testing-library/react';
import React from 'react';
import MultiSelect from '.';

test('show options when placeholder is clicked', () => {
  render(
    <MultiSelect
      onAdd={() => undefined}
      onRemove={() => undefined}
      options={new Map([
        [1, 'foo'],
        [2, 'bar'],
        [3, 'baz'],
      ])}
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
  const handleAdd = jest.fn();
  render(
    <MultiSelect
      onAdd={handleAdd}
      onRemove={() => undefined}
      options={new Map([
        [1, 'foo'],
        [2, 'bar'],
        [3, 'baz'],
      ])}
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
  const handleRemove = jest.fn();
  render(
    <MultiSelect
      onAdd={() => undefined}
      onRemove={handleRemove}
      options={new Map([
        [1, 'foo'],
      ])}
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
