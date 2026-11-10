import React, { ReactNode, useEffect, useMemo, useState } from 'react';

import { DragEndEvent } from '@dnd-kit/core';
import { arrayMove } from '@dnd-kit/sortable';
import {
  ArrowDownward,
  ArrowUpward,
  ClearAll,
  Close,
  DensityLarge,
  DensityMedium,
  DensitySmall,
  FilterAlt,
  FilterList,
  FilterListOff,
  Fullscreen,
  FullscreenExit,
  MoreVert,
  PushPin,
  Search,
  SearchOff,
  Sort,
  SyncAlt,
  ViewColumn,
  VisibilityOff,
} from '@mui/icons-material';
import {
  Box,
  Checkbox,
  Divider,
  FormControlLabel,
  IconButton,
  InputAdornment,
  ListItemIcon,
  MenuItem,
  Button as MuiButton,
  Paper,
  Switch,
  SxProps,
  Table,
  TableBody,
  TableCell,
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
import { alpha, darken, lighten } from '@mui/material/styles';
import { Column, ColumnDef, ColumnFiltersState, useTable } from '@tanstack/react-table';

import { useStrings } from '../../strings';
import Button from '../Button/Button';
import {
  ColumnDragHandle,
  ColumnDragMenu,
  ColumnDragTableContainer,
  DraggableColumnHeader,
  DraggableColumnItem,
} from './ColumnDragging';
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
  enableColumnDragging?: boolean;
  enableColumnActions?: boolean;
  showColumnsButton?: boolean;
  showGlobalFilterButton?: boolean;
  showColumnFiltersButton?: boolean;
  showDensityButton?: boolean;
  showFullScreenButton?: boolean;
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

const pinnedStyles = <TData extends object>(column: Column<typeof editableTableFeatures, TData>, theme: Theme) => {
  const position = column.getIsPinned();
  const background = theme.palette.background.default;
  const baseBackground = theme.palette.mode === 'dark' ? lighten(background, 0.05) : background;
  return {
    width: column.getSize(),
    minWidth: column.getSize(),
    ...(position && {
      position: 'sticky' as const,
      zIndex: 1,
      opacity: 0.97,
      '&::before': {
        content: '""',
        position: 'absolute' as const,
        inset: 0,
        zIndex: -1,
        backgroundColor: alpha(darken(baseBackground, theme.palette.mode === 'dark' ? 0.05 : 0.01), 0.97),
        boxShadow:
          position === 'start' && column.getIsLastColumn('start')
            ? `-4px 0 4px -4px ${alpha(theme.palette.grey[700], 0.5)} inset`
            : position === 'end' && column.getIsFirstColumn('end')
              ? `4px 0 4px -4px ${alpha(theme.palette.grey[700], 0.5)} inset`
              : undefined,
      },
      ...(position === 'start'
        ? { insetInlineStart: column.getStart('start') }
        : { insetInlineEnd: column.getAfter('end') }),
    }),
  };
};

const UnsortedIcon = (props: React.ComponentProps<typeof SyncAlt>) => (
  <SyncAlt {...props} style={{ ...props.style, transform: 'rotate(-90deg) scaleX(0.9) translateX(-1px)' }} />
);

const ColumnActionMenuItemV2 = ({
  icon,
  children,
  ...props
}: React.ComponentProps<typeof MenuItem> & { icon: ReactNode }) => (
  <MenuItem sx={{ minWidth: '120px', my: 0, py: '6px' }} {...props}>
    <Box display='flex' alignItems='center'>
      <ListItemIcon>{icon}</ListItemIcon>
      {children}
    </Box>
  </MenuItem>
);

const ColumnFilter = <TData extends object>({
  column,
  definition,
}: {
  column: Column<typeof editableTableFeatures, TData>;
  definition: EditableTableColumnV2<TData>;
}) => {
  const strings = useStrings();
  const label = `${strings.TABLE_FILTER}: ${definition.header}`;
  const placeholder = strings.TABLE_FILTER_BY.replace('{column}', definition.header);
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
            placeholder={index === 0 ? strings.TABLE_MIN : strings.TABLE_MAX}
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
      variant='standard'
      placeholder={placeholder}
      sx={{ minWidth: 120, mx: '-2px', p: 0, width: 'calc(100% + 4px)' }}
      select={select}
      value={value ?? (multiple ? [] : '')}
      onChange={(event) => column.setFilterValue(event.target.value || undefined)}
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
                aria-label={`${strings.TABLE_CLEAR_FILTER}: ${definition.header}`}
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
  enableColumnDragging = false,
  enableColumnActions = true,
  showColumnsButton = false,
  showGlobalFilterButton = false,
  showColumnFiltersButton = false,
  showDensityButton = false,
  showFullScreenButton = false,
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
  const [editingCell, setEditingCell] = useState<{ id: string } | null>(null);
  const [globalFilterVisible, setGlobalFilterVisible] = useState(true);
  const [columnFiltersVisible, setColumnFiltersVisible] = useState(!showColumnFiltersButton);
  const [density, setDensity] = useState(1);
  const [fullScreen, setFullScreen] = useState(false);
  const [menuColumnId, setMenuColumnId] = useState<string | null>(null);
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
    sortDescFirst: false,
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
  const hideableColumns = table.getAllLeafColumns().filter((column) => column.getCanHide());
  const filtersVisible = enableColumnFilters && columnFiltersVisible;

  useEffect(() => {
    if (!fullScreen) {
      return;
    }
    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === 'Escape') {
        setFullScreen(false);
      }
    };
    const overflow = document.body.style.overflow;
    document.body.style.overflow = 'hidden';
    document.addEventListener('keydown', onKeyDown);
    return () => {
      document.body.style.overflow = overflow;
      document.removeEventListener('keydown', onKeyDown);
    };
  }, [fullScreen]);

  const moveColumn = (id: string, offset: number) => {
    const order = table.getAllLeafColumns().map((column) => column.id);
    const index = order.indexOf(id);
    const target = index + offset;
    if (target >= 0 && target < order.length) {
      [order[index], order[target]] = [order[target], order[index]];
      table.setColumnOrder(order);
    }
  };

  const reorderColumns = ({ active, over }: DragEndEvent) => {
    if (!over || active.id === over.id) {
      return;
    }
    const source = table.getAllLeafColumns().find((column) => column.id === active.id);
    const target = table.getAllLeafColumns().find((column) => column.id === over.id);
    if (!source || !target || source.getIsPinned() !== target.getIsPinned()) {
      return;
    }
    const pin = source.getIsPinned();
    const order = table.getAllLeafColumns().map((column) => column.id);
    table.setColumnOrder(arrayMove(order, order.indexOf(source.id), order.indexOf(target.id)));
    if (pin) {
      table.setColumnPinning((previous) => {
        const group = previous[pin] ?? [];
        return { ...previous, [pin]: arrayMove(group, group.indexOf(source.id), group.indexOf(target.id)) };
      });
    }
  };

  return (
    <Box
      minHeight='160px'
      padding={2}
      sx={[
        ...(Array.isArray(sx) ? sx : [sx]),
        ...(showDensityButton ? [{ '& td': { py: density === 0 ? '4px' : density === 1 ? '16px' : '24px' } }] : []),
        ...(fullScreen
          ? [{ position: 'fixed', inset: 0, m: 0, p: 0, zIndex: 1200, bgcolor: 'background.paper', overflow: 'auto' }]
          : []),
      ]}
    >
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
            {enableGlobalFilter && globalFilterVisible && (
              <TextField
                placeholder={strings.TABLE_SEARCH}
                size='small'
                slotProps={{
                  htmlInput: { 'aria-label': strings.TABLE_SEARCH },
                  input: {
                    startAdornment: <Search sx={{ mr: '4px' }} />,
                    endAdornment: (
                      <InputAdornment position='end'>
                        <IconButton
                          size='small'
                          aria-label={strings.TABLE_CLEAR_SEARCH}
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
            <Box display='flex' alignItems='center'>
              {renderToolbarInternalActions?.({ table })}
              {showGlobalFilterButton && enableGlobalFilter && (
                <Tooltip title={strings.TABLE_TOGGLE_SEARCH}>
                  <IconButton
                    aria-label={strings.TABLE_TOGGLE_SEARCH}
                    aria-pressed={globalFilterVisible}
                    onClick={() => setGlobalFilterVisible((visible) => !visible)}
                  >
                    {globalFilterVisible ? <SearchOff /> : <Search />}
                  </IconButton>
                </Tooltip>
              )}
              {showColumnFiltersButton && enableColumnFilters && (
                <Tooltip title={strings.TABLE_TOGGLE_FILTERS}>
                  <IconButton
                    aria-label={strings.TABLE_TOGGLE_FILTERS}
                    aria-pressed={columnFiltersVisible}
                    onClick={() => setColumnFiltersVisible((visible) => !visible)}
                  >
                    {columnFiltersVisible ? <FilterListOff /> : <FilterList />}
                  </IconButton>
                </Tooltip>
              )}
              {showColumnsButton && controlsEnabled && (
                <IconButton
                  aria-label={strings.TABLE_COLUMNS}
                  onClick={(event) => {
                    setMenuColumnId(null);
                    setMenuAnchor(event.currentTarget);
                  }}
                >
                  <ViewColumn />
                </IconButton>
              )}
              {showDensityButton && (
                <Tooltip title={strings.TABLE_TOGGLE_DENSITY}>
                  <IconButton
                    aria-label={strings.TABLE_TOGGLE_DENSITY}
                    onClick={() => setDensity((value) => (value + 2) % 3)}
                  >
                    {density === 0 ? <DensitySmall /> : density === 1 ? <DensityMedium /> : <DensityLarge />}
                  </IconButton>
                </Tooltip>
              )}
              {showFullScreenButton && (
                <Tooltip title={strings.TABLE_TOGGLE_FULLSCREEN}>
                  <IconButton
                    aria-label={strings.TABLE_TOGGLE_FULLSCREEN}
                    aria-pressed={fullScreen}
                    onClick={() => setFullScreen((value) => !value)}
                  >
                    {fullScreen ? <FullscreenExit /> : <Fullscreen />}
                  </IconButton>
                </Tooltip>
              )}
            </Box>
          </Toolbar>
        )}
        <ColumnDragMenu
          ids={table.getAllLeafColumns().map((column) => column.id)}
          onDragEnd={reorderColumns}
          anchorEl={menuAnchor}
          open={!!menuAnchor}
          onClose={() => setMenuAnchor(null)}
        >
          {menuColumnId &&
            table.getColumn(menuColumnId)?.getCanSort() &&
            [
              {
                label: strings.TABLE_CLEAR_SORTING,
                icon: <ClearAll />,
                disabled: !table.getColumn(menuColumnId)?.getIsSorted(),
                action: () => table.getColumn(menuColumnId)?.clearSorting(),
              },
              {
                label: strings.TABLE_SORT_ASCENDING.replace('{column}', definitions.get(menuColumnId)!.header),
                icon: <Sort sx={{ transform: 'rotate(180deg) scaleX(-1)' }} />,
                disabled: table.getColumn(menuColumnId)?.getIsSorted() === 'asc',
                action: () => table.getColumn(menuColumnId)?.toggleSorting(false),
              },
              {
                label: strings.TABLE_SORT_DESCENDING.replace('{column}', definitions.get(menuColumnId)!.header),
                icon: <Sort />,
                disabled: table.getColumn(menuColumnId)?.getIsSorted() === 'desc',
                divider: enableColumnFilters || controlsEnabled,
                action: () => table.getColumn(menuColumnId)?.toggleSorting(true),
              },
            ].map(({ label, icon, disabled, divider, action }) => (
              <ColumnActionMenuItemV2
                key={label}
                icon={icon}
                disabled={disabled}
                divider={divider}
                onClick={() => {
                  action();
                  setMenuAnchor(null);
                }}
              >
                {label}
              </ColumnActionMenuItemV2>
            ))}
          {menuColumnId && table.getColumn(menuColumnId)?.getCanFilter() && (
            <ColumnActionMenuItemV2
              icon={<FilterListOff />}
              disabled={!table.getColumn(menuColumnId)?.getIsFiltered()}
              onClick={() => {
                table.getColumn(menuColumnId)?.setFilterValue(undefined);
                setMenuAnchor(null);
              }}
            >
              {strings.TABLE_CLEAR_FILTER}
            </ColumnActionMenuItemV2>
          )}
          {menuColumnId && table.getColumn(menuColumnId)?.getCanFilter() && (
            <ColumnActionMenuItemV2 icon={<FilterList />} disabled divider={controlsEnabled}>
              {strings.TABLE_FILTER_BY.replace('{column}', definitions.get(menuColumnId)!.header)}
            </ColumnActionMenuItemV2>
          )}
          {menuColumnId &&
            enableColumnPinning &&
            (
              [
                { label: strings.TABLE_PIN_START, direction: 'start', rotation: '90deg' },
                { label: strings.TABLE_PIN_END, direction: 'end', rotation: '-90deg' },
                { label: strings.TABLE_UNPIN, direction: false, rotation: '0deg' },
              ] as const
            ).map(({ label, direction, rotation }) => (
              <ColumnActionMenuItemV2
                key={label}
                icon={<PushPin sx={{ transform: `rotate(${rotation})` }} />}
                disabled={
                  !table.getColumn(menuColumnId)?.getCanPin() ||
                  table.getColumn(menuColumnId)?.getIsPinned() === direction
                }
                divider={direction === false && enableHiding}
                onClick={() => {
                  table.getColumn(menuColumnId)?.pin(direction);
                  setMenuAnchor(null);
                }}
              >
                {label}
              </ColumnActionMenuItemV2>
            ))}
          {menuColumnId && enableHiding && (
            <ColumnActionMenuItemV2
              icon={<VisibilityOff />}
              disabled={
                !table.getColumn(menuColumnId)?.getCanHide() ||
                (!(enableTopToolbar && showColumnsButton) && orderedColumns.length === 1)
              }
              onClick={() => {
                table.getColumn(menuColumnId)?.toggleVisibility(false);
                setMenuAnchor(null);
              }}
            >
              {strings.TABLE_HIDE_COLUMN.replace('{column}', definitions.get(menuColumnId)!.header)}
            </ColumnActionMenuItemV2>
          )}
          {menuColumnId && enableHiding && (
            <ColumnActionMenuItemV2
              icon={<ViewColumn />}
              disabled={table.getAllLeafColumns().every((column) => column.getIsVisible() || !column.getCanHide())}
              onClick={() => {
                table
                  .getAllLeafColumns()
                  .filter((column) => column.getCanHide())
                  .forEach((column) => column.toggleVisibility(true));
                setMenuAnchor(null);
              }}
            >
              {strings.TABLE_SHOW_ALL_COLUMNS}
            </ColumnActionMenuItemV2>
          )}
          {!menuColumnId && enableHiding && (
            <Box display='flex' justifyContent='space-between' px={1} pb={1}>
              <MuiButton
                disabled={!hideableColumns.some((column) => column.getIsVisible())}
                onClick={() => hideableColumns.forEach((column) => column.toggleVisibility(false))}
              >
                {strings.TABLE_HIDE_ALL}
              </MuiButton>
              <MuiButton
                disabled={hideableColumns.every((column) => column.getIsVisible())}
                onClick={() => hideableColumns.forEach((column) => column.toggleVisibility(true))}
              >
                {strings.TABLE_SHOW_ALL}
              </MuiButton>
            </Box>
          )}
          {!menuColumnId && controlsEnabled && <Divider />}
          {table.getAllLeafColumns().map(
            (column, index, allColumns) =>
              !menuColumnId &&
              controlsEnabled && (
                <DraggableColumnItem
                  key={column.id}
                  id={column.id}
                  label={definitions.get(column.id)!.header}
                  enabled={enableColumnOrdering}
                  disableRipple
                  sx={{ my: 0, py: '6px', pl: '16px' }}
                >
                  <ColumnDragHandle />
                  <FormControlLabel
                    label={definitions.get(column.id)?.header}
                    slotProps={{ typography: { sx: { mb: 0 } } }}
                    control={
                      <Switch
                        checked={column.getIsVisible()}
                        disabled={
                          !enableHiding ||
                          !column.getCanHide() ||
                          (!(enableTopToolbar && showColumnsButton) &&
                            column.getIsVisible() &&
                            orderedColumns.length === 1)
                        }
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
                </DraggableColumnItem>
              )
          )}
        </ColumnDragMenu>
        <ColumnDragTableContainer
          {...containerProps}
          ids={orderedColumns.map((column) => column.id)}
          onDragEnd={reorderColumns}
        >
          <Table sx={{ minWidth: table.getTotalSize() }}>
            <TableHead>
              <TableRow>
                {orderedColumns.map((column) => {
                  const header = (
                    <>
                      {definitions.get(column.id)?.header}
                      {column.getIsFiltered() && (
                        <Tooltip title={`${strings.TABLE_FILTERED}: ${definitions.get(column.id)?.header}`}>
                          <FilterAlt
                            sx={{ color: 'action.active', ml: '4px', width: '18px', height: '18px' }}
                            role='img'
                            aria-label={`${strings.TABLE_FILTERED}: ${definitions.get(column.id)?.header}`}
                            onClick={(event) => event.stopPropagation()}
                          />
                        </Tooltip>
                      )}
                    </>
                  );
                  return (
                    <DraggableColumnHeader
                      key={column.id}
                      id={column.id}
                      label={definitions.get(column.id)!.header}
                      enabled={enableColumnDragging || enableColumnOrdering}
                      sortDirection={column.getIsSorted() || false}
                      sx={(theme) => ({
                        ...pinnedStyles(column, theme),
                        bgcolor: 'background.paper',
                        fontWeight: 'bold',
                        p: 2,
                        pt: '12px',
                        pb: filtersVisible ? '6.4px' : '9.6px',
                        verticalAlign: 'top',
                        '&:hover .MuiIconButton-root': { opacity: 1 },
                      })}
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
                        <ColumnDragHandle />
                        {enableColumnActions && (column.getCanSort() || column.getCanFilter() || controlsEnabled) && (
                          <IconButton
                            size='small'
                            sx={{
                              height: '2rem',
                              width: '2rem',
                              m: '-8px -4px',
                              opacity: 0.3,
                              transition: 'all 150ms',
                            }}
                            aria-label={`${strings.TABLE_COLUMN_ACTIONS}: ${definitions.get(column.id)?.header}`}
                            aria-haspopup='menu'
                            aria-expanded={!!menuAnchor && menuColumnId === column.id}
                            onClick={(event) => {
                              setMenuColumnId(column.id);
                              setMenuAnchor(event.currentTarget);
                            }}
                          >
                            <MoreVert sx={{ transform: 'scale(0.9)' }} />
                          </IconButton>
                        )}
                      </Box>
                      {filtersVisible && column.getCanFilter() && (
                        <ColumnFilter column={column} definition={definitions.get(column.id)!} />
                      )}
                    </DraggableColumnHeader>
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
                          onClick={canEdit ? (event) => event.stopPropagation() : undefined}
                          onDoubleClick={canEdit ? () => setEditingCell({ id: cell.id }) : undefined}
                          onKeyDown={
                            canEdit
                              ? (event) => {
                                  if (event.key === 'Enter' || event.key === 'F2') {
                                    event.preventDefault();
                                    setEditingCell({ id: cell.id });
                                  }
                                }
                              : undefined
                          }
                          sx={(theme) => ({
                            ...pinnedStyles(column, theme),
                            borderBottom: 'none',
                            bgcolor: rowIndex % 2 === 0 ? 'TwClrBaseGray025' : 'background.paper',
                            cursor: canEdit ? 'pointer' : 'inherit',
                            outlineOffset: '-1px',
                            '&:hover': { outline: canEdit ? '1px solid' : undefined, outlineColor: 'grey.500' },
                          })}
                        >
                          {editingCell?.id === cell.id ? (
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
        </ColumnDragTableContainer>
        {enablePagination && enableBottomToolbar && (
          <TablePagination
            component='div'
            sx={(theme) => ({ boxShadow: `0 1px 2px -1px ${alpha(theme.palette.grey[700], 0.5)} inset` })}
            showFirstButton
            showLastButton
            count={table.getRowCount()}
            page={table.state.pagination.pageIndex}
            rowsPerPage={table.state.pagination.pageSize}
            rowsPerPageOptions={Array.from(new Set([table.state.pagination.pageSize, 10, 25, 50, 100])).sort(
              (a, b) => a - b
            )}
            labelRowsPerPage={strings.TABLE_ROWS_PER_PAGE}
            labelDisplayedRows={({ from, to, count }) => `${from}–${to} / ${count}`}
            getItemAriaLabel={(type) =>
              ({
                first: strings.TABLE_FIRST_PAGE,
                last: strings.TABLE_LAST_PAGE,
                next: strings.TABLE_NEXT_PAGE,
                previous: strings.TABLE_PREVIOUS_PAGE,
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
