import React, { CSSProperties, ReactNode, useEffect, useMemo, useState } from 'react';

import { ArrowDownward, Close, FilterAlt, Search, SyncAlt } from '@mui/icons-material';
import {
  Box,
  IconButton,
  InputAdornment,
  InputLabel,
  MenuItem,
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
  TextField,
  Theme,
  Toolbar,
  Tooltip,
} from '@mui/material';
import { alpha, darken, lighten, useTheme } from '@mui/material/styles';
import { Column, ColumnDef, ColumnFiltersState, functionalUpdate, useTable } from '@tanstack/react-table';

import { getLocale, useStrings } from '../../strings';
import Button from '../Button/Button';
import EditableCellV2 from './EditableCellV2';
import { filterTooltip } from './filterTooltip';
import { namedFilterFns, namedSortFns } from './functions';
import { highlightValue } from './highlightValue';
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
  enableClearAllFilters?: boolean;
  enableEditing?: boolean;
  enableSorting?: boolean;
  enableGlobalFilter?: boolean;
  enableFilterMatchHighlighting?: boolean;
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

const readFilters = (storageKey?: string): ColumnFiltersState | undefined => {
  try {
    const saved: unknown = storageKey
      ? JSON.parse(localStorage.getItem(`${storageKey}_columnFilters`) ?? 'null')
      : null;
    if (
      Array.isArray(saved) &&
      saved.every(
        (filter: unknown): filter is ColumnFiltersState[number] =>
          typeof filter === 'object' &&
          filter !== null &&
          'id' in filter &&
          typeof filter.id === 'string' &&
          'value' in filter
      )
    ) {
      return saved.filter(isActiveFilter);
    }
  } catch {
    return undefined;
  }
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
        ? { [theme.direction === 'rtl' ? 'insetInlineEnd' : 'insetInlineStart']: column.getStart('start') }
        : { [theme.direction === 'rtl' ? 'insetInlineStart' : 'insetInlineEnd']: column.getAfter('end') }),
    }),
  };
};

const UnsortedIcon = (props: React.ComponentProps<typeof SyncAlt>) => (
  <SyncAlt {...props} style={{ ...props.style, transform: 'rotate(-90deg) scaleX(0.9) translateX(-1px)' }} />
);

