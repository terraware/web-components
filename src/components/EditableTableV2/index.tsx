import React, { CSSProperties, ReactNode, useEffect, useMemo, useState } from 'react';

import { ArrowDownward, ArrowUpward, ViewColumn } from '@mui/icons-material';
import {
  Box,
  Checkbox,
  FormControlLabel,
  IconButton,
  Menu,
  MenuItem,
  Paper,
  SxProps,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableContainerProps,
  TableHead,
  TablePagination,
  TableRow,
  TableSortLabel,
  TextField,
  Theme,
  Toolbar,
} from '@mui/material';
import { Column, ColumnDef, ColumnFiltersState, useTable } from '@tanstack/react-table';

import { useStrings } from '../../strings';
import Button from '../Button/Button';
import EditableCellV2 from './EditableCellV2';
import { EditableTableColumnV2, EditableTableInstanceV2, EditableTableOptionsV2, editableTableFeatures } from './types';

export type {
  EditableTableCellV2,
  EditableTableCellContextV2,
  EditableTableColumnV2,
  EditableTableEditContextV2,
  EditableTableInstanceV2,
  EditableTableOptionsV2,
} from './types';

export type EditableTablePropsV2<TData extends object> = {
  clearAllFiltersLabel: string;
  columns: EditableTableColumnV2<TData>[];
  data: TData[];
  enableClearAllFilters?: boolean;
  enableEditing?: boolean;
  enableColumnOrdering?: boolean;
  enableColumnPinning?: boolean;
  enableHiding?: boolean;
  enableSorting?: boolean;
  enableGlobalFilter?: boolean;
  enableColumnFilters?: boolean;
  stickyFilters?: boolean;
  storageKey?: string;
  enablePagination?: boolean;
  enableBottomToolbar?: boolean;
  enableTopToolbar?: boolean;
  initialSorting?: { id: string; desc: boolean }[];
  onClearAllFilters?: () => void;
  onRowClick?: (row: TData) => void;
  renderToolbarInternalActions?: (props: { table: EditableTableInstanceV2<TData> }) => ReactNode;
  tableOptions?: EditableTableOptionsV2<TData>;
  containerProps?: TableContainerProps;
  sx?: SxProps<Theme>;
};

const isActiveFilter = (filter: { value: unknown }) => {
  const values = Array.isArray(filter.value) ? filter.value : [filter.value];
  return values.some((value) => value !== null && value !== undefined && value !== '');
};

const readFilters = (storageKey?: string): ColumnFiltersState => {
  try {
    const saved: unknown = storageKey ? JSON.parse(localStorage.getItem(`${storageKey}_columnFilters`) ?? '[]') : [];
    return Array.isArray(saved)
      ? saved.filter((filter) => filter && typeof filter.id === 'string' && isActiveFilter(filter))
      : [];
  } catch {
    return [];
  }
};

const pinnedStyles = <TData extends object>(column: Column<typeof editableTableFeatures, TData>): CSSProperties => {
  const position = column.getIsPinned();
  return {
    width: column.getSize(),
    minWidth: column.getSize(),
    ...(position && {
      position: 'sticky',
      zIndex: 1,
      ...(position === 'start'
        ? { insetInlineStart: column.getStart('start') }
        : { insetInlineEnd: column.getAfter('end') }),
    }),
  };
};

const ColumnFilter = <TData extends object>({
  column,
  definition,
}: {
  column: Column<typeof editableTableFeatures, TData>;
  definition: EditableTableColumnV2<TData>;
}) => {
  const strings = useStrings();
  const label = `${strings.TABLE_FILTER}: ${definition.header}`;
  const value = column.getFilterValue();
  if (definition.filterVariant === 'range' || definition.filterVariant === 'date-range') {
    const range = Array.isArray(value) ? value : ['', ''];
    return (
      <Box display='flex' gap={1}>
        {[0, 1].map((index) => (
          <TextField
            key={index}
            size='small'
            type={definition.filterVariant === 'date-range' ? 'date' : 'number'}
            value={range[index] ?? ''}
            slotProps={{
              htmlInput: { 'aria-label': `${label} ${index === 0 ? strings.TABLE_MIN : strings.TABLE_MAX}` },
            }}
            onChange={(event) => {
              const next = [...range];
              next[index] = event.target.value;
              column.setFilterValue(next.some((entry) => entry !== '') ? next : undefined);
            }}
          />
        ))}
      </Box>
    );
  }
  const multiple = definition.filterVariant === 'multi-select';
  const select = multiple || definition.filterVariant === 'select';
  return (
    <TextField
      fullWidth
      size='small'
      label={label}
      select={select}
      value={value ?? (multiple ? [] : '')}
      onChange={(event) => column.setFilterValue(event.target.value || undefined)}
      slotProps={{ select: { multiple } }}
    >
      {select && !multiple && <MenuItem value=''>{strings.TABLE_ALL}</MenuItem>}
      {select &&
        definition.filterSelectOptions?.map((option) => (
          <MenuItem key={option} value={option}>
            {option}
          </MenuItem>
        ))}
    </TextField>
  );
};

