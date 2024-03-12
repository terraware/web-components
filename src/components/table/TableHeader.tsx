import { Checkbox, TableCell, TableHead, TableRow, Theme, useTheme } from '@mui/material';
import React from 'react';
import { SortOrder } from './sort';
import { TableColumnType } from './types';
import { SortableContext } from '@dnd-kit/sortable';
import TableHeaderItem from './TableHeaderItem';
import { HeadCell } from '.';
import { makeStyles } from '@mui/styles';
import { CheckboxStyle } from '../Checkbox';
import { titleCase } from '../../utils/text';

const useStyles = makeStyles((theme: Theme) => ({
  headerCell: {
    '&.MuiTableCell-root': {
      borderBottom: `2px solid ${theme.palette.TwClrBrdrSecondary}`,
    },
  },
}));

interface Props {
  onRequestSort: (event: React.MouseEvent<unknown>, property: string) => void;
  order: SortOrder;
  orderBy?: string;
  columns: TableColumnType[];
  onReorderEnd?: ({ oldIndex, newIndex }: any) => void;
  numSelected?: number;
  rowCount?: number;
  onSelectAllClick?: (event: React.ChangeEvent<HTMLInputElement>) => void;
}

export default function EnhancedTableHead(props: Props): JSX.Element {
  const classes = useStyles();
  const theme = useTheme();
  const { order, orderBy, onRequestSort, numSelected, rowCount, onSelectAllClick } = props;
  const [headCells, setHeadCells] = React.useState<HeadCell[]>(columnsToHeadCells(props.columns));
  React.useEffect(() => {
    setHeadCells(columnsToHeadCells(props.columns));
  }, [props.columns]);

  function columnsToHeadCells(columns: TableColumnType[]): HeadCell[] {
    return columns.map((c) => ({
      id: c.key,
      disablePadding: false,
      className: `${classes.headerCell} ${c.className}`,
      label: typeof c.name === 'string' && c.name.length > 0 ? titleCase(c.name) : c.name,
      tooltipTitle: c.tooltipTitle,
    }));
  }

  return (
    <TableHead>
      <TableRow id='table-header'>
        {numSelected !== undefined && rowCount !== undefined && rowCount > 0 && onSelectAllClick && (
          <TableCell padding='checkbox' className={classes.headerCell}>
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
