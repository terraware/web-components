import React, { useState } from 'react';

import { act, fireEvent, render, screen, within } from '@testing-library/react';

import EditableTableV2, { EditableTableColumnPinningV2, EditableTableColumnV2, EditableTableInstanceV2 } from '.';

type Item = { id: string; name: string; count: number };
const data: Item[] = [
  { id: 'a', name: 'Zebra', count: 3 },
  { id: 'b', name: 'Acacia', count: 1 },
];
const columns: EditableTableColumnV2<Item>[] = [
  { id: 'name', header: 'Name', accessorKey: 'name' },
  { id: 'count', header: 'Count', accessorKey: 'count' },
];
const rowNames = () =>
  screen
    .getAllByRole('row')
    .slice(1)
    .map((row) => within(row).getAllByRole('cell')[0].textContent);

test('paginates with first, last, next and previous controls', () => {
  render(
    <EditableTableV2
      columns={columns}
      data={data}
      clearAllFiltersLabel='Clear'
      tableOptions={{
        initialState: { pagination: { pageSize: 1, pageIndex: 0 } },
      }}
    />
  );
  expect(rowNames()).toEqual(['Zebra']);
  expect(screen.getByLabelText('First page')).toBeDisabled();
  expect(screen.getByLabelText('Last page')).toBeEnabled();
  fireEvent.click(screen.getByLabelText('Last page'));
  expect(rowNames()).toEqual(['Acacia']);
  expect(screen.getByLabelText('Last page')).toBeDisabled();
  expect(screen.getByLabelText('First page')).toBeEnabled();
  fireEvent.click(screen.getByLabelText('First page'));
  expect(rowNames()).toEqual(['Zebra']);
  fireEvent.click(screen.getByLabelText('Next page'));
  expect(rowNames()).toEqual(['Acacia']);
});

test('shows unsorted indicators and cycles numeric sorting ascending first', () => {
  render(<EditableTableV2 columns={columns} data={data} clearAllFiltersLabel='Clear' />);
  expect(screen.getAllByTestId('SyncAltIcon')).toHaveLength(2);
  const header = screen.getByRole('columnheader', { name: /Count/ });
  expect(header).not.toHaveAttribute('aria-sort');
  fireEvent.click(screen.getByText('Count'));
  expect(header).toHaveAttribute('aria-sort', 'ascending');
  expect(rowNames()).toEqual(['Acacia', 'Zebra']);
  expect(screen.getAllByTestId('SyncAltIcon')).toHaveLength(1);
  fireEvent.click(screen.getByText('Count'));
  expect(header).toHaveAttribute('aria-sort', 'descending');
  expect(rowNames()).toEqual(['Zebra', 'Acacia']);
  fireEvent.click(screen.getByText('Count'));
  expect(header).not.toHaveAttribute('aria-sort');
});

test.each([{ left: ['name'], right: ['count'] }, { left: ['name'] }, { right: ['count'] }, {}])(
  'translates uncontrolled initial pinning %j',
  (columnPinning) => {
    let table: EditableTableInstanceV2<Item>;
    render(
      <EditableTableV2
        columns={columns}
        data={[]}
        clearAllFiltersLabel='Clear'
        renderToolbarInternalActions={({ table: instance }) => {
          table = instance;
          return null;
        }}
        tableOptions={{ initialState: { columnPinning } }}
      />
    );
    expect(table!.getColumn('name')!.getIsPinned()).toBe('left' in columnPinning ? 'start' : false);
    expect(table!.getColumn('count')!.getIsPinned()).toBe('right' in columnPinning ? 'end' : false);
    act(() => table!.getColumn('name')!.pin('end'));
    expect(table!.getColumn('name')!.getIsPinned()).toBe('end');
  }
);

test('round trips controlled left/right pinning through raw TanStack updaters', () => {
  const initialPinning = { left: ['name'], right: [] };
  const onChange = rs.fn();
  let table: EditableTableInstanceV2<Item>;
  const Controlled = () => {
    const [columnPinning, setColumnPinning] = useState<EditableTableColumnPinningV2>(initialPinning);
    return (
      <EditableTableV2
        columns={columns}
        data={data}
        clearAllFiltersLabel='Clear'
        renderToolbarInternalActions={({ table: instance }) => {
          table = instance;
          return <output aria-label='Pinning state'>{JSON.stringify(columnPinning)}</output>;
        }}
        tableOptions={{
          state: { columnPinning },
          onColumnPinningChange: (updater) => {
            onChange(updater);
            setColumnPinning(updater);
          },
        }}
      />
    );
  };
  render(<Controlled />);
  act(() => table!.getColumn('count')!.pin('end'));
  expect(onChange.mock.calls[0][0](initialPinning)).toEqual({ left: ['name'], right: ['count'] });
  expect(screen.getByRole('status', { name: 'Pinning state' })).toHaveTextContent(
    '{"left":["name"],"right":["count"]}'
  );
  expect(table!.getColumn('name')!.getIsPinned()).toBe('start');
  expect(table!.getColumn('count')!.getIsPinned()).toBe('end');
  act(() => table!.setColumnPinning({ start: [], end: ['name'] }));
  expect(screen.getByLabelText('Pinning state')).toHaveTextContent('{"left":[],"right":["name"]}');
  act(() => table!.setColumnPinning((previous) => ({ start: previous.end, end: [] })));
  expect(screen.getByRole('status', { name: 'Pinning state' })).toHaveTextContent('{"left":["name"],"right":[]}');
});

test('automatically selects alphanumeric sorting with fewer than ten rows', () => {
  render(
    <EditableTableV2
      columns={[{ id: 'name', header: 'Name', accessorKey: 'name' }]}
      data={['15372', '1467', '20', '113', '13770'].map((name) => ({ name }))}
      clearAllFiltersLabel='Clear'
    />
  );
  fireEvent.click(screen.getByText('Name'));
  expect(rowNames()).toEqual(['20', '113', '1467', '13770', '15372']);
});
