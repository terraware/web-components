import { useTable } from '@tanstack/react-table';
import { act, renderHook } from '@testing-library/react';

import {
  applyTableSettings,
  getInitialTableSettings,
  getTableColumns,
  getTableSettings,
  getVisibleTableColumns,
} from '../EditableTable/tableSettings';
import { editableTableFeatures } from './types';

test('round trips saved views on V2 with public pinning, definition order, and partial application', () => {
  const { result } = renderHook(() =>
    useTable({
      features: editableTableFeatures,
      columns: ['a', 'b', 'c'].map((id) => ({ id, header: id, accessorFn: () => id })),
      data: [],
      initialState: { columnPinning: { start: ['a'], end: ['c'] }, sorting: [{ id: 'a', desc: true }] },
    })
  );
  const table = result.current;
  expect(getInitialTableSettings(table).columnPinning).toEqual({ left: ['a'], right: ['c'] });
  act(() =>
    applyTableSettings(table, {
      columnOrder: ['c', 'b', 'a', 'mrt-row-actions'],
      columnPinning: { left: ['b'], right: ['a'] },
      columnVisibility: { c: false },
      globalFilter: 'value',
    })
  );
  expect(getTableSettings(table)).toMatchObject({
    columnOrder: ['c', 'b', 'a'],
    columnPinning: { left: ['b'], right: ['a'] },
    sorting: [{ id: 'a', desc: true }],
    globalFilter: 'value',
  });
  expect(getTableColumns(table, 'definition').map(({ id }) => id)).toEqual(['a', 'b', 'c']);
  expect(getTableColumns(table, 'display').map(({ id }) => id)).toEqual(['c', 'b', 'a']);
  expect(getVisibleTableColumns(table).map(({ id, pinned }) => [id, pinned])).toEqual([
    ['b', 'left'],
    ['a', 'right'],
  ]);
  const previous = getTableSettings(table);
  act(() => applyTableSettings(table, {}));
  expect(getTableSettings(table)).toEqual(previous);
});

test('definition columns contain only V2 leaves in definition order despite grouping and reordering', () => {
  const { result } = renderHook(() =>
    useTable({
      features: editableTableFeatures,
      columns: [
        {
          id: 'group',
          columns: [
            { id: 'a', accessorFn: () => 'a' },
            { id: 'nested', columns: [{ id: 'b', accessorFn: () => 'b' }] },
          ],
        },
        { id: 'c', accessorFn: () => 'c' },
      ],
      data: [],
      initialState: { columnOrder: ['c', 'b', 'a'], columnVisibility: { b: false } },
    })
  );

  expect(getTableColumns(result.current, 'definition').map(({ id }) => id)).toEqual(['a', 'b', 'c']);
  expect(getTableColumns(result.current, 'display').map(({ id }) => id)).toEqual(['c', 'b', 'a']);
});
