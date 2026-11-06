import { ReactNode } from 'react';

import {
  Cell,
  CellContext,
  ColumnDef,
  Table,
  TableOptions,
  columnFilteringFeature,
  columnOrderingFeature,
  columnPinningFeature,
  columnSizingFeature,
  columnVisibilityFeature,
  createFilteredRowModel,
  createPaginatedRowModel,
  createSortedRowModel,
  filterFns,
  globalFilteringFeature,
  rowPaginationFeature,
  rowSortingFeature,
  sortFns,
  tableFeatures,
} from '@tanstack/react-table';

export const editableTableFeatures = tableFeatures({
  columnFilteringFeature,
  columnOrderingFeature,
  columnPinningFeature,
  columnSizingFeature,
  columnVisibilityFeature,
  globalFilteringFeature,
  rowPaginationFeature,
  rowSortingFeature,
  filteredRowModel: createFilteredRowModel(),
  sortedRowModel: createSortedRowModel(),
  paginatedRowModel: createPaginatedRowModel(),
  filterFns,
  sortFns,
});

type Features = typeof editableTableFeatures;
export type EditableTableCellV2<TData extends object> = Cell<Features, TData>;
export type EditableTableInstanceV2<TData extends object> = Table<Features, TData>;
export type EditableTableOptionsV2<TData extends object> = Partial<
  Omit<TableOptions<Features, TData>, 'features' | 'columns' | 'data'>
>;
export type EditableTableCellContextV2<TData extends object> = CellContext<Features, TData>;

export type EditableTableColumnV2<TData extends object> = {
  id: string;
  header: string;
  accessorKey?: keyof TData;
  accessorFn?: (row: TData) => unknown;
  size?: number;
  Cell?: (context: EditableTableCellContextV2<TData>) => ReactNode;
  sortFn?: ColumnDef<Features, TData>['sortFn'];
};
