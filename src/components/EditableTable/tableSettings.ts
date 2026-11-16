import {
  MRT_Column,
  MRT_ColumnFiltersState,
  MRT_ColumnOrderState,
  MRT_ColumnPinningState,
  MRT_RowData,
  MRT_SortingState,
  MRT_TableInstance,
  MRT_VisibilityState,
  getDefaultColumnOrderIds,
} from 'material-react-table';

import { getColumnPinPositionV2, setColumnPinningV2, toPublicPinning } from '../EditableTableV2/pinning';
import type { EditableTableInstanceV2 } from '../EditableTableV2/types';

export type EditableTableInstance<TData extends MRT_RowData> =
  MRT_TableInstance<TData> | EditableTableInstanceV2<TData>;

export type EditableTableToolbarContext<TData extends MRT_RowData> = { table: EditableTableInstance<TData> };

export const isMrtTable = <TData extends MRT_RowData>(
  table: EditableTableInstance<TData>
): table is MRT_TableInstance<TData> => 'getState' in table;

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

const readSettings = (state: Partial<TableSettings>): TableSettings => ({
  columnFilters: state.columnFilters ?? [],
  columnOrder: state.columnOrder ?? [],
  columnPinning: state.columnPinning ?? {},
  columnVisibility: state.columnVisibility ?? {},
  globalFilter: state.globalFilter ?? '',
  sorting: state.sorting ?? [],
});

export const getTableSettings = <TData extends MRT_RowData>(table: EditableTableInstance<TData>): TableSettings => {
  if (isMrtTable(table)) {
    return readSettings(table.getState());
  }
  const state = table.store.get();

  return readSettings({ ...state, columnPinning: toPublicPinning(state.columnPinning) });
};

export const getInitialTableSettings = <TData extends MRT_RowData>(
  table: EditableTableInstance<TData>
): TableSettings =>
  readSettings(
    isMrtTable(table)
      ? table.initialState
      : {
          ...table.initialState,
          columnPinning: toPublicPinning(table.initialState.columnPinning),
        }
  );

export const applyTableSettings = <TData extends MRT_RowData>(
  table: EditableTableInstance<TData>,
  settings: Partial<TableSettings>
): void => {
  if (settings.columnFilters !== undefined) {
    table.setColumnFilters(settings.columnFilters);
  }
  if (settings.columnOrder !== undefined) {
    table.setColumnOrder(
      isMrtTable(table)
        ? getDefaultColumnOrderIds({
            ...table.options,
            state: { ...table.getState(), columnOrder: settings.columnOrder.filter(isDataColumnId) },
          })
        : settings.columnOrder.filter(isDataColumnId)
    );
  }
  if (settings.columnPinning !== undefined) {
    if (isMrtTable(table)) {
      table.setColumnPinning(settings.columnPinning);
    } else {
      setColumnPinningV2(table, settings.columnPinning);
    }
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
  table: EditableTableInstance<TData>,
  order: 'definition' | 'display'
): TableSettingsColumn[] => {
  if (isMrtTable(table)) {
    return (order === 'definition'
      ? table.getAllFlatColumns().filter((column) => !column.columns?.length)
      : table.getAllLeafColumns()
    ).map(toSettingsColumn);
  }

  return (order === 'definition'
    ? table.getAllFlatColumns().filter((column) => !column.columns?.length)
    : table.getAllLeafColumns()
  ).map((column) => ({
    id: column.id,
    header: typeof column.columnDef.header === 'string' ? column.columnDef.header : column.id,
    ...(column.columnDef as { meta?: Pick<TableSettingsColumn, 'filterVariant' | 'filterSelectOptions'> }).meta,
    isVisible: column.getIsVisible(),
    pinned: getColumnPinPositionV2(column),
  }));
};

export const getVisibleTableColumns = <TData extends MRT_RowData>(
  table: EditableTableInstance<TData>
): TableSettingsColumn[] => {
  if (!isMrtTable(table)) {
    const columns = getTableColumns(table, 'display');
    const ids = [
      ...table.getStartVisibleLeafColumns(),
      ...table.getCenterVisibleLeafColumns(),
      ...table.getEndVisibleLeafColumns(),
    ].map((column) => column.id);

    return ids.map((id) => columns.find((column) => column.id === id)!);
  }

  return [
    ...table.getLeftVisibleLeafColumns(),
    ...table.getCenterVisibleLeafColumns(),
    ...table.getRightVisibleLeafColumns(),
  ].map((column) => toSettingsColumn(column as MRT_Column<TData>));
};
