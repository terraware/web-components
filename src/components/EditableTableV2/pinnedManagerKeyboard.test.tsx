import React, { useState } from 'react';

import { render, screen, waitFor, within } from '@testing-library/react';
import userEvent from '@testing-library/user-event';

import EditableTableV2 from '.';

test('does not rewrite global column order when reordering a differently ordered pin group', async () => {
  const onOrderChange = rs.fn();
  const user = userEvent.setup();
  render(
    <EditableTableV2
      clearAllFiltersLabel='Clear'
      showColumnsButton
      enableColumnOrdering
      enableColumnPinning
      columns={[
        { id: 'a', header: 'A', accessorKey: 'a' },
        { id: 'b', header: 'B', accessorKey: 'b' },
        { id: 'c', header: 'C', accessorKey: 'c' },
      ]}
      data={[{ a: 'Alpha', b: 'Beta', c: 'Gamma' }]}
      tableOptions={{
        initialState: { columnOrder: ['a', 'b', 'c'], columnPinning: { left: ['b', 'a'], right: [] } },
        onColumnOrderChange: onOrderChange,
      }}
    />
  );
  await user.click(screen.getByRole('button', { name: 'Columns' }));
  const menu = screen.getByRole('menu');
  within(menu)
    .getAllByRole('menuitem')
    .forEach((item) => {
      item.scrollIntoView = rs.fn();
      item.getBoundingClientRect = () => {
        const y = within(menu).getAllByRole('menuitem').indexOf(item) * 50;
        return { x: 0, y, left: 0, right: 500, top: y, bottom: y + 50, width: 500, height: 50, toJSON: () => ({}) };
      };
    });
  within(menu).getByLabelText('Drag column: B').focus();
  await user.keyboard('[Space][ArrowDown][Space]');
  await waitFor(() =>
    expect(screen.getAllByRole('columnheader', { hidden: true }).map((header) => header.textContent)).toEqual([
      'A',
      'B',
      'C',
    ])
  );
  expect(onOrderChange).not.toHaveBeenCalled();
});

test('keyboard-reorders unpinned manager items in their rendered order', async () => {
  const onOrderChange = rs.fn();
  const Harness = () => {
    const [columnOrder, setColumnOrder] = useState<string[]>([]);

    return (
      <EditableTableV2
        clearAllFiltersLabel='Clear'
        showColumnsButton
        enableColumnOrdering
        enableColumnPinning
        columns={[
          { id: 'a', header: 'A', accessorKey: 'a' },
          { id: 'b', header: 'B', accessorKey: 'b' },
          { id: 'c', header: 'C', accessorKey: 'c' },
        ]}
        data={[{ a: 'Alpha', b: 'Beta', c: 'Gamma' }]}
        tableOptions={{
          state: { columnOrder },
          initialState: { columnPinning: { left: ['b'], right: [] } },
          onColumnOrderChange: (order) => {
            const next = typeof order === 'function' ? order(columnOrder) : order;
            onOrderChange(next);
            setColumnOrder(next);
          },
        }}
      />
    );
  };
  const user = userEvent.setup();
  render(<Harness />);
  await user.click(screen.getByRole('button', { name: 'Columns' }));
  const menu = screen.getByRole('menu');
  const handles = () =>
    within(menu)
      .getAllByLabelText(/^Drag column:/)
      .map((handle) => handle.getAttribute('aria-label'));
  expect(handles()).toEqual(['Drag column: B', 'Drag column: A', 'Drag column: C']);
  within(menu)
    .getAllByRole('menuitem')
    .forEach((item) => {
      item.scrollIntoView = rs.fn();
      item.getBoundingClientRect = () => {
        const y = within(menu).getAllByRole('menuitem').indexOf(item) * 50;

        return { x: 0, y, left: 0, right: 500, top: y, bottom: y + 50, width: 500, height: 50, toJSON: () => ({}) };
      };
    });
  within(menu).getByLabelText('Drag column: A').focus();
  await user.keyboard('[Space][ArrowDown][Space]');
  await waitFor(() => expect(onOrderChange).toHaveBeenCalledWith(['b', 'c', 'a']));
  expect(handles()).toEqual(['Drag column: B', 'Drag column: C', 'Drag column: A']);
  await waitFor(() => expect(within(menu).getByLabelText('Drag column: A')).toHaveFocus());
  await user.keyboard('[Escape]');
  await waitFor(() => expect(screen.queryByRole('menu')).not.toBeInTheDocument());
  expect(screen.getAllByRole('columnheader').map((header) => header.textContent)).toEqual(['B', 'C', 'A']);
});
