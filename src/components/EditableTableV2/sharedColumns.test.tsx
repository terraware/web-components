import React from 'react';

import { fireEvent, render, screen } from '@testing-library/react';

import EditableTableV2, { EditableTableColumnV2, EditableTablePropsV2 } from '.';
import type { EditableTableColumn, EditableTableProps } from '../EditableTable';
import type { EditableTableCellContext, EditableTableEditContext } from '../EditableTable/contexts';
import { EditableTableToolbarContext, applyTableSettings, getTableSettings } from '../EditableTable/tableSettings';

type Item = { name: string; count: number; tags: string[] };
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
  render(<EditableTableV2 {...props} />);
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
