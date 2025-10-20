import React, { useCallback, useEffect, useMemo, useState } from 'react';

import { DndContext, KeyboardSensor, MouseSensor, TouchSensor, useSensor, useSensors } from '@dnd-kit/core';
import { sortableKeyboardCoordinates } from '@dnd-kit/sortable';
import {
  Box,
  Checkbox,
  Pagination,
  SxProps,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableRow,
  TooltipProps,
  Typography,
  useTheme,
} from '@mui/material';

import { useDeviceInfo } from '../../utils';
import { CheckboxStyle } from '../Checkbox';
import { IconName } from '../Icon/icons';
import EnhancedTableToolbarV2 from './EnhancedTableToolbarV2';
import TableCellRenderer, { TableRowType } from './TableCellRenderer';
import TableHeader from './TableHeader';
import { getTableCellPaddingY, getTableRowHeight } from './density';
import { SortOrder, descendingComparator, getComparator, stableSort } from './sort';
import { DatabaseColumn, DetailsRendererProps, RendererProps, TableColumnType, TableDensityType } from './types';

export type TextAlignment = 'right' | 'left';

export interface HeadCell {
  disablePadding: boolean;
  id: string;
  label: string | JSX.Element;
  tooltipTitle?: TooltipProps['title'];
  alignment?: TextAlignment;
  className?: string;
  sx?: SxProps;
}

export interface LocalizationProps {
  renderNumSelectedText?: (numSelected: number) => string;
  renderPaginationText?: (from: number, to: number, total: number) => string;
  booleanFalseText: string;
  booleanTrueText: string;
  editText: string;
}

// Only the text related props need to be passed in by the implementer, and extra data is passed to the caller
export type EnhancedTopBarSelectionProps = {
  renderEnhancedNumSelectedText?: (selectedCount: number, pagesCount: number) => string;
  renderSelectAllText?: (rowsCount: number) => string;
  renderSelectNoneText?: () => string;
};

export interface Props<T> extends LocalizationProps {
  id?: string;
  orderBy: string;
  order?: SortOrder;
  columns: TableColumnType[];
  rows: T[];
  Renderer?: (props: RendererProps<T>) => JSX.Element;
  // onSelect function will be called automatically when selecting a row. If controlledOnSelect is set to true,
  // this function can be called from the renderer using the onRowClick function and can receive
  // an optional "newValue" parameter from that call
  onSelect?: (value: T, fromColumn?: string, newValue?: string) => void;
  onPageChange?: (newPage: number) => void;
  maxItemsPerPage?: number;
  totalRowCount?: number;
  currentPage?: number;
  DetailsRenderer?: (props: DetailsRendererProps) => JSX.Element;
  sortComparator?: (a: T, b: T, orderBy: keyof T, order: SortOrder) => number;
  sortHandler?: (order: SortOrder, orderBy: string) => void;
  isInactive?: (row: T) => boolean;
  isPresorted?: boolean;
  onReorderEnd?: (newOrder: string[]) => void;
  isClickable?: (row: T) => boolean;
  emptyTableMessage?: string;
  showCheckbox?: boolean;
  showTopBar?: boolean;
  topBarButtons?: (TopBarButton | JSX.Element)[];
  selectedRows?: T[];
  setSelectedRows?: React.Dispatch<React.SetStateAction<T[]>>;
  controlledOnSelect?: boolean;
  reloadData?: () => void;
  stickyHeader?: boolean;
  hideHeader?: boolean;
  // Adds "select all rows across all pages" and "clear selection" to the table top bar
  enhancedTopBarSelectionConfig?: EnhancedTopBarSelectionProps;
  density?: TableDensityType;
  tableComments?: string;
}

export type TopBarButton = {
  buttonText?: string;
  buttonType: 'productive' | 'passive' | 'destructive' | undefined;
  onButtonClick: () => void;
  icon?: IconName;
  disabled?: boolean;
  tooltipTitle?: TooltipProps['title'];
};

type IndexObject = {
  oldIndex: number;
  newIndex: number;
};

export const isTopBarButton = (input: unknown): input is TopBarButton => {
  const castInput = input as TopBarButton;

  return !!(castInput.buttonType && castInput.onButtonClick);
};