const EditableTableV2 = <TData extends object>({
  clearAllFiltersLabel,
  columns,
  data,
  enableClearAllFilters = true,
  enableEditing = false,
  enableColumnOrdering = false,
  enableColumnPinning = false,
  enableHiding = true,
  enableSorting = true,
  enableGlobalFilter = false,
  enableColumnFilters = false,
  stickyFilters = false,
  storageKey,
  enablePagination = true,
  enableBottomToolbar = true,
  enableTopToolbar = true,
  initialSorting,
  onClearAllFilters,
  onRowClick,
  renderToolbarInternalActions,
  tableOptions,
  containerProps,
  sx,
}: EditableTablePropsV2<TData>) => {
  const strings = useStrings();
  const [editingCell, setEditingCell] = useState<string | null>(null);
  const [menuAnchor, setMenuAnchor] = useState<HTMLElement | null>(null);
  const [columnFilters, setColumnFilters] = useState(() => readFilters(stickyFilters ? storageKey : undefined));

  useEffect(() => {
    setColumnFilters(readFilters(stickyFilters ? storageKey : undefined));
  }, [stickyFilters, storageKey]);

  const tableColumns = useMemo<ColumnDef<typeof editableTableFeatures, TData>[]>(
    () =>
      columns.map((column) => ({
        id: column.id,
        header: column.header,
        accessorFn:
          column.accessorFn ?? ((row) => (column.accessorKey !== undefined ? row[column.accessorKey] : undefined)),
        size: column.size,
        enableHiding: column.enableHiding ?? true,
        enableColumnFilter: !!column.filterVariant,
        ...(column.sortFn ? { sortFn: column.sortFn } : {}),
        filterFn: (row, id, filterValue: unknown) => {
          if (column.filterFn) {
            return column.filterFn(row.original, id, filterValue);
          }
          const value = row.getValue<unknown>(id);
          if (column.filterVariant === 'select') {
            return String(value ?? '') === String(filterValue);
          }
          if (column.filterVariant === 'multi-select') {
            return (
              !Array.isArray(filterValue) ||
              !filterValue.length ||
              filterValue.some((selected) =>
                Array.isArray(value) ? value.includes(selected) : String(value ?? '') === String(selected)
              )
            );
          }
          if (column.filterVariant === 'range' || column.filterVariant === 'date-range') {
            const [min, max] = Array.isArray(filterValue) ? filterValue : [];
            const normalize = (entry: unknown) =>
              column.filterVariant === 'date-range' ? Date.parse(String(entry)) : Number(entry);
            const numeric = normalize(value);
            return (
              value !== null &&
              value !== undefined &&
              value !== '' &&
              Number.isFinite(numeric) &&
              (min === '' || min === undefined || numeric >= normalize(min)) &&
              (max === '' || max === undefined || numeric <= normalize(max))
            );
          }
          return String(value ?? '')
            .toLocaleLowerCase()
            .includes(String(filterValue).toLocaleLowerCase());
        },
      })),
    [columns]
  );

  const persistFilters = stickyFilters && !!storageKey && tableOptions?.state?.columnFilters === undefined;
  const table = useTable({
    features: editableTableFeatures,
    columns: tableColumns,
    data,
    enableSorting,
    enableColumnPinning,
    enableHiding,
    enableColumnFilters,
    enableGlobalFilter,
    manualPagination: !enablePagination,
    ...tableOptions,
    initialState: { sorting: initialSorting ?? [], ...tableOptions?.initialState },
    ...(persistFilters && {
      state: { ...tableOptions?.state, columnFilters },
      onColumnFiltersChange: (updater) => {
        setColumnFilters((previous) => {
          const next = typeof updater === 'function' ? updater(previous) : updater;
          try {
            if (next.some(isActiveFilter)) {
              localStorage.setItem(`${storageKey}_columnFilters`, JSON.stringify(next.filter(isActiveFilter)));
            } else {
              localStorage.removeItem(`${storageKey}_columnFilters`);
            }
          } catch {
            // Tables remain usable when browser storage is unavailable.
          }
          return next;
        });
      },
    }),
  });
  const hasFilters = table.state.columnFilters.some(isActiveFilter) || !!table.state.globalFilter;
  const clearFilters = () => {
    table.setColumnFilters([]);
    table.setGlobalFilter('');
    onClearAllFilters?.();
  };
  const definitions = new Map(columns.map((column) => [column.id, column]));
  const visibleColumns = table.getVisibleLeafColumns();
  const orderedColumns = [
    ...table.getStartVisibleLeafColumns(),
    ...table.getCenterVisibleLeafColumns(),
    ...table.getEndVisibleLeafColumns(),
  ];
  const rows = table.getRowModel().rows;
  const controlsEnabled = enableHiding || enableColumnOrdering || enableColumnPinning;

  const moveColumn = (id: string, offset: number) => {
    const order = table.getAllLeafColumns().map((column) => column.id);
    const index = order.indexOf(id);
    const target = index + offset;
    if (target >= 0 && target < order.length) {
      [order[index], order[target]] = [order[target], order[index]];
      table.setColumnOrder(order);
    }
  };

  return (
    <Box minHeight='160px' padding={2} sx={sx}>
      <Paper elevation={0}>
        {enableTopToolbar && (
          <Toolbar sx={{ gap: 1, flexWrap: 'wrap' }}>
            {enableGlobalFilter && (
              <TextField
                label={strings.TABLE_SEARCH}
                size='small'
                value={table.state.globalFilter ?? ''}
                onChange={(event) => table.setGlobalFilter(event.target.value)}
              />
            )}
            <Box flexGrow={1} />
            {enableClearAllFilters && hasFilters && (
              <Button label={clearAllFiltersLabel} priority='ghost' size='small' onClick={clearFilters} />
            )}
            {renderToolbarInternalActions?.({ table })}
            {controlsEnabled && (
              <IconButton aria-label={strings.TABLE_COLUMNS} onClick={(event) => setMenuAnchor(event.currentTarget)}>
                <ViewColumn />
              </IconButton>
            )}
            <Menu anchorEl={menuAnchor} open={!!menuAnchor} onClose={() => setMenuAnchor(null)}>
              {table.getAllLeafColumns().map((column, index, allColumns) => (
                <Box key={column.id} display='flex' alignItems='center' px={2} gap={1}>
                  <FormControlLabel
                    label={definitions.get(column.id)?.header}
                    control={
                      <Checkbox
                        checked={column.getIsVisible()}
                        disabled={!enableHiding || !column.getCanHide()}
                        onChange={column.getToggleVisibilityHandler()}
                      />
                    }
                  />
                  {enableColumnOrdering && (
                    <>
                      <IconButton
                        aria-label={`${strings.TABLE_MOVE_BACK}: ${definitions.get(column.id)?.header}`}
                        disabled={index === 0}
                        onClick={() => moveColumn(column.id, -1)}
                      >
                        <ArrowUpward />
                      </IconButton>
                      <IconButton
                        aria-label={`${strings.TABLE_MOVE_FORWARD}: ${definitions.get(column.id)?.header}`}
                        disabled={index === allColumns.length - 1}
                        onClick={() => moveColumn(column.id, 1)}
                      >
                        <ArrowDownward />
                      </IconButton>
                    </>
                  )}
                  {enableColumnPinning && (
                    <TextField
                      select
                      size='small'
                      label={strings.TABLE_PIN}
                      value={column.getIsPinned() || ''}
                      onChange={(event) =>
                        column.pin(
                          event.target.value === 'start' ? 'start' : event.target.value === 'end' ? 'end' : false
                        )
                      }
                    >
                      <MenuItem value=''>{strings.TABLE_UNPIN}</MenuItem>
                      <MenuItem value='start'>{strings.TABLE_PIN_START}</MenuItem>
                      <MenuItem value='end'>{strings.TABLE_PIN_END}</MenuItem>
                    </TextField>
                  )}
                </Box>
              ))}
            </Menu>
          </Toolbar>
        )}
        <TableContainer {...containerProps}>
          <Table sx={{ minWidth: table.getTotalSize() }}>
            <TableHead>
              <TableRow>
                {orderedColumns.map((column) => (
                  <TableCell
                    key={column.id}
                    sortDirection={column.getIsSorted() || false}
                    sx={{ ...pinnedStyles(column), bgcolor: 'background.paper' }}
                  >
                    {column.getCanSort() ? (
                      <TableSortLabel
                        active={!!column.getIsSorted()}
                        direction={column.getIsSorted() || 'asc'}
                        onClick={column.getToggleSortingHandler()}
                      >
                        {definitions.get(column.id)?.header}
                      </TableSortLabel>
                    ) : (
                      definitions.get(column.id)?.header
                    )}
                    {enableColumnFilters && column.getCanFilter() && (
                      <ColumnFilter column={column} definition={definitions.get(column.id)!} />
                    )}
                  </TableCell>
                ))}
              </TableRow>
            </TableHead>
            <TableBody>
              {rows.map((row, rowIndex) => (
                <TableRow
                  key={row.id}
                  onClick={onRowClick ? () => onRowClick(row.original) : undefined}
                  sx={{ cursor: onRowClick ? 'pointer' : 'default' }}
                >
                  {[...row.getStartVisibleCells(), ...row.getCenterVisibleCells(), ...row.getEndVisibleCells()].map(
                    (cell) => {
                      const column = cell.column;
                      const definition = definitions.get(column.id)!;
                      const canEdit =
                        (typeof definition.enableEditing === 'function'
                          ? definition.enableEditing(row)
                          : (definition.enableEditing ?? enableEditing)) && enableEditing;
                      const value = cell.getValue();
                      return (
                        <TableCell
                          key={cell.id}
                          tabIndex={canEdit ? 0 : undefined}
                          onDoubleClick={canEdit ? () => setEditingCell(cell.id) : undefined}
                          onKeyDown={
                            canEdit
                              ? (event) => {
                                  if (event.key === 'Enter' || event.key === 'F2') {
                                    event.preventDefault();
                                    setEditingCell(cell.id);
                                  }
                                }
                              : undefined
                          }
                          sx={{
                            ...pinnedStyles(column),
                            borderBottom: 'none',
                            bgcolor: rowIndex % 2 === 0 ? 'TwClrBaseGray025' : 'background.paper',
                          }}
                        >
                          {editingCell === cell.id ? (
                            <EditableCellV2
                              key={cell.id}
                              cell={cell}
                              column={definition}
                              onClose={() => setEditingCell(null)}
                            />
                          ) : definition.Cell ? (
                            <definition.Cell {...cell.getContext()} />
                          ) : (
                            String(value ?? '')
                          )}
                        </TableCell>
                      );
                    }
                  )}
                </TableRow>
              ))}
              {!rows.length && (
                <TableRow>
                  <TableCell colSpan={Math.max(1, visibleColumns.length)}>{strings.TABLE_NO_ROWS}</TableCell>
                </TableRow>
              )}
            </TableBody>
          </Table>
        </TableContainer>
        {enablePagination && enableBottomToolbar && (
          <TablePagination
            component='div'
            count={table.getRowCount()}
            page={table.state.pagination.pageIndex}
            rowsPerPage={table.state.pagination.pageSize}
            rowsPerPageOptions={Array.from(new Set([table.state.pagination.pageSize, 10, 25, 50, 100])).sort(
              (a, b) => a - b
            )}
            labelRowsPerPage={strings.TABLE_ROWS_PER_PAGE}
            labelDisplayedRows={({ from, to, count }) => `${from}–${to} / ${count}`}
            getItemAriaLabel={(type) => (type === 'next' ? strings.TABLE_NEXT_PAGE : strings.TABLE_PREVIOUS_PAGE)}
            onPageChange={(_, page) => table.setPageIndex(page)}
            onRowsPerPageChange={(event) => table.setPageSize(Number(event.target.value))}
          />
        )}
      </Paper>
    </Box>
  );
};

export default EditableTableV2;
