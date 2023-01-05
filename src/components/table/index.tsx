import { Box, Checkbox, Pagination, Table, TableBody, TableCell, TableContainer, TableRow, Theme, TooltipProps, Typography, useTheme } from '@mui/material';
import React, { useCallback, useEffect, useState } from 'react';
import EnhancedTableToolbar from './EnhancedTableToolbar';
import { descendingComparator, getComparator, SortOrder, stableSort } from './sort';
import TableCellRenderer, { TableRowType } from './TableCellRenderer';
import TableHeader from './TableHeader';
import { DatabaseColumn, DetailsRendererProps, RendererProps, TableColumnType } from './types';
import { makeStyles } from '@mui/styles';
import { DndContext, KeyboardSensor, MouseSensor, TouchSensor, useSensor, useSensors } from '@dnd-kit/core';
import { sortableKeyboardCoordinates } from '@dnd-kit/sortable';
import { useDeviceInfo } from '../../utils';
import { IconName } from '../Icon/icons';
import { CheckboxStyle } from '../Checkbox';

const tableStyles = makeStyles((theme: Theme) => ({
  hover: {
    '&:hover': {
      cursor: 'pointer',
      backgroundColor: `${theme.palette.neutral[100]}!important`,
    },
  },
  table: {
    borderCollapse: 'initial',
  },
  inactiveRow: {
    background: theme.palette.neutral[50],
  },
  tableRow: {
    '&.MuiTableRow-root.Mui-selected': {
      backgroundColor: 'initial',
    },
  },
  cellDefault: {
    '&.MuiTableCell-root': {
      borderBottom: `1px solid ${theme.palette.TwClrBrdrSecondary}`,
    },
  },
}));

export interface HeadCell {
  disablePadding: boolean;
  id: string;
  label: string | JSX.Element;
  tooltipTitle?: TooltipProps['title'];
}

export interface Props<T> {
  id?: string;
  orderBy: string;
  order?: SortOrder;
  columns: TableColumnType[];
  rows: T[];
  Renderer?: (props: RendererProps<T>) => JSX.Element;
  // onSelect function will be called automatically when selecting a row. If controlledSelect is set to true,
  // this function can be called from the renderer using the onRowClick function and can receive
  // an optional "newValue" parameter from that call
  onSelect?: (value: T, fromColumn?: string, newValue?: string) => void;
  DetailsRenderer?: (props: DetailsRendererProps) => JSX.Element;
  sortComparator?: (a: T, b: T, orderBy: keyof T) => number;
  sortHandler?: (order: SortOrder, orderBy: string) => void;
  isInactive?: (row: T) => boolean;
  onReorderEnd?: (newOrder: string[]) => void;
  isClickable?: (row: T) => boolean;
  emptyTableMessage?: string;
  showCheckbox?: boolean;
  showTopBar?: boolean;
  topBarButtons?: TopBarButton[];
  selectedRows?: T[];
  setSelectedRows?: React.Dispatch<React.SetStateAction<T[]>>;
  showPagination?: boolean;
  controlledOnSelect?: boolean;
  reloadData?: () => void;
  stickyHeader?: boolean;
  hideHeader?: boolean;
}

export type TopBarButton = {
  buttonText?: string;
  buttonType: 'productive' | 'passive' | 'destructive' | undefined;
  onButtonClick: () => void;
  icon?: IconName;
  disabled?: boolean;
};

