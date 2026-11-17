import { act, renderHook } from '@testing-library/react';
import { useMaterialReactTable } from 'material-react-table';

import {
  applyTableSettings,
  getInitialTableSettings,
  getTableColumns,
  getTableSettings,
  getVisibleTableColumns,
  isDataColumnId,
} from './tableSettings';

const setup = () =>
  renderHook(() =>
    useMaterialReactTable({
      columns: ['a', 'b', 'c'].map((id) => ({ id, accessorKey: id, header: id })),
      data: [{ a: 'A', b: 'B', c: 'C' }],
      enableRowSelection: true,
      enableRowActions: true,
      positionActionsColumn: 'last',
      enableColumnOrdering: true,
      enableColumnPinning: true,
      enableGlobalFilterRankedResults: false,
      initialState: {
        globalFilter: 'original',
        columnFilters: [{ id: 'a', value: 'A' }],
        sorting: [{ id: 'a', desc: true }],
      },
    })
  );

test('restores partial data-column orders without losing or moving MRT display columns', () => {
  const { result } = setup();
  act(() => applyTableSettings(result.current, { columnOrder: ['mrt-row-actions', 'b', 'mrt-row-select'] }));
  expect(getTableSettings(result.current).columnOrder).toEqual(['mrt-row-select', 'b', 'a', 'c', 'mrt-row-actions']);
  const dataIds = (order: 'definition' | 'display') =>
    getTableColumns(result.current, order)
      .map(({ id }) => id)
      .filter(isDataColumnId);
  expect(dataIds('definition')).toEqual(['a', 'b', 'c']);
  expect(dataIds('display')).toEqual(['b', 'a', 'c']);

  act(() =>
    applyTableSettings(result.current, {
      columnPinning: { left: ['c'], right: ['a'] },
      columnVisibility: { b: false },
    })
  );
  const visible = getVisibleTableColumns(result.current).filter(({ id }) => isDataColumnId(id));
  expect(visible.map(({ id, pinned }) => ({ id, pinned }))).toEqual([
    { id: 'c', pinned: 'left' },
    { id: 'a', pinned: 'right' },
  ]);

  act(() => applyTableSettings(result.current, { columnOrder: [] }));
  expect(getTableSettings(result.current).columnOrder).toEqual(['mrt-row-select', 'a', 'b', 'c', 'mrt-row-actions']);
});

test('partial apply preserves omitted settings and accepts explicit empty values', () => {
  const { result } = setup();
  const initial = getInitialTableSettings(result.current);
  const before = getTableSettings(result.current);
  act(() => applyTableSettings(result.current, { globalFilter: '' }));
  expect(getTableSettings(result.current)).toEqual({ ...before, globalFilter: '' });
  expect(getInitialTableSettings(result.current)).toEqual(initial);
  act(() => applyTableSettings(result.current, {}));
  expect(getTableSettings(result.current)).toEqual({ ...before, globalFilter: '' });
  act(() =>
    applyTableSettings(result.current, {
      columnFilters: [],
      sorting: [],
      columnPinning: {},
      columnVisibility: {},
    })
  );
  expect(getTableSettings(result.current)).toEqual({
    ...before,
    globalFilter: '',
    columnFilters: [],
    sorting: [],
    columnPinning: {},
    columnVisibility: {},
  });
});

test('definition columns contain only leaves in definition order despite grouping and reordering', () => {
  const { result } = renderHook(() =>
    useMaterialReactTable({
      columns: [
        {
          id: 'group',
          header: 'Group',
          columns: [
            { id: 'a', accessorKey: 'a', header: 'A' },
            { id: 'nested', header: 'Nested', columns: [{ id: 'b', accessorKey: 'b', header: 'B' }] },
          ],
        },
        { id: 'c', accessorKey: 'c', header: 'C' },
      ],
      data: [{ a: 'A', b: 'B', c: 'C' }],
      enableColumnOrdering: true,
      initialState: { columnOrder: ['c', 'b', 'a'], columnVisibility: { a: false } },
    })
  );
  expect(getTableColumns(result.current, 'definition').map(({ id }) => id)).toEqual(['a', 'b', 'c']);
  expect(getTableColumns(result.current, 'display').map(({ id }) => id)).toEqual(['c', 'b', 'a']);
});
