import React, { type JSX, useCallback, useEffect, useMemo, useState } from 'react';

import { Box, MenuItem, SxProps, TextField, useTheme } from '@mui/material';
import {
  MaterialReactTable as MRTTable,
  MRT_Cell,
  MRT_Column,
  MRT_ColumnDef,
  MRT_ColumnFiltersState,
  MRT_Row,
  MRT_TableInstance,
  MRT_TableOptions,
  useMaterialReactTable,
} from 'material-react-table';

export type ColumnEditConfig<TData extends Record<string, any>> = {
  /** Function to call when a cell value is saved (on blur) */
  onSave?: (row: TData, value: any, columnId: string) => void | Promise<void>;
  /** Edit variant: 'text' (default), 'select', or 'custom' */
  editVariant?: 'text' | 'select' | 'custom';
  /** Options for select variant */
  selectOptions?: { label: string; value: string | number }[];
  /** Custom edit component */
  customEditComponent?: (props: {
    cell: MRT_Cell<TData>;
    row: MRT_Row<TData>;
    column: MRT_Column<TData>;
    table: MRT_TableInstance<TData>;
  }) => JSX.Element;
};

export type EditableTableColumn<TData extends Record<string, any>> = {
  id: string;
  /** Column header text */
  header: string;
  /** Key to access data in row object */
  accessorKey?: keyof TData;
  /** Custom accessor function for computed values */
  accessorFn?: (row: TData) => any;
  /** Width of the column in pixels */
  size?: number;
  /** Whether the column is editable. Can be a boolean or a function that receives the row and returns a boolean */
  enableEditing?: boolean | ((row: MRT_Row<TData>) => boolean);
  /** Whether the column can be hidden */
  enableHiding?: boolean;
  /** Edit configuration for this column */
  editConfig?: ColumnEditConfig<TData>;
  /** Custom cell renderer */
  Cell?: (props: { cell: MRT_Cell<TData>; row: MRT_Row<TData> }) => JSX.Element | null;
  /** Filter variant: 'text', 'select', 'multi-select', 'range', 'date-range' */
  filterVariant?: 'text' | 'select' | 'multi-select' | 'range' | 'date-range';
  /** Options for select/multi-select filters */
  filterSelectOptions?: string[];
  /** Custom filter function */
  filterFn?: 'fuzzy' | 'between' | 'arrIncludesSome' | ((row: TData, columnId: string, filterValue: any) => boolean);
};

export type EditableTableProps<TData extends Record<string, any>> = {
  /** Array of column definitions */
  columns: EditableTableColumn<TData>[];
  /** Array of data rows */
  data: TData[];
  /** Whether to enable editing (default: false) */
  enableEditing?: boolean;
  /** Whether to enable column ordering (default: false) */
  enableColumnOrdering?: boolean;
  /** Whether to enable column pinning (default: false) */
  enableColumnPinning?: boolean;
  /** Whether to enable sorting (default: true) */
  enableSorting?: boolean;
  /** Whether to enable global filter/search (default: false) */
  enableGlobalFilter?: boolean;
  /** Whether to enable column filters (default: false) */
  enableColumnFilters?: boolean;
  /** Whether to persist column filters in localStorage (default: false) */
  stickyFilters?: boolean;
  /** Unique storage key for persisting filters (required if stickyFilters is true) */
  storageKey?: string;
  /** Whether to enable pagination (default: true) */
  enablePagination?: boolean;
  /** Whether to show the bottom toolbar (default: true) */
  enableBottomToolbar?: boolean;
  /** Whether to show the top toolbar (default: true) */
  enableTopToolbar?: boolean;
  initialSorting?: { id: string; desc: boolean }[];
  /** Callback when a row is clicked */
  onRowClick?: (row: TData) => void;
  /** Custom toolbar actions */
  renderToolbarInternalActions?: (props: { table: MRT_TableInstance<TData> }) => JSX.Element;
  sx?: SxProps;
  /** Additional MRT table options to override defaults */
  tableOptions?: Partial<MRT_TableOptions<TData>>;
};