export default function EnhancedTable<T extends TableRowType>({
  id,
  columns,
  rows,
  order: _order = 'asc',
  orderBy: _orderBy,
  Renderer = TableCellRenderer,
  onSelect,
  onPageChange,
  maxItemsPerPage = 100,
  totalRowCount,
  currentPage,
  DetailsRenderer,
  sortComparator = descendingComparator,
  sortHandler,
  isInactive,
  isPresorted,
  onReorderEnd,
  isClickable,
  emptyTableMessage,
  showCheckbox,
  showTopBar,
  topBarButtons,
  selectedRows,
  setSelectedRows,
  controlledOnSelect,
  reloadData,
  stickyHeader = true,
  hideHeader,
  booleanFalseText,
  booleanTrueText,
  editText,
  renderNumSelectedText,
  renderPaginationText,
  enhancedTopBarSelectionConfig,
  density = 'comfortable',
  tableComments,
}: Props<T>): JSX.Element {
  const theme = useTheme();
  const [order, setOrder] = React.useState<SortOrder>(_order);
  const [orderBy, setOrderBy] = React.useState(_orderBy);
  const [internalPage, setInternalPage] = useState<number>(1);
  const { isMobile } = useDeviceInfo();
  const [displayColumnKeyNames, setDisplayColumnKeyNames] = useState<string[]>();
  const [displayColumnsIndexed, setDisplayColumnsIndexed] = useState<Record<string, DatabaseColumn>>();
  const [displayColumnDetails, setDisplayColumnDetails] = useState<DatabaseColumn[]>();

  useEffect(() => {
    const columnsKeyNames = columns.map((col) => col.key);
    const columnsIndexed = columns.reduce((acum, value) => {
      acum[value.key] = value;

      return acum;
    }, {} as Record<string, DatabaseColumn>);

    setDisplayColumnKeyNames(columnsKeyNames);
    setDisplayColumnsIndexed(columnsIndexed);
  }, [columns]);

  useEffect(() => {
    if (displayColumnKeyNames && displayColumnsIndexed) {
      const columnsDetails = displayColumnKeyNames.map((key) => ({ ...displayColumnsIndexed[key] }));

      setDisplayColumnDetails(columnsDetails);
    }
  }, [displayColumnKeyNames, displayColumnsIndexed]);

  useEffect(() => {
    if (setSelectedRows && rows.length >= 0) {
      setSelectedRows((currentlySelectedRows: T[]) => {
        const emptyArray: T[] = [];
        if (rows.length || currentlySelectedRows.length > rows.length) {
          return emptyArray;
        }

        return currentlySelectedRows;
      });
    }
  }, [rows, setSelectedRows]);

  const handleChangePage = useCallback(
    (event: unknown, newPage: number) => {
      onPageChange?.(newPage);
      if (currentPage === undefined) {
        setInternalPage(newPage);
      }
    },
    [onPageChange, currentPage]
  );

  useEffect(() => {
    // this is not most elegant but we want to do this if table was sorted by some column in a presorted table
    // but we don't know when the data changes, hence this useEffect on the data size
    if (isPresorted && onPageChange === undefined) {
      // we want to set page back to 1 if the data changes on presorted lists,
      // this is because the data was reset due to some sort behavior refetching new data
      handleChangePage({}, 1);
    }
  }, [handleChangePage, isPresorted, onPageChange, rows]);

  const handleRequestSort = (event: React.MouseEvent<unknown>, property: string) => {
    const isAsc = orderBy === property && order === 'asc';
    const newOrder = isAsc ? 'desc' : 'asc';
    setOrder(newOrder);
    setOrderBy(property);

    if (sortHandler) {
      sortHandler(newOrder, property);
    }
  };

  const hasEditColumn = columns.filter((c) => c.type === 'edit').length > 0;

  const isSelected = (row: T) => {
    return selectedRows && selectedRows.indexOf(row) !== -1;
  };

  const handleSelectAllClick = (event: React.ChangeEvent<HTMLInputElement>) => {
    if (setSelectedRows) {
      if (event.target.checked) {
        setSelectedRows(rows);

        return;
      } else {
        setSelectedRows([]);
      }
    }
  };

  const handleClick = (event: React.MouseEvent<unknown>, row: T) => {
    if (setSelectedRows && selectedRows) {
      const selectedIndex = selectedRows.indexOf(row);
      let newSelected: T[] = [];

      if (selectedIndex === -1) {
        newSelected = newSelected.concat(selectedRows, row);
      } else if (selectedIndex === 0) {
        newSelected = newSelected.concat(selectedRows.slice(1));
      } else if (selectedIndex === selectedRows.length - 1) {
        newSelected = newSelected.concat(selectedRows.slice(0, -1));
      } else if (selectedIndex > 0) {
        newSelected = newSelected.concat(selectedRows.slice(0, selectedIndex), selectedRows.slice(selectedIndex + 1));
      }

      setSelectedRows(newSelected);
    }
  };

  const columnsToHeadCells = useCallback(
    (columnsR: TableColumnType[]): HeadCell[] => {
      return columnsR.map((c) => ({
        id: c.key,
        disablePadding: true,
        label: typeof c.name === 'string' ? c.name.toUpperCase() : c.name,
        sx: [{ paddingY: getTableCellPaddingY(density) }, ...(Array.isArray(c.sx) ? c.sx : [c.sx])],
        tooltipTitle: c.tooltipTitle,
      }));
    },
    [density]
  );

  const [headCells, setHeadCells] = React.useState<HeadCell[]>();
  React.useEffect(() => {
    if (displayColumnDetails) {
      setHeadCells(columnsToHeadCells(displayColumnDetails));
    }
  }, [columnsToHeadCells, displayColumnDetails]);

  const sensors = useSensors(
    useSensor(MouseSensor),
    useSensor(TouchSensor),
    useSensor(KeyboardSensor, {
      coordinateGetter: sortableKeyboardCoordinates,
    })
  );

  const onReorderEndHandler = useCallback(
    ({ oldIndex, newIndex }: IndexObject) => {
      if (displayColumnKeyNames) {
        if (newIndex !== 0 && oldIndex !== 0) {
          const newOrder = [...displayColumnKeyNames];
          const moved = newOrder.splice(oldIndex, 1);
          newOrder.splice(newIndex, 0, moved[0]);
          setDisplayColumnKeyNames(newOrder);
          if (onReorderEnd) {
            onReorderEnd(newOrder);
          }
        }
      }
    },
    [displayColumnKeyNames, setDisplayColumnKeyNames, onReorderEnd]
  );

  const handleDragEnd = (event: { active: any; over: any }) => {
    if (headCells) {
      const { active, over } = event;
      if (active && over && active.id !== over.id && onReorderEndHandler) {
        const oldIndex = headCells.findIndex((item) => item.id === active.id);
        const newIndex = headCells.findIndex((item) => item.id === over.id);

        onReorderEndHandler({ oldIndex, newIndex });
      }
    }
  };

  const pageNumber = useMemo(() => currentPage ?? internalPage, [currentPage, internalPage]);

  const sortedPageRows = useMemo(() => {
    if (rows) {
      const itemsToSkip = onPageChange ? 0 : maxItemsPerPage * (pageNumber - 1);

      return (isPresorted ? rows : stableSort(rows, getComparator(order, orderBy, sortComparator))).slice(
        itemsToSkip,
        itemsToSkip + maxItemsPerPage
      );
    } else {
      return [];
    }
  }, [rows, onPageChange, maxItemsPerPage, pageNumber, isPresorted, order, orderBy, sortComparator]);

  /**
   *  Calculate pagination numbers to show.
   *  If the table is empty (rows.length === 0) override calculation and show '0 of 0'
   *  Pagination total is overridden by totalRowCount if provided.
   */
  const paginationTotal = useMemo(() => totalRowCount || rows.length, [rows.length, totalRowCount]);

  const pagesCount = useMemo(() => Math.ceil(paginationTotal / maxItemsPerPage), [maxItemsPerPage, paginationTotal]);

  const minRowNumber = useMemo(() => {
    if (!sortedPageRows.length) {
      return 0;
    }

    return (pageNumber - 1) * maxItemsPerPage + 1;
  }, [pageNumber, maxItemsPerPage, sortedPageRows.length]);

  const maxRowNumber = useMemo(() => {
    if (!sortedPageRows.length) {
      return 0;
    }

    return Math.min(pageNumber * maxItemsPerPage, paginationTotal);
  }, [pageNumber, maxItemsPerPage, paginationTotal, sortedPageRows.length]);

  return (
    <>
      {showTopBar && (
        <EnhancedTableToolbarV2
          selectedRowsCount={selectedRows?.length || 0}
          pagesCount={pagesCount}
          renderNumSelectedText={renderNumSelectedText}
          rowsCount={rows.length}
          topBarButtons={topBarButtons}
          topBarSelectionConfig={
            enhancedTopBarSelectionConfig
              ? {
                  ...enhancedTopBarSelectionConfig,
                  handleSelectAll: () => setSelectedRows && setSelectedRows(rows),
                  handleSelectNone: () => setSelectedRows && setSelectedRows([]),
                }
              : undefined
          }
        />
      )}

      <TableContainer id={id}>
        <DndContext sensors={sensors} onDragEnd={handleDragEnd}>
          <Table
            stickyHeader={stickyHeader}
            aria-labelledby='tableTitle'
            size='medium'
            aria-label='enhanced table'
            sx={{ borderCollapse: 'initial' }}
          >
            {!hideHeader && (
              <TableHeader
                order={order}
                orderBy={orderBy}
                onRequestSort={handleRequestSort}
                columns={displayColumnDetails ?? []}
                onReorderEnd={onReorderEndHandler}
                numSelected={showCheckbox ? selectedRows?.length : undefined}
                onSelectAllClick={showCheckbox ? handleSelectAllClick : undefined}
                rowCount={showCheckbox ? sortedPageRows?.length : undefined}
                density={density}
              />
            )}
            <TableBody>
              {sortedPageRows.length < 1 && emptyTableMessage && (
                <TableRow>
                  <TableCell colSpan={columns.length + 1} align='center'>
                    <p>{emptyTableMessage}</p>
                  </TableCell>
                </TableRow>
              )}
              {sortedPageRows &&
                sortedPageRows.map((row, index) => {
                  const onClick = onSelect && !controlledOnSelect ? () => onSelect(row as T) : undefined;
                  const isItemSelected = isSelected(row as T);

                  return (
                    <React.Fragment key={index}>
                      <TableRow
                        id={`row${index + 1}`}
                        hover={true}
                        onClick={(e) => {
                          e.stopPropagation();
                          if (onClick && !hasEditColumn && (isClickable ? isClickable(row as T) : true)) {
                            onClick();
                          }
                          if (!onClick && !hasEditColumn && (isClickable ? isClickable(row as T) : true)) {
                            handleClick(e, row as T);
                          }
                        }}
                        selected={isItemSelected}
                        aria-checked={isItemSelected}
                        sx={{
                          ...(isInactive && isInactive(row as T) ? { backgroundColor: theme.palette.neutral[50] } : {}),
                          height: getTableRowHeight(density),
                          '&.MuiTableRow-root.Mui-selected': {
                            backgroundColor: theme.palette.TwClrBgSelectedTertiary,
                          },
                          '&:nth-of-type(odd)': {
                            backgroundColor: theme.palette.TwClrBgSecondary,
                          },
                          '&:hover': {
                            backgroundColor: theme.palette.TwClrBgSecondaryHover,
                          },
                        }}
                      >
                        {showCheckbox && (
                          <TableCell
                            padding='checkbox'
                            sx={{
                              '&.MuiTableCell-root': {
                                borderBottom: `1px solid ${theme.palette.TwClrBgSecondary}`,
                              },
                            }}
                          >
                            <Checkbox
                              disableRipple={true}
                              sx={CheckboxStyle(theme)}
                              color='primary'
                              checked={isItemSelected}
                              onClick={(e) =>
                                !isClickable || !isClickable(row as T) ? handleClick(e, row as T) : null
                              }
                            />
                          </TableCell>
                        )}
                        {displayColumnDetails &&
                          displayColumnDetails.map((c) => (
                            <Renderer
                              index={index + 1}
                              key={c.key}
                              row={row as T}
                              column={c}
                              value={row[c.key]}
                              onRowClick={
                                onSelect && controlledOnSelect
                                  ? (newValue?: string) => onSelect(row as T, c.key, newValue)
                                  : onClick
                              }
                              reloadData={reloadData}
                              booleanFalseText={booleanFalseText}
                              booleanTrueText={booleanTrueText}
                              editText={editText}
                              sx={{ paddingY: getTableCellPaddingY(density) }}
                            />
                          ))}
                      </TableRow>
                      {DetailsRenderer && <DetailsRenderer index={index} row={row} />}
                    </React.Fragment>
                  );
                })}
            </TableBody>
          </Table>
        </DndContext>
      </TableContainer>
      {tableComments && (
        <Typography fontWeight={400} fontSize='14px' color={theme.palette.TwClrTxtSecondary} marginTop={2}>
          {tableComments}
        </Typography>
      )}
      {renderPaginationText && (
        <Box display='flex' alignItems='center' justifyContent='flex-end' paddingTop='24px'>
          <Typography paddingRight='24px' fontSize='14px'>
            {renderPaginationText(minRowNumber, maxRowNumber, paginationTotal)}
          </Typography>
          <Pagination
            count={pagesCount}
            page={pageNumber}
            shape='rounded'
            onChange={handleChangePage}
            siblingCount={isMobile ? 0 : 1}
            size={'small'}
          />
        </Box>
      )}
    </>
  );
}

export function tableSort<T>(ignore: boolean, array: T[], comparator: (a: T, b: T) => number): T[] {
  if (ignore) {
    return array;
  }

  return stableSort(array, comparator);
}
