import React, { CSSProperties, ReactNode, useMemo, useState } from 'react';

import { ArrowDownward, SyncAlt } from '@mui/icons-material';
import {
  Box,
  InputLabel,
  Paper,
  Select,
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
  Theme,
  Toolbar,
} from '@mui/material';
import { alpha, darken, lighten, useTheme } from '@mui/material/styles';
import { Column, ColumnDef, functionalUpdate, useTable } from '@tanstack/react-table';

import { getLocale, useStrings } from '../../strings';
import EditableCellV2 from './EditableCellV2';
import { toInternalPinning, toPublicPinning } from './pinning';
import { EditableTableColumnV2, EditableTableInstanceV2, EditableTableOptionsV2, editableTableFeatures } from './types';

export type {
  EditableTableColumnPinningV2,
  EditableTableCellContextV2,
  EditableTableCellV2,
  EditableTableColumnV2,
  EditableTableEditContextV2,
  EditableTableInstanceV2,
  EditableTableOptionsV2,
} from './types';

export type EditableTablePropsV2<TData extends object> = {
  clearAllFiltersLabel: string;
  columns: EditableTableColumnV2<TData>[];
  data: TData[];
  enableEditing?: boolean;
  enableSorting?: boolean;
  enablePagination?: boolean;
  enableBottomToolbar?: boolean;
  enableTopToolbar?: boolean;
  initialSorting?: { id: string; desc: boolean }[];
  onRowClick?: (row: TData) => void;
  renderToolbarInternalActions?: (props: { table: EditableTableInstanceV2<TData> }) => ReactNode;
  tableOptions?: EditableTableOptionsV2<TData>;
  containerProps?: TableContainerProps;
  sx?: SxProps<Theme>;
};

const pinnedStyles = <TData extends object>(
  column: Column<typeof editableTableFeatures, TData>,
  theme: Theme
): CSSProperties => {
  const position = column.getIsPinned();
  return {
    width: column.getSize(),
    minWidth: column.getSize(),
    ...(position && {
      position: 'sticky',
      zIndex: 1,
      backgroundColor: theme.palette.background.paper,
      ...(position === 'start'
        ? { insetInlineStart: column.getStart('start') }
        : { insetInlineEnd: column.getAfter('end') }),
    }),
  };
};

const UnsortedIcon = (props: React.ComponentProps<typeof SyncAlt>) => (
  <SyncAlt {...props} style={{ ...props.style, transform: 'rotate(-90deg) scaleX(0.9) translateX(-1px)' }} />
);

const sameRow = <TData extends object>(previous: TData, next: TData) =>
  previous === next ||
  (Object.keys(previous).length === Object.keys(next).length &&
    (Object.keys(previous) as (keyof TData)[]).every(
      (key) => Object.prototype.hasOwnProperty.call(next, key) && Object.is(previous[key], next[key])
    ));

