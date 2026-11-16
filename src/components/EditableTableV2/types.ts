import { ReactNode } from 'react';

import {
  Cell,
  ColumnDef,
  Table,
  TableOptions,
  Updater,
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
  metaHelper,
  rowPaginationFeature,
  rowSortingFeature,
  sortFns,
  tableFeatures,
} from '@tanstack/react-table';

import type { ColumnEditConfig, EditableTableColumn } from '../EditableTable';
import type { EditableTableCellContext, EditableTableEditContext } from '../EditableTable/contexts';
import type { EditableTableInstance } from '../EditableTable/tableSettings';

type FilterVariant = 'text' | 'select' | 'multi-select' | 'range' | 'date-range';
type ColumnFilterMeta = { filterVariant?: FilterVariant; filterSelectOptions?: string[] };

export const editableTableFeatures = tableFeatures({
  columnMeta: metaHelper<ColumnFilterMeta>(),
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
export type EditableTableColumnPinningV2 = { left?: string[]; right?: string[] };

export type EditableTableOptionsV2<TData extends object> = Partial<
  Omit<
    TableOptions<Features, TData>,
    'features' | 'columns' | 'data' | 'initialState' | 'state' | 'onColumnPinningChange'
  >
> & {
  initialState?: Omit<NonNullable<TableOptions<Features, TData>['initialState']>, 'columnPinning'> & {
    columnPinning?: EditableTableColumnPinningV2;
  };
  state?: Omit<NonNullable<TableOptions<Features, TData>['state']>, 'columnPinning'> & {
    columnPinning?: EditableTableColumnPinningV2;
  };
  onColumnPinningChange?: (updater: Updater<EditableTableColumnPinningV2>) => void;
};
export type EditableTableCellContextV2<TData extends object> = EditableTableCellContext<TData> & {
  table?: EditableTableInstance<TData>;
};

export type EditableTableEditContextV2<TData extends object> = EditableTableEditContext<TData> &
  EditableTableCellContextV2<TData>;

type Renderer<TContext, TResult = ReactNode> = { render(context: TContext): TResult }['render'];

export type EditableTableColumnV2<TData extends object> = Omit<
  EditableTableColumn<TData>,
  'Cell' | 'enableEditing' | 'editConfig'
> & {
  enableSorting?: boolean;
  enableEditing?: boolean | Renderer<{ original: TData; id: string }, boolean>;
  Cell?: Renderer<EditableTableCellContextV2<TData>>;
  sortFn?: ColumnDef<Features, TData>['sortFn'];
  editConfig?: Omit<ColumnEditConfig<TData>, 'customEditComponent'> & {
    customEditComponent?: Renderer<EditableTableEditContextV2<TData>>;
  };
};