export default function EnhancedTable<T extends TableRowType>({
  id,
  columns,
  rows,
  order: _order = 'asc',
  orderBy: _orderBy,
  Renderer = TableCellRenderer,
  onSelect,
  DetailsRenderer,
  sortComparator = descendingComparator,
  sortHandler,
  isInactive,
  onReorderEnd,
  isClickable,
  emptyTableMessage,
  showCheckbox,
  showTopBar,
  topBarButtons,
  selectedRows,
  setSelectedRows,
  showPagination = true,
  controlledOnSelect,
  reloadData,
  stickyHeader = true,
  hideHeader,
}: Props<T>): JSX.Element {
  const classes = tableStyles();
  const theme = useTheme();
  const [order, setOrder] = React.useState<SortOrder>(_order);
  const [orderBy, setOrderBy] = React.useState(_orderBy);
  const [maxItemsPerPage] = useState(100);
  const [itemsToSkip, setItemsToSkip] = useState(0);
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
      const columnsDetails = displayColumnKeyNames.map((key) => {
        const detail = { ...displayColumnsIndexed[key] };

        return detail;
      });

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

  const handleChangePage = (event: unknown, newPage: number) => {
    setItemsToSkip(maxItemsPerPage * (newPage - 1));
  };

  function columnsToHeadCells(columnsR: TableColumnType[]): HeadCell[] {
    return columnsR.map((c) => ({
      id: c.key,
      disablePadding: false,
      label: typeof c.name === 'string' ? c.name.toUpperCase() : c.name,
      tooltipTitle: c.tooltipTitle,
    }));
  }

  const [headCells, setHeadCells] = React.useState<HeadCell[]>();
  React.useEffect(() => {
    if (displayColumnDetails) {
      setHeadCells(columnsToHeadCells(displayColumnDetails));
    }
  }, [displayColumnDetails]);

  const sensors = useSensors(
    useSensor(MouseSensor),
    useSensor(TouchSensor),
    useSensor(KeyboardSensor, {
      coordinateGetter: sortableKeyboardCoordinates,
    })
  );

  const onReorderEndHandler = useCallback(
    ({ oldIndex, newIndex }) => {
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
    [displayColumnKeyNames, setDisplayColumnKeyNames]
  );

  function handleDragEnd(event: { active: any; over: any }) {
    if (headCells) {
      const { active, over } = event;
      if (active && over && active.id !== over.id && onReorderEndHandler) {
        const oldIndex = headCells.findIndex((item) => item.id === active.id);
        const newIndex = headCells.findIndex((item) => item.id === over.id);

        onReorderEndHandler({ oldIndex, newIndex });
      }
    }
  }

  return (
    <>
      {showTopBar && <EnhancedTableToolbar numSelected={selectedRows ? selectedRows.length : 0} topBarButtons={topBarButtons} />}
      <TableContainer id={id} sx={{ overflowX: 'visible' }}>
        <DndContext sensors={sensors} onDragEnd={handleDragEnd}>
          <Table stickyHeader={stickyHeader} aria-labelledby='tableTitle' size='medium' aria-label='enhanced table' className={classes.table}>
            {!hideHeader && (
              <TableHeader
                order={order}
                orderBy={orderBy}
                onRequestSort={handleRequestSort}
                columns={displayColumnDetails ?? []}
                onReorderEnd={onReorderEndHandler}
                numSelected={showCheckbox ? selectedRows?.length : undefined}
                onSelectAllClick={showCheckbox ? handleSelectAllClick : undefined}
                rowCount={showCheckbox ? rows?.length : undefined}
              />
            )}
            <TableBody>
              {rows.length < 1 && emptyTableMessage && (
                <TableRow>
                  <TableCell colSpan={columns.length + 1} align='center'>
                    <p>{emptyTableMessage}</p>
                  </TableCell>
                </TableRow>
              )}
              {rows &&
                stableSort(rows, getComparator(order, orderBy, sortComparator))
                  .slice(itemsToSkip, itemsToSkip + maxItemsPerPage)
                  .map((row, index) => {
                    const onClick = onSelect && !controlledOnSelect ? () => onSelect(row as T) : undefined;
                    const isItemSelected = isSelected(row as T);

                    return (
                      <React.Fragment key={index}>
                        <TableRow
                          id={`row${index + 1}`}
                          classes={{ hover: classes.hover }}
                          hover={Boolean(onSelect) && (isClickable ? isClickable(row as T) : true) && !hasEditColumn}
                          onClick={(e) => {
                            e.stopPropagation();
                            if (onClick && !hasEditColumn && (isClickable ? isClickable(row as T) : true)) {
                              onClick();
                            }
                            if (!onClick && !hasEditColumn && (isClickable ? isClickable(row as T) : true)) {
                              handleClick(e, row as T);
                            }
                          }}
                          className={`${isInactive && isInactive(row as T) ? classes.inactiveRow : undefined} ${classes.tableRow}`}
                          selected={isItemSelected}
                          aria-checked={isItemSelected}
                        >
                          {showCheckbox && (
                            <TableCell padding='checkbox' className={classes.cellDefault}>
                              <Checkbox
                                disableRipple={true}
                                sx={CheckboxStyle(theme)}
                                color='primary'
                                checked={isItemSelected}
                                onClick={(e) => (!isClickable || !isClickable(row as T) ? handleClick(e, row as T) : null)}
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
                                onRowClick={onSelect && controlledOnSelect ? (newValue?: string) => onSelect(row as T, c.key, newValue) : onClick}
                                reloadData={reloadData}
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
      {showPagination && (
        <Box display='flex' alignItems='center' justifyContent='flex-end' paddingTop='24px'>
          {/*
            Calculate pagination numbers to show.
            If the table is empty (rows.length === 0) override calculation and show '0 of 0'
          */}
          {rows.length ? (
            itemsToSkip + maxItemsPerPage < rows.length ? (
              <Typography paddingRight='24px' fontSize='14px'>
                {itemsToSkip + 1} to {itemsToSkip + maxItemsPerPage} of {rows.length}
              </Typography>
            ) : (
              <Typography paddingRight='24px' fontSize='14px'>
                {itemsToSkip + 1} to {rows.length} of {rows.length}
              </Typography>
            )
          ) : (
            <Typography paddingRight='24px' fontSize='14px'>
              0 of 0
            </Typography>
          )}
          <Pagination
            count={Math.ceil(rows.length / maxItemsPerPage)}
            page={itemsToSkip / maxItemsPerPage + 1}
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