const EditableTableV2 = <TData extends object>({
  columns,
  data,
  enableEditing = false,
  enableSorting = true,
  enablePagination = true,
  enableBottomToolbar = true,
  enableTopToolbar = true,
  initialSorting,
  onRowClick,
  renderToolbarInternalActions,
  tableOptions,
  containerProps,
  sx,
}: EditableTablePropsV2<TData>) => {
  const strings = useStrings();
  const theme = useTheme();
  const [editingCell, setEditingCell] = useState<{ id: string; original: TData } | null>(null);
  const tableColumns = useMemo<ColumnDef<typeof editableTableFeatures, TData>[]>(
    () =>
      columns.map((column) => ({
        id: column.id,
        header: column.header,
        accessorFn:
          column.accessorFn ?? ((row) => (column.accessorKey !== undefined ? row[column.accessorKey] : undefined)),
        size: column.size,
        ...(column.sortFn ? { sortFn: column.sortFn } : {}),
        ...(column.enableSorting !== undefined
          ? { enableSorting: column.enableSorting }
          : column.accessorFn ||
              column.accessorKey !== undefined ||
              column.sortFn ||
              ('sortingFn' in column && column.sortingFn)
            ? {}
            : { enableSorting: false }),
      })),
    [columns, tableOptions?.defaultColumn]
  );

  const { state, initialState, onColumnPinningChange, ...options } = tableOptions ?? {};
  const { columnPinning: controlledPinning, ...controlledState } = state ?? {};
  const { columnPinning: initialPinning, ...initialTableState } = initialState ?? {};
  const table = useTable({
    features: editableTableFeatures,
    columns: tableColumns,
    data,
    enableSorting,
    sortDescFirst: false,
    manualPagination: !enablePagination,
    ...options,
    initialState: {
      sorting: initialSorting ?? [],
      ...initialTableState,
      ...(initialPinning && { columnPinning: toInternalPinning(initialPinning) }),
    },
    state: {
      ...controlledState,
      ...(controlledPinning && { columnPinning: toInternalPinning(controlledPinning) }),
    },
    ...(onColumnPinningChange && {
      onColumnPinningChange: (updater) =>
        onColumnPinningChange((previous) => {
          const next = functionalUpdate(updater, toInternalPinning(previous));
          return toPublicPinning(next);
        }),
    }),
  });
  const definitions = new Map(columns.map((column) => [column.id, column]));
  const visibleColumns = table.getVisibleLeafColumns();
  const orderedColumns = visibleColumns;
  const rows = table.getRowModel().rows;
  const pageCountWithoutRowCount =
    table.options.manualPagination &&
    table.options.pageCount !== undefined &&
    table.options.pageCount >= 0 &&
    table.options.rowCount === undefined;
  const nextPageButton = { disabled: !table.getCanNextPage() };
  const lastPageButton = {
    disabled: !table.getCanNextPage(),
    onClick: () => table.setPageIndex(Math.max(0, table.getPageCount() - 1)),
  };

  return (
    <Box minHeight='160px' padding={2} sx={sx}>
      <Paper elevation={0}>
        {enableTopToolbar && (
          <Toolbar
            disableGutters
            sx={{
              gap: 1,
              flexWrap: 'wrap',
              alignItems: 'flex-start',
              p: 1,
              minHeight: '56px !important',
              boxSizing: 'border-box',
            }}
          >
            {renderToolbarInternalActions?.({ table })}
          </Toolbar>
        )}
        <TableContainer {...containerProps}>
          <Table sx={{ minWidth: table.getTotalSize() }}>
            <TableHead>
              <TableRow>
                {orderedColumns.map((column) => {
                  const header = <>{definitions.get(column.id)?.header}</>;
                  return (
                    <TableCell
                      key={column.id}
                      sortDirection={column.getIsSorted() || false}
                      sx={{
                        ...pinnedStyles(column, theme),
                        bgcolor: 'background.paper',
                        fontWeight: 'bold',
                        p: 2,
                        pt: '12px',
                        pb: '9.6px',
                        verticalAlign: 'top',
                        '&:hover .MuiIconButton-root': { opacity: 1 },
                      }}
                    >
                      <Box display='flex' alignItems='center' sx={{ minHeight: '24px' }}>
                        {column.getCanSort() ? (
                          <TableSortLabel
                            active={!!column.getIsSorted()}
                            direction={column.getIsSorted() || 'asc'}
                            IconComponent={column.getIsSorted() ? ArrowDownward : UnsortedIcon}
                            sx={(theme) => ({
                              fontWeight: 'inherit',
                              whiteSpace: definitions.get(column.id)!.header.length < 20 ? 'nowrap' : 'normal',
                              '& .MuiTableSortLabel-icon': {
                                color: `${theme.palette.mode === 'dark' ? theme.palette.text.primary : theme.palette.text.secondary} !important`,
                                opacity: column.getIsSorted() ? 1 : 0.3,
                                width: '3ch',
                                m: 0,
                              },
                            })}
                            onClick={column.getToggleSortingHandler()}
                          >
                            {header}
                          </TableSortLabel>
                        ) : (
                          header
                        )}
                      </Box>
                    </TableCell>
                  );
                })}
              </TableRow>
            </TableHead>
            <TableBody>
              {rows.map((row, rowIndex) => (
                <TableRow
                  key={row.id}
                  onClick={onRowClick ? () => onRowClick(row.original) : undefined}
                  sx={(theme) => {
                    const background = theme.palette.background.default;
                    const hoverColor = alpha(
                      theme.palette.mode === 'dark' ? lighten(background, 0.3) : darken(background, 0.3),
                      0.3
                    );
                    return {
                      cursor: onRowClick ? 'pointer' : 'default',
                      '&:hover > td': { backgroundImage: `linear-gradient(${hoverColor}, ${hoverColor})` },
                    };
                  }}
                >
                  {row.getVisibleCells().map((cell) => {
                    const column = cell.column;
                    const definition = definitions.get(column.id)!;
                    const editConfig = definition.editConfig;
                    const canEdit =
                      (typeof definition.enableEditing === 'function'
                        ? definition.enableEditing(row)
                        : (definition.enableEditing ?? enableEditing)) &&
                      enableEditing &&
                      (!!editConfig?.onSave ||
                        (editConfig?.editVariant === 'custom' && !!editConfig.customEditComponent));
                    const value = cell.getValue();
                    return (
                      <TableCell
                        key={cell.id}
                        tabIndex={canEdit ? 0 : undefined}
                        onClick={canEdit ? (event) => event.stopPropagation() : undefined}
                        onDoubleClick={
                          canEdit ? () => setEditingCell({ id: cell.id, original: row.original }) : undefined
                        }
                        onKeyDown={
                          canEdit
                            ? (event) => {
                                if (
                                  event.target === event.currentTarget &&
                                  (event.key === 'Enter' || event.key === 'F2')
                                ) {
                                  event.preventDefault();
                                  setEditingCell({ id: cell.id, original: row.original });
                                }
                              }
                            : undefined
                        }
                        sx={{
                          ...pinnedStyles(column, theme),
                          borderBottom: 'none',
                          bgcolor: rowIndex % 2 === 0 ? 'TwClrBaseGray025' : 'background.paper',
                          cursor: canEdit ? 'pointer' : 'inherit',
                          outlineOffset: '-1px',
                          '&:hover': { outline: canEdit ? '1px solid' : undefined, outlineColor: 'grey.500' },
                        }}
                      >
                        {editingCell?.id === cell.id &&
                        (options.getRowId !== undefined || sameRow(editingCell.original, row.original)) ? (
                          <EditableCellV2
                            key={cell.id}
                            cell={cell}
                            column={definition}
                            onClose={() => setEditingCell((current) => (current === editingCell ? null : current))}
                          />
                        ) : definition.Cell ? (
                          <definition.Cell {...cell.getContext()} />
                        ) : (
                          String(value ?? '')
                        )}
                      </TableCell>
                    );
                  })}
                </TableRow>
              ))}
              {!rows.length && (
                <TableRow>
                  <TableCell colSpan={Math.max(1, visibleColumns.length)}>{strings.NO_RECORDS_TO_DISPLAY}</TableCell>
                </TableRow>
              )}
            </TableBody>
          </Table>
        </TableContainer>
        {enablePagination && enableBottomToolbar && (
          <TablePagination
            component='div'
            sx={(theme) => ({
              boxShadow: `0 1px 2px -1px ${alpha(theme.palette.grey[700], 0.5)} inset`,
              '& .MuiTablePagination-displayedRows': { ...theme.typography.body2, color: 'text.primary' },
            })}
            showFirstButton
            showLastButton
            count={pageCountWithoutRowCount ? -1 : table.getRowCount()}
            slots={{ selectLabel: InputLabel, select: Select }}
            slotProps={{
              selectLabel: { sx: { mb: 0, flexShrink: 0 } },
              select: { sx: { ml: 1, mr: 4, flexShrink: 0 } },
              ...(pageCountWithoutRowCount
                ? {
                    actions:
                      theme.direction === 'rtl'
                        ? { previousButton: nextPageButton, firstButton: lastPageButton }
                        : { nextButton: nextPageButton, lastButton: lastPageButton },
                  }
                : {}),
            }}
            page={table.state.pagination.pageIndex}
            rowsPerPage={table.state.pagination.pageSize}
            rowsPerPageOptions={Array.from(new Set([table.state.pagination.pageSize, 10, 25, 50, 100])).sort(
              (a, b) => a - b
            )}
            labelRowsPerPage={strings.ROWS_PER_PAGE}
            labelDisplayedRows={({ from, to, count }) =>
              pageCountWithoutRowCount
                ? `${rows.length ? from : 0}–${rows.length ? from + rows.length - 1 : 0}`
                : `${from.toLocaleString(getLocale())}-${to.toLocaleString(getLocale())} ${strings.OF} ${count.toLocaleString(getLocale())}`
            }
            getItemAriaLabel={(type) =>
              ({
                first: strings.FIRST_PAGE,
                last: strings.LAST_PAGE,
                next: strings.NEXT_PAGE,
                previous: strings.PREVIOUS_PAGE,
              })[type]
            }
            onPageChange={(_, page) => table.setPageIndex(page)}
            onRowsPerPageChange={(event) => table.setPageSize(Number(event.target.value))}
          />
        )}
      </Paper>
    </Box>
  );
};

export default EditableTableV2;
