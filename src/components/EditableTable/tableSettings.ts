import {
  MRT_Column,
  MRT_ColumnFiltersState,
  MRT_ColumnOrderState,
  MRT_ColumnPinningState,
  MRT_RowData,
  MRT_SortingState,
  MRT_TableInstance,
  MRT_TableState,
  MRT_VisibilityState,
  getDefaultColumnOrderIds,
} from 'material-react-table';

export type TableSettings = {
  columnFilters: MRT_ColumnFiltersState;
  columnOrder: MRT_ColumnOrderState;
  columnPinning: MRT_ColumnPinningState;
  columnVisibility: MRT_VisibilityState;
  globalFilter: string;
  sorting: MRT_SortingState;
};

export type TableSettingsColumn = {
  id: string;
  header: string;
  filterVariant?: string;
  filterSelectOptions?: MRT_Column<MRT_RowData>['columnDef']['filterSelectOptions'];
  isVisible: boolean;
  pinned: 'left' | 'right' | false;
};

export const isDataColumnId = (columnId: string) => !columnId.startsWith('mrt-');

const readSettings = <TData extends MRT_RowData>(state: Partial<MRT_TableState<TData>>): TableSettings => ({
  columnFilters: state.columnFilters ?? [],
  columnOrder: state.columnOrder ?? [],
  columnPinning: state.columnPinning ?? {},
  columnVisibility: state.columnVisibility ?? {},
  globalFilter: state.globalFilter ?? '',
  sorting: state.sorting ?? [],
});

export const getTableSettings = <TData extends MRT_RowData>(table: MRT_TableInstance<TData>): TableSettings =>
  readSettings(table.getState());

export const getInitialTableSettings = <TData extends MRT_RowData>(table: MRT_TableInstance<TData>): TableSettings =>
  readSettings(table.initialState);

export const applyTableSettings = <TData extends MRT_RowData>(
  table: MRT_TableInstance<TData>,
  settings: Partial<TableSettings>
): void => {
  if (settings.columnFilters !== undefined) {
    table.setColumnFilters(settings.columnFilters);
  }
  if (settings.columnOrder !== undefined) {
    table.setColumnOrder(
      getDefaultColumnOrderIds({
        ...table.options,
        state: { ...table.getState(), columnOrder: settings.columnOrder.filter(isDataColumnId) },
      })
    );
  }
  if (settings.columnPinning !== undefined) {
    table.setColumnPinning(settings.columnPinning);
  }
  if (settings.columnVisibility !== undefined) {
    table.setColumnVisibility(settings.columnVisibility);
  }
  if (settings.globalFilter !== undefined) {
    table.setGlobalFilter(settings.globalFilter);
  }
  if (settings.sorting !== undefined) {
    table.setSorting(settings.sorting);
  }
};

const toSettingsColumn = <TData extends MRT_RowData>(column: MRT_Column<TData>): TableSettingsColumn => ({
  id: column.id,
  header: typeof column.columnDef.header === 'string' ? column.columnDef.header : column.id,
  filterVariant: column.columnDef.filterVariant,
  filterSelectOptions: column.columnDef.filterSelectOptions,
  isVisible: column.getIsVisible(),
  pinned: column.getIsPinned(),
});

export const getTableColumns = <TData extends MRT_RowData>(
  table: MRT_TableInstance<TData>,
  order: 'definition' | 'display'
): TableSettingsColumn[] =>
  (order === 'definition'
    ? table.getAllFlatColumns().filter((column) => !column.columns?.length)
    : table.getAllLeafColumns()
  ).map(toSettingsColumn);

export const getVisibleTableColumns = <TData extends MRT_RowData>(
  table: MRT_TableInstance<TData>
): TableSettingsColumn[] =>
  [
    ...table.getLeftVisibleLeafColumns(),
    ...table.getCenterVisibleLeafColumns(),
    ...table.getRightVisibleLeafColumns(),
  ].map((column) => toSettingsColumn(column as MRT_Column<TData>));
