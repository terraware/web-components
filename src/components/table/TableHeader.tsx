import { Checkbox, TableCell, TableHead, TableRow } from '@mui/material';
import { keyframes } from '@mui/system';
import React from 'react';
import { SortOrder } from './sort';
import { TableColumnType } from './types';
import { SortableContext } from '@dnd-kit/sortable';
import TableHeaderItem from './TableHeaderItem';
import { HeadCell } from '.';
import useScrollDebounce from '../../utils/useScrollDebounce';

const HEADER_POSITION_DEBOUNCE = 100;

interface Props {
  onRequestSort: (event: React.MouseEvent<unknown>, property: string) => void;
  order: SortOrder;
  orderBy?: string;
  columns: TableColumnType[];
  onReorderEnd?: ({ oldIndex, newIndex }: any) => void;
  numSelected?: number;
  rowCount?: number;
  onSelectAllClick?: (event: React.ChangeEvent<HTMLInputElement>) => void;
  containerRef?: React.MutableRefObject<HTMLDivElement | null>;
  floatHeader?: boolean;
  additionalOffset?: number;
}

function columnsToHeadCells(columns: TableColumnType[]): HeadCell[] {
  return columns.map((c) => ({
    id: c.key,
    disablePadding: false,
    label: typeof c.name === 'string' ? c.name.toUpperCase() : c.name,
    className: c.className,
    tooltipTitle: c.tooltipTitle,
  }));
}

export default function EnhancedTableHead(props: Props): JSX.Element {
  const {
    order,
    orderBy,
    onRequestSort,
    numSelected,
    rowCount,
    onSelectAllClick,
    containerRef,
    floatHeader,
    additionalOffset
  } = props;
  const [headCells, setHeadCells] = React.useState<HeadCell[]>(columnsToHeadCells(props.columns));
  const [headerOffset, setHeaderOffset] = React.useState<number>(0);
  const [lastHeaderOffset, setLastHeaderOffset] = React.useState<number>(0);
  React.useEffect(() => {
    setHeadCells(columnsToHeadCells(props.columns));
  }, [props.columns]);

  useScrollDebounce((scrollPos) => {
    if (floatHeader && containerRef && containerRef.current !== null) {
      /**
       * - The scroll position is negative when the window is scrolled downward.
       * - The container position is positive when it is below the top of the screen.
       * - If scrolled below the position of the container element, then we want to
       *   offset the header downward so that it remains in view.
       * - Additional offset may be added if, for example, an obstructing element
       *   would conceal the header at the top of the screen.
       */
      const containerPos = containerRef.current.getBoundingClientRect();
      const totalOffset = (additionalOffset || 0) - containerPos.y;
      if (scrollPos.y < totalOffset) {
        setLastHeaderOffset(headerOffset);
        setHeaderOffset(totalOffset);
      } else {
        setLastHeaderOffset(headerOffset);
        setHeaderOffset(0);
      }
    }
  }, HEADER_POSITION_DEBOUNCE);

  const headerMotion = keyframes`
    from {
      top: ${lastHeaderOffset}px;
    }
    to {
      top: ${headerOffset}px;
    }
  `;

  return (
    <TableHead sx={{position: 'sticky', animation: `${headerMotion} 0.5s 1 ease`, top: `${headerOffset}px`}}>
      <TableRow id='table-header'>
        {numSelected !== undefined && rowCount !== undefined && rowCount > 0 && onSelectAllClick && (
          <TableCell padding='checkbox'>
            <Checkbox
              color='primary'
              indeterminate={numSelected > 0 && numSelected < rowCount}
              checked={rowCount > 0 && numSelected === rowCount}
              onChange={onSelectAllClick}
            />
          </TableCell>
        )}
        <SortableContext items={headCells}>
          {headCells.map((headCell, i) => {
            return <TableHeaderItem headCell={headCell} order={order} orderBy={orderBy} onRequestSort={onRequestSort} i={i} key={i} />;
          })}
        </SortableContext>
      </TableRow>
    </TableHead>
  );
}