const ColumnFilter = <TData extends object>({
  column,
  definition,
}: {
  column: Column<typeof editableTableFeatures, TData>;
  definition: EditableTableColumnV2<TData>;
}) => {
  const strings = useStrings();
  const label = `${strings.FILTER}: ${definition.header}`;
  const placeholder = strings.FILTER_BY_COLUMN.replace('{column}', definition.header);
  const value = column.getFilterValue();
  if (definition.filterVariant === 'range' || definition.filterVariant === 'date-range') {
    const range = Array.isArray(value) ? value : ['', ''];
    return (
      <Box display='flex' gap={1}>
        {[0, 1].map((index) => (
          <TextField
            key={index}
            size='small'
            variant='standard'
            placeholder={index === 0 ? strings.MIN : strings.MAX}
            type={definition.filterVariant === 'date-range' ? 'date' : 'number'}
            value={range[index] ?? ''}
            slotProps={{
              htmlInput: { 'aria-label': `${label} ${index === 0 ? strings.MIN : strings.MAX}` },
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
      variant='standard'
      placeholder={placeholder}
      sx={{ minWidth: 120, mx: '-2px', p: 0, width: 'calc(100% + 4px)' }}
      select={select}
      value={value ?? (multiple ? [] : '')}
      onChange={(event) => {
        const next = event.target.value;
        column.setFilterValue(Array.isArray(next) && !next.length ? undefined : next || undefined);
      }}
      slotProps={{
        htmlInput: { 'aria-label': label },
        input: {
          endAdornment: (
            <InputAdornment
              position='end'
              sx={{ mr: select ? '20px' : undefined, visibility: isActiveFilter({ value }) ? 'visible' : 'hidden' }}
            >
              <IconButton
                size='small'
                aria-label={`${strings.CLEAR_FILTER}: ${definition.header}`}
                disabled={!isActiveFilter({ value })}
                onClick={() => column.setFilterValue(undefined)}
                sx={{ height: '2rem', width: '2rem', transform: 'scale(0.9)' }}
              >
                <Close />
              </IconButton>
            </InputAdornment>
          ),
        },
        select: {
          multiple,
          displayEmpty: true,
          'aria-label': label,
          renderValue: (selected) =>
            (Array.isArray(selected) ? selected.join(', ') : String(selected ?? '')) || (
              <Box sx={{ opacity: 0.5 }}>{placeholder}</Box>
            ),
        },
      }}
    >
      {select && !multiple && <MenuItem value=''>{strings.ALL}</MenuItem>}
      {select &&
        definition.filterSelectOptions?.map((option) => (
          <MenuItem key={option} value={option}>
            {option}
          </MenuItem>
        ))}
    </TextField>
  );
};

const sameRow = <TData extends object>(previous: TData, next: TData) =>
  previous === next ||
  (Object.keys(previous).length === Object.keys(next).length &&
    (Object.keys(previous) as (keyof TData)[]).every(
      (key) => Object.prototype.hasOwnProperty.call(next, key) && Object.is(previous[key], next[key])
    ));

const physicalColumnOrder = <T,>(start: T[], center: T[], end: T[], direction: Theme['direction']) =>
  direction === 'rtl' ? [...end.toReversed(), ...center, ...start.toReversed()] : [...start, ...center, ...end];

const EditableTableV2 = <TData extends object>({
  clearAllFiltersLabel,
  columns,
  data,
  enableClearAllFilters = true,
  enableEditing = false,
  enableSorting = true,
  enableGlobalFilter = false,
  enableFilterMatchHighlighting = true,
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
  const theme = useTheme();
  const [editingCell, setEditingCell] = useState<{ id: string; original: TData } | null>(null);
  const [initialColumnFilters] = useState(() => tableOptions?.initialState?.columnFilters ?? []);
  const [columnFilters, setColumnFilters] = useState(
    () => readFilters(stickyFilters ? storageKey : undefined) ?? initialColumnFilters
  );

  useEffect(() => {
    setColumnFilters(readFilters(stickyFilters ? storageKey : undefined) ?? initialColumnFilters);
  }, [stickyFilters, storageKey, initialColumnFilters]);

  const tableColumns = useMemo<ColumnDef<typeof editableTableFeatures, TData>[]>(
    () =>
      columns.map((column) => ({
        id: column.id,
        header: column.header,
        meta: { filterVariant: column.filterVariant, filterSelectOptions: column.filterSelectOptions },
        accessorFn:
          column.accessorFn ?? ((row) => (column.accessorKey !== undefined ? row[column.accessorKey] : undefined)),
        ...(column.size !== undefined ? { size: column.size } : {}),
        ...(column.enableGlobalFilter !== undefined ? { enableGlobalFilter: column.enableGlobalFilter } : {}),
        ...(column.enableHiding !== undefined ? { enableHiding: column.enableHiding } : {}),
        enableColumnFilter: !!column.filterVariant,
        ...(column.enableSorting !== undefined
          ? { enableSorting: column.enableSorting }
          : column.accessorFn ||
              column.accessorKey !== undefined ||
              column.sortFn ||
              ('sortingFn' in column && column.sortingFn)
            ? {}
            : { enableSorting: false }),
        ...(column.sortFn || column.sortingFn
          ? {
              sortFn:
                column.sortFn ??
                (typeof column.sortingFn === 'function'
                  ? (column.sortingFn as unknown as ColumnDef<typeof editableTableFeatures, TData>['sortFn'])
                  : column.sortingFn && column.sortingFn !== 'auto'
                    ? (namedSortFns[column.sortingFn as keyof typeof namedSortFns] as unknown as ColumnDef<
                        typeof editableTableFeatures,
                        TData
                      >['sortFn'])
                    : 'auto'),
            }
          : {}),
        filterFn: Object.assign(
          (
            row: Parameters<Exclude<ColumnDef<typeof editableTableFeatures, TData>['filterFn'], string | undefined>>[0],
            id: string,
            filterValue: unknown,
            addMeta: Parameters<
              Exclude<ColumnDef<typeof editableTableFeatures, TData>['filterFn'], string | undefined>
            >[3]
          ) => {
            if (typeof column.filterFn === 'function') {
              return column.filterFn(row.original, id, filterValue);
            }
            if (column.filterFn) {
              const filter = namedFilterFns[column.filterFn];
              const resolvedValue = filter.resolveFilterValue?.(filterValue) ?? filterValue;
              return (
                filter as unknown as (
                  filterRow: typeof row,
                  columnId: string,
                  value: unknown,
                  setMeta: typeof addMeta
                ) => boolean
              )(row, id, resolvedValue, addMeta);
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
                (min === '' || min === null || min === undefined || numeric >= normalize(min)) &&
                (max === '' ||
                  max === null ||
                  max === undefined ||
                  (column.filterVariant === 'date-range' && typeof max === 'string' && /^\d{4}-\d{2}-\d{2}$/.test(max)
                    ? numeric < normalize(max) + 24 * 60 * 60 * 1000
                    : numeric <= normalize(max)))
              );
            }
            return namedFilterFns.fuzzy(row, id, filterValue, addMeta);
          },
          {
            autoRemove:
              typeof column.filterFn === 'string'
                ? (namedFilterFns[column.filterFn].autoRemove as (value: unknown) => boolean)
                : undefined,
          }
        ),
      })),
    [columns, tableOptions?.defaultColumn]
  );

  const persistFilters = stickyFilters && !!storageKey && tableOptions?.state?.columnFilters === undefined;
  const { state, initialState, onColumnPinningChange, ...options } = tableOptions ?? {};
  const { columnPinning: controlledPinning, ...controlledState } = state ?? {};
  const { columnPinning: initialPinning, ...initialTableState } = initialState ?? {};
  const table = useTable({
    features: editableTableFeatures,
    columns: tableColumns,
    data,
    enableSorting,
    sortDescFirst: false,
    enableColumnFilters,
    enableGlobalFilter,
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
      ...(persistFilters && { columnFilters }),
    },
    ...(onColumnPinningChange && {
      onColumnPinningChange: (updater) =>
        onColumnPinningChange((previous) => {
          const next = functionalUpdate(updater, toInternalPinning(previous));
          return toPublicPinning(next);
        }),
    }),
    ...(persistFilters && {
      onColumnFiltersChange: (updater) => {
        setColumnFilters((previous) => {
          const next = typeof updater === 'function' ? updater(previous) : updater;
          try {
            localStorage.setItem(`${storageKey}_columnFilters`, JSON.stringify(next.filter(isActiveFilter)));
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
  const orderedColumns = physicalColumnOrder(
    table.getStartVisibleLeafColumns(),
    table.getCenterVisibleLeafColumns(),
    table.getEndVisibleLeafColumns(),
    theme.direction
  );
  const rows = table.getRowModel().rows;
  useEffect(() => {
    if (editingCell && !rows.some((row) => row.getVisibleCells().some((cell) => cell.id === editingCell.id))) {
      setEditingCell(null);
    }
  }, [editingCell, rows, visibleColumns]);
  const pageCountWithoutRowCount =
    table.options.manualPagination &&
    table.options.pageCount !== undefined &&
    table.options.pageCount >= -1 &&
    table.options.rowCount === undefined;
  const nextPageButton = { disabled: !table.getCanNextPage() };
  const lastPageButton = {
    disabled: table.getPageCount() < 0 || !table.getCanNextPage(),
    onClick: () => table.setPageIndex(Math.max(0, table.getPageCount() - 1)),
  };
  const filtersVisible = enableColumnFilters;

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
            {enableGlobalFilter && (
              <TextField
                placeholder={strings.SEARCH}
                size='small'
                slotProps={{
                  htmlInput: { 'aria-label': strings.SEARCH },
                  input: {
                    startAdornment: <Search sx={{ mr: '4px' }} />,
                    endAdornment: (
                      <InputAdornment position='end'>
                        <IconButton
                          size='small'
                          aria-label={strings.CLEAR_SEARCH}
                          disabled={!table.state.globalFilter}
                          onClick={() => table.setGlobalFilter('')}
                        >
                          <Close />
                        </IconButton>
                      </InputAdornment>
                    ),
                  },
                }}
                value={table.state.globalFilter ?? ''}
                onChange={(event) => table.setGlobalFilter(event.target.value)}
              />
            )}
            <Box flexGrow={1} />
            {enableClearAllFilters && hasFilters && (
              <Button label={clearAllFiltersLabel} priority='ghost' size='small' onClick={clearFilters} />
            )}
            {renderToolbarInternalActions?.({ table })}
          </Toolbar>
        )}
        <TableContainer {...containerProps}>
          <Table sx={{ minWidth: table.getTotalSize() }}>
            <TableHead>
              <TableRow>
                {orderedColumns.map((column) => {
                  const header = (
                    <>
                      {definitions.get(column.id)?.header}
                      {column.getIsFiltered() && (
                        <Tooltip
                          placement='top'
                          title={filterTooltip(definitions.get(column.id)!, column.getFilterValue(), strings)}
                        >
                          <FilterAlt
                            sx={{ color: 'action.active', ml: '4px', width: '18px', height: '18px' }}
                            role='img'
                            aria-label={`${strings.FILTERED}: ${definitions.get(column.id)?.header}`}
                            onClick={(event) => event.stopPropagation()}
                          />
                        </Tooltip>
                      )}
                    </>
                  );
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
                        pb: filtersVisible ? '6.4px' : '9.6px',
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
                      {filtersVisible && column.getCanFilter() && (
                        <ColumnFilter column={column} definition={definitions.get(column.id)!} />
                      )}
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
                  {physicalColumnOrder(
                    row.getStartVisibleCells(),
                    row.getCenterVisibleCells(),
                    row.getEndVisibleCells(),
                    theme.direction
                  ).map((cell) => {
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
                    const columnFilter = column.getFilterValue();
                    const highlightColumnFilter =
                      columnFilter && (!definition.filterVariant || definition.filterVariant === 'text');
                    const renderedCellValue = highlightValue(
                      value,
                      enableFilterMatchHighlighting && definition.enableFilterMatchHighlighting !== false
                        ? highlightColumnFilter
                          ? columnFilter
                          : column.getCanGlobalFilter()
                            ? table.state.globalFilter
                            : undefined
                        : undefined,
                      highlightColumnFilter ? definition.filterFn !== 'fuzzy' : true
                    );
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
                          <definition.Cell {...cell.getContext()} renderedCellValue={renderedCellValue} />
                        ) : (
                          renderedCellValue
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
