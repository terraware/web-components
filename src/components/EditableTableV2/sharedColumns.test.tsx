import React from 'react';

import { fireEvent, render, screen } from '@testing-library/react';

import EditableTableV2, { EditableTableColumnV2, EditableTablePropsV2 } from '.';
import type { EditableTableColumn, EditableTableProps } from '../EditableTable';
import type { EditableTableCellContext, EditableTableEditContext } from '../EditableTable/contexts';
import { EditableTableToolbarContext, applyTableSettings, getTableSettings } from '../EditableTable/tableSettings';

type Item = { name: string; count: number; tags: string[] };

type CallbackOnly<T> = T extends (args: infer Args) => infer Result ? (args: Args) => Result : never;

test('rejects callbacks that require MRT-only instance APIs', () => {
  const toolbar: NonNullable<EditableTableProps<Item>['renderTopToolbarCustomActions']> = ({ table }) =>
    table.getState().pagination.pageIndex;
  const head: CallbackOnly<EditableTableProps<Item>['muiTableHeadCellProps']> = ({ table }) => ({
    id: String(table.getState().pagination.pageIndex),
  });
  const body: CallbackOnly<EditableTableProps<Item>['muiTableBodyCellProps']> = ({ table }) => ({
    id: String(table.getState().pagination.pageIndex),
  });
  // @ts-expect-error MRT-only toolbar callbacks cannot accept a V2 instance.
  const unsafeToolbar: EditableTablePropsV2<Item>['renderTopToolbarCustomActions'] = toolbar;
  // @ts-expect-error MRT-only header callbacks cannot accept a V2 instance.
  const unsafeHead: EditableTablePropsV2<Item>['muiTableHeadCellProps'] = head;
  // @ts-expect-error MRT-only body callbacks cannot accept a V2 instance.
  const unsafeBody: EditableTablePropsV2<Item>['muiTableBodyCellProps'] = body;
  expect([unsafeToolbar, unsafeHead, unsafeBody]).toEqual([toolbar, head, body]);
});
const data: Item[] = [
  { name: 'Zebra', count: 1, tags: ['a'] },
  { name: 'Acacia', count: 2, tags: ['b'] },
  { name: 'Oak', count: 3, tags: ['a', 'b'] },
];
const columns: EditableTableColumn<Item>[] = [
  {
    id: 'name',
    header: 'Name',
    accessorKey: 'name',
    filterVariant: 'text',
    filterFn: 'fuzzy',
    sortingFn: 'text',
    Cell: ({ cell }: EditableTableCellContext<Item>) => String(cell.getValue()),
    editConfig: {
      editVariant: 'custom',
      customEditComponent: ({ save }: EditableTableEditContext<Item>) => (
        <button onClick={() => void save('Oak')}>Save</button>
      ),
    },
  },
  { id: 'count', header: 'Count', accessorKey: 'count', filterVariant: 'range', filterFn: 'between' },
  {
    id: 'tags',
    header: 'Tags',
    accessorKey: 'tags',
    filterVariant: 'multi-select',
    filterSelectOptions: ['a', 'b'],
    filterFn: 'arrIncludesSome',
  },
];
const v2Columns: EditableTableColumnV2<Item>[] = columns;

test('defaults text filters to fuzzy matching and preserves column hiding restrictions', () => {
  render(
    <EditableTableV2
      columns={[{ ...columns[0], filterFn: undefined, enableHiding: false }]}
      data={data}
      clearAllFiltersLabel='Clear'
      renderToolbarInternalActions={({ table }) => (
        <span>{table.getColumn('name')?.getCanHide() ? 'Can hide' : 'Cannot hide'}</span>
      )}
      tableOptions={{ initialState: { columnFilters: [{ id: 'name', value: 'Zbra' }] } }}
    />
  );
  expect(screen.getByRole('cell', { name: 'Zebra' })).toBeInTheDocument();
  expect(screen.queryByRole('cell', { name: 'Acacia' })).not.toBeInTheDocument();
  expect(screen.getByText('Cannot hide')).toBeInTheDocument();
});

test.each([
  ['name', 'Zbra', 'Zebra'],
  ['count', [1, 3], 'Acacia'],
  ['tags', ['a'], 'ZebraOak'],
] as const)('uses the shared %s filter without a column adapter', (id, value, expected) => {
  const props = {
    columns: v2Columns,
    data,
    clearAllFiltersLabel: 'Clear',
    enableColumnFilters: true,
    enableColumnDragging: false,
    enableColumnActions: true,
    enableHiding: true,
    positionGlobalFilter: 'right',
    showDensityButton: false,
    showFullScreenButton: false,
    containerProps: { 'aria-label': 'Shared table' },
    muiTableHeadCellProps: ({
      column,
      table,
    }: Pick<EditableTableCellContext<Item>, 'column'> & EditableTableToolbarContext<Item>) => ({
      title: `${column.id}:${getTableSettings(table).columnOrder.length}`,
    }),
    muiTableBodyCellProps: ({
      cell,
      row,
      column,
      table,
    }: EditableTableCellContext<Item> & EditableTableToolbarContext<Item>) => ({
      title: `${row.original.name}:${column.id}:${String(cell.getValue())}:${getTableSettings(table).sorting.length}`,
    }),
    renderTopToolbarCustomActions: ({ table }: EditableTableToolbarContext<Item>) => (
      <span>Rows: {table.getRowModel().rows.length}</span>
    ),
    renderToolbarInternalActions: ({ table }: EditableTableToolbarContext<Item>) => (
      <button
        onClick={() =>
          applyTableSettings(table, { columnFilters: [{ id, value: Array.isArray(value) ? [...value] : value }] })
        }
      >
        Filter {getTableSettings(table).columnFilters.length}
      </button>
    ),
  } satisfies Omit<EditableTablePropsV2<Item>, 'tableOptions'> & Omit<EditableTableProps<Item>, 'tableOptions'>;
  const legacyProps = props satisfies Omit<EditableTableProps<Item>, 'tableOptions'>;
  const compatibleProps: EditableTablePropsV2<Item> = legacyProps;
  render(<EditableTableV2 {...compatibleProps} />);
  fireEvent.click(screen.getByRole('button', { name: 'Filter 0' }));
  expect(
    screen
      .getAllByRole('row')
      .slice(1)
      .map((row) => row.querySelector('td')?.textContent)
      .join('')
  ).toBe(expected);
});

test('uses the shared sortingFn name', () => {
  render(
    <EditableTableV2
      columns={columns}
      data={data}
      clearAllFiltersLabel='Clear'
      initialSorting={[{ id: 'name', desc: false }]}
    />
  );
  expect(
    screen
      .getAllByRole('row')
      .slice(1)
      .map((row) => row.querySelector('td')?.textContent)
  ).toEqual(['Acacia', 'Oak', 'Zebra']);
});
