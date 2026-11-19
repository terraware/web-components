import React from 'react';

import { ThemeProvider, createTheme } from '@mui/material/styles';
import { fireEvent, render, screen } from '@testing-library/react';

import EditableTableV2 from '.';

test('keeps persisted left and right pin groups on their physical sides in RTL', () => {
  render(
    <ThemeProvider theme={createTheme({ direction: 'rtl' })}>
      <EditableTableV2
        clearAllFiltersLabel='Clear'
        columns={['a', 'b', 'c', 'd'].map((id) => ({ id, header: id, accessorKey: id as 'a', size: 100 }))}
        data={[{ a: 'A', b: 'B', c: 'C', d: 'D' }]}
        tableOptions={{ initialState: { columnPinning: { left: ['a', 'b'], right: ['d'] } } }}
      />
    </ThemeProvider>
  );
  expect(screen.getAllByRole('columnheader').map((header) => header.textContent)).toEqual(['d', 'c', 'b', 'a']);
  expect(screen.getAllByRole('cell').map((cell) => cell.textContent)).toEqual(['D', 'C', 'B', 'A']);
  expect(screen.getByRole('cell', { name: 'A' })).toHaveStyle({ position: 'sticky', insetInlineEnd: '0px' });
  expect(screen.getByRole('cell', { name: 'B' })).toHaveStyle({ position: 'sticky', insetInlineEnd: '100px' });
  expect(screen.getByRole('cell', { name: 'D' })).toHaveStyle({ position: 'sticky', insetInlineStart: '0px' });
});

test('disables the column-manager pin selector when the column cannot pin', () => {
  render(
    <EditableTableV2
      clearAllFiltersLabel='Clear'
      columns={[{ id: 'name', header: 'Name', accessorKey: 'name' }]}
      data={[] as { name: string }[]}
      showColumnsButton
      enableColumnPinning
      tableOptions={{ defaultColumn: { enablePinning: false } }}
    />
  );
  fireEvent.click(screen.getByRole('button', { name: 'Columns' }));
  const selector = screen.getByRole('combobox', { name: 'Pin column' });
  expect(selector).toHaveAttribute('aria-disabled', 'true');
  fireEvent.mouseDown(selector);
  expect(screen.queryByRole('option', { name: 'Pin left' })).not.toBeInTheDocument();
});