export default function EditableTable<TData extends Record<string, any>>({
  columns,
  data,
  enableEditing = false,
  enableColumnOrdering = false,
  enableColumnPinning = false,
  enableSorting = true,
  enableGlobalFilter = false,
  enableColumnFilters = false,
  stickyFilters = false,
  storageKey,
  enablePagination = true,
  enableBottomToolbar = true,
  enableTopToolbar = true,
  initialSorting,
  onRowClick,
  renderToolbarInternalActions,
  sx,
  tableOptions = {},
}: EditableTableProps<TData>): JSX.Element {
  const theme = useTheme();

  // Sticky column filters - load from localStorage (only if stickyFilters is enabled)
  const [columnFilters, setColumnFilters] = useState<MRT_ColumnFiltersState>(() => {
    if (!stickyFilters || !storageKey) {
      return [];
    }

    try {
      const saved = localStorage.getItem(`${storageKey}_columnFilters`);
      if (saved) {
        const parsed = JSON.parse(saved);

        // Filter out any filters with null or empty values
        return parsed.filter((filter: any) => {
          if (!filter.value) {
            return false;
          }
          // For range filters (arrays), check if at least one value exists
          if (Array.isArray(filter.value)) {
            return filter.value.some((v: any) => v !== null && v !== undefined && v !== '');
          }

          return filter.value !== null && filter.value !== undefined && filter.value !== '';
        });
      }

      return [];
    } catch (error) {
      console.error('Error loading column filters:', error);

      return [];
    }
  });

  // Save column filters to localStorage when they change
  useEffect(() => {
    if (!stickyFilters || !storageKey) {
      return;
    }

    try {
      // Filter out any filters with null or empty values before saving
      const validFilters = columnFilters.filter((filter) => {
        if (!filter.value) {
          return false;
        }
        // For range filters (arrays), check if at least one value exists
        if (Array.isArray(filter.value)) {
          return filter.value.some((v) => v !== null && v !== undefined && v !== '');
        }

        return filter.value !== null && filter.value !== undefined && filter.value !== '';
      });
      localStorage.setItem(`${storageKey}_columnFilters`, JSON.stringify(validFilters));
    } catch (error) {
      console.error('Error saving column filters:', error);
    }
  }, [columnFilters, stickyFilters, storageKey]);

  // Convert simplified column definitions to MRT column definitions
  const mrtColumns = useMemo<MRT_ColumnDef<TData>[]>(() => {
    return columns.map((col) => {
      const mrtCol: MRT_ColumnDef<TData> = {
        id: col.id,
        header: col.header,
        accessorKey: col.accessorKey as string,
        accessorFn: col.accessorFn,
        size: col.size,
        enableEditing: col.enableEditing ?? enableEditing,
        enableHiding: col.enableHiding ?? true,
        Cell: col.Cell,
        filterVariant: col.filterVariant,
        filterSelectOptions: col.filterSelectOptions,
        filterFn: col.filterFn as any,
        enableColumnFilter: col.filterVariant !== undefined,
      };

      // Handle edit configuration
      if (col.editConfig) {
        const { editVariant = 'text', selectOptions, customEditComponent, onSave } = col.editConfig;

        if (editVariant === 'custom' && customEditComponent) {
          mrtCol.Edit = customEditComponent;
        } else if (editVariant === 'select' && selectOptions) {
          mrtCol.editVariant = 'select';
          mrtCol.editSelectOptions = selectOptions;
          const SelectEditComponent = ({
            cell,
            row,
            table: iTable,
          }: {
            cell: MRT_Cell<TData>;
            row: MRT_Row<TData>;
            table: MRT_TableInstance<TData>;
          }) => {
            const [value, setValue] = React.useState(cell.getValue() || '');

            const handleSave = useCallback(() => {
              if (onSave) {
                void onSave(row.original, value, col.id);
              }
              iTable.setEditingCell(null);
            }, [value]);

            return (
              <TextField
                select
                value={value}
                onChange={(e) => setValue(e.target.value)}
                onBlur={handleSave}
                onKeyDown={(e) => {
                  if (e.key === 'Enter') {
                    handleSave();
                  } else if (e.key === 'Escape') {
                    iTable.setEditingCell(null);
                  }
                }}
                size='small'
                fullWidth
              >
                {selectOptions.map((option) => (
                  <MenuItem key={option.value} value={option.value}>
                    {option.label}
                  </MenuItem>
                ))}
              </TextField>
            );
          };
          mrtCol.Edit = SelectEditComponent;
        } else {
          // Default text input with onBlur save
          mrtCol.muiEditTextFieldProps = ({ row }: { row: MRT_Row<TData> }) => ({
            onBlur: (event: React.FocusEvent<HTMLInputElement>) => {
              if (onSave) {
                const value = event.target.value;
                // eslint-disable-next-line react/prop-types
                void onSave(row.original, value, col.id);
              }
            },
          });
        }
      }

      return mrtCol;
    });
  }, [columns, enableEditing]);

  const initialStateConfig = {
    ...(initialSorting ? { sorting: initialSorting } : {}),
    ...(enableColumnFilters ? { showColumnFilters: true } : {}),
    ...(enableGlobalFilter ? { showGlobalFilter: true } : {}),
  };

  const table = useMaterialReactTable({
    columns: mrtColumns,
    data,
    editDisplayMode: 'cell',
    enableColumnOrdering,
    enableColumnPinning,
    enableEditing,
    enableSorting,
    enableGlobalFilter,
    enableColumnFilters,
    enableFilters: enableColumnFilters || enableGlobalFilter,
    enablePagination,
    enableBottomToolbar: enablePagination ? enableBottomToolbar : false,
    enableTopToolbar,
    positionGlobalFilter: enableGlobalFilter ? 'left' : undefined,
    ...(Object.keys(initialStateConfig).length > 0 ? { initialState: initialStateConfig } : {}),
    renderToolbarInternalActions,
    muiTableBodyProps: {
      sx: {
        '& tr:nth-of-type(odd) > td': {
          backgroundColor: theme.palette.TwClrBaseGray025 || theme.palette.grey[50],
        },
      },
    },
    muiTablePaperProps: {
      elevation: 0,
    },
    muiTableBodyRowProps: ({ row }) => ({
      // eslint-disable-next-line react/prop-types
      onClick: onRowClick ? () => onRowClick(row.original) : undefined,
      sx: {
        cursor: onRowClick ? 'pointer' : 'default',
        '& td': {
          borderBottom: 'none',
        },
      },
    }),
    // Merge any additional table options
    ...tableOptions,
    // Add sticky filters state if enabled
    ...(stickyFilters && storageKey
      ? {
          state: {
            ...tableOptions?.state,
            columnFilters,
          },
          onColumnFiltersChange: setColumnFilters,
        }
      : {}),
  });

  return (
    <Box minHeight='160px' padding={2} sx={sx}>
      <MRTTable table={table} />
    </Box>
  );
}
