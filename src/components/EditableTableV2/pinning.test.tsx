import React, { useState } from 'react';

import { ThemeProvider, createTheme } from '@mui/material/styles';
import { act, render, screen } from '@testing-library/react';

import EditableTableV2, { EditableTableColumnV2, EditableTableInstanceV2 } from '.';
import {
  EditableTableColumnPinningV2,
  getColumnPinPositionV2,
  getColumnPinningV2,
  isMrtTable,
  setColumnPinningV2,
} from '../../index';

type Item = { name: string; count: number };
const columns: EditableTableColumnV2<Item>[] = [
  { id: 'name', header: 'Name', accessorKey: 'name' },
  { id: 'count', header: 'Count', accessorKey: 'count' },
];

test.each(['ltr', 'rtl'] as const)('keeps headers aligned with physically left-pinned cells in %s', (direction) => {
  render(
    <ThemeProvider theme={createTheme({ direction })}>
      <EditableTableV2
        clearAllFiltersLabel='Clear'
        columns={columns}
        data={[{ name: 'Oak', count: 4 }]}
        tableOptions={{ initialState: { columnPinning: { left: ['count'] } } }}
      />
    </ThemeProvider>
  );
  expect(screen.getAllByRole('columnheader').map((header) => header.textContent)).toEqual(
    direction === 'rtl' ? ['Name', 'Count'] : ['Count', 'Name']
  );
  expect(screen.getAllByRole('cell').map((cell) => cell.textContent)).toEqual(
    direction === 'rtl' ? ['Oak', '4'] : ['4', 'Oak']
  );
  expect(screen.getByRole('cell', { name: '4' })).toHaveStyle(
    direction === 'rtl' ? { insetInlineEnd: '0px' } : { insetInlineStart: '0px' }
  );
});

test.each([false, true])('round trips public pinning helpers (controlled=%s)', (controlled) => {
  let table: EditableTableInstanceV2<Item>;
  const Example = () => {
    const [pinning, setPinning] = useState<EditableTableColumnPinningV2>({ left: ['name'], right: [] });
    return (
      <EditableTableV2
        columns={columns}
        data={[]}
        clearAllFiltersLabel='Clear'
        tableOptions={
          controlled
            ? { state: { columnPinning: pinning }, onColumnPinningChange: setPinning }
            : { initialState: { columnPinning: pinning } }
        }
        renderToolbarInternalActions={({ table: instance }) => {
          if (!isMrtTable(instance)) {
            table = instance;
          }
          return null;
        }}
      />
    );
  };
  render(<Example />);
  expect(getColumnPinningV2(table!)).toEqual({ left: ['name'], right: [] });
  expect(getColumnPinPositionV2(table!.getColumn('name')!)).toBe('left');
  expect(getColumnPinPositionV2(table!.getColumn('count')!)).toBe(false);

  act(() => setColumnPinningV2(table!, (previous) => ({ left: previous.right, right: previous.left })));
  expect(getColumnPinningV2(table!)).toEqual({ left: [], right: ['name'] });
  expect(table!.store.get().columnPinning).toEqual({ start: [], end: ['name'] });
  expect(getColumnPinPositionV2(table!.getColumn('name')!)).toBe('right');

  act(() => setColumnPinningV2(table!, { left: ['count'] }));
  expect(getColumnPinningV2(table!)).toEqual({ left: ['count'], right: [] });
  act(() => setColumnPinningV2(table!, {}));
  expect(getColumnPinningV2(table!)).toEqual({ left: [], right: [] });
  expect(getColumnPinPositionV2(table!.getColumn('count')!)).toBe(false);
});
