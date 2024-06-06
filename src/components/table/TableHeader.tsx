import React from 'react';
import { SortableContext } from '@dnd-kit/sortable';
import { Checkbox, TableCell, TableHead, TableRow, useTheme } from '@mui/material';

import { getTableRowHeight } from './density';
import { SortOrder } from './sort';
import { TableColumnType, TableDensityType } from './types';
import TableHeaderItem from './TableHeaderItem';
import { HeadCell } from '.';
import { CheckboxStyle } from '../Checkbox';
import { titleCase } from '../../utils/text';

interface Props {
  onRequestSort: (event: React.MouseEvent<unknown>, property: string) => void;
  order: SortOrder;
  orderBy?: string;
  columns: TableColumnType[];
  onReorderEnd?: ({ oldIndex, newIndex }: any) => void;
  numSelected?: number;
  rowCount?: number;
  onSelectAllClick?: (event: React.ChangeEvent<HTMLInputElement>) => void;
  density?: TableDensityType;
}

export default function EnhancedTableHead(props: Props): JSX.Element {
  const theme = useTheme();
  const { order, orderBy, onRequestSort, numSelected, rowCount, onSelectAllClick, density = 'comfortable' } = props;

  const headerCellStyles = {
    '&.MuiTableCell-root': {
      borderBottom: `2px solid ${theme.palette.TwClrBrdrSecondary}`,
    },
    paddingTop: '0px',
    paddingBottom: '0px',
  };

  React.useEffect(() => {
    setHeadCells(columnsToHeadCells(props.columns));
  }, [props.columns]);

  function columnsToHeadCells(columns: TableColumnType[]): HeadCell[] {
    return columns.map((c) => ({
      id: c.key,
      disablePadding: true,
      className: c.className,
      label: typeof c.name === 'string' && c.name.length > 0 ? titleCase(c.name) : c.name,
      tooltipTitle: c.tooltipTitle,
      alignment: c.alignment,
      sx: [headerCellStyles, ...(Array.isArray(c.sx) ? c.sx : [c.sx])],
    }));
  }
  const [headCells, setHeadCells] = React.useState<HeadCell[]>(columnsToHeadCells(props.columns));

  return (
    <TableHead>
      <TableRow id='table-header' sx={{ height: getTableRowHeight(density) }}>
        {numSelected !== undefined && rowCount !== undefined && rowCount > 0 && onSelectAllClick && (
          <TableCell padding='checkbox' sx={headerCellStyles}>
            <Checkbox
              disableRipple={true}
              sx={CheckboxStyle(theme)}
              color='primary'
              indeterminate={numSelected > 0 && numSelected < rowCount}
              checked={rowCount > 0 && numSelected === rowCount}
              onChange={onSelectAllClick}
            />
          </TableCell>
        )}
        <SortableContext items={headCells}>
          {headCells.map((headCell, i) => {
            return (
              <TableHeaderItem
                headCell={headCell}
                order={order}
                orderBy={orderBy}
                onRequestSort={onRequestSort}
                i={i}
                key={i}
              />
            );
          })}
        </SortableContext>
      </TableRow>
    </TableHead>
  );
}
