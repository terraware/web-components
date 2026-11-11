import { ReactNode } from 'react';

import {
  Cell,
  CellContext,
  ColumnDef,
  Row,
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
export type EditableTableCellContextV2<TData extends object> = CellContext<Features, TData>;

export type EditableTableEditContextV2<TData extends object> = EditableTableCellContextV2<TData> & {
  save: (value: unknown) => Promise<void>;
  cancel: () => void;
  isSaving: boolean;
};

export type EditableTableColumnV2<TData extends object> = {
  id: string;
  header: string;
  accessorKey?: keyof TData;
  accessorFn?: (row: TData) => unknown;
  size?: number;
  enableEditing?: boolean | ((row: Row<Features, TData>) => boolean);
  enableHiding?: boolean;
  Cell?: (context: EditableTableCellContextV2<TData>) => ReactNode;
  filterVariant?: FilterVariant;
  filterSelectOptions?: string[];
  filterFn?: (row: TData, columnId: string, value: unknown) => boolean;
  sortFn?: ColumnDef<Features, TData>['sortFn'];
  editConfig?: {
    onSave?: (row: TData, value: unknown, columnId: string) => void | Promise<void>;
    editVariant?: 'text' | 'select' | 'custom';
    selectOptions?: { label: string; value: string | number }[];
    customEditComponent?: (context: EditableTableEditContextV2<TData>) => ReactNode;
  };
};
