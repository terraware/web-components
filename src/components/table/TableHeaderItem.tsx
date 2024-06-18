import React from 'react';
import { useSortable } from '@dnd-kit/sortable';
import { CSS } from '@dnd-kit/utilities';
import { DragHandle } from '@mui/icons-material';
import { Box, TableCell, TableSortLabel, useTheme } from '@mui/material';

import { SortOrder } from './sort';
import IconTooltip from '../IconTooltip';
import { HeadCell } from '.';

type Props = {
  headCell: HeadCell;
  order: SortOrder;
  orderBy?: string;
  onRequestSort: (event: React.MouseEvent<unknown>, property: string) => void;
  i: number;
};

export default function TableHeaderItem(props: Props): JSX.Element {
  const { headCell, order, orderBy, onRequestSort, i } = props;
  const { attributes, listeners, setNodeRef, transform, transition, isDragging } = useSortable({
    id: headCell.id,
  });
  const theme = useTheme();
  const style = {
    transform: CSS.Transform.toString(transform),
    transition,
    opacity: isDragging ? 0.5 : 1,
  };
  const createSortHandler = (property: string) => (event: React.MouseEvent<unknown>) => {
    onRequestSort(event, property);
  };

  return headCell.alignment === 'right' ? (
    <TableCell
      ref={setNodeRef}
      id={`table-header-${headCell.id}`}
      key={headCell.id}
      align={'right'}
      padding={headCell.disablePadding ? 'none' : 'normal'}
      sortDirection={orderBy === headCell.id ? order : false}
      style={style}
      className={headCell.className || ''}
      sx={headCell.sx}
    >
      <Box display='flex' alignItems='center' flexDirection='row-reverse'>
        {headCell.label && (
          <TableSortLabel
            sx={{ flexDirection: 'row-reverse' }}
            active={orderBy === headCell.id}
            direction={orderBy === headCell.id ? order : 'asc'}
            onClick={createSortHandler(headCell.id)}
          >
            {headCell.tooltipTitle && <IconTooltip title={headCell.tooltipTitle} disableRightMargin={true} />}
            {headCell.label}
          </TableSortLabel>
        )}
        {i > 0 && (
          <DragHandle
            {...attributes}
            {...listeners}
            sx={{
              verticalAlign: 'middle',
              display: 'inline-flex',
              marginLeft: headCell.alignment === 'right' ? '0px' : '-20px',
              color: theme.palette.common.white,
              '&:hover': {
                color: theme.palette.neutral[600],
              },
            }}
          />
        )}
      </Box>
    </TableCell>
  ) : (
    <TableCell
      ref={setNodeRef}
      id={`table-header-${headCell.id}`}
      key={headCell.id}
      align={'left'}
      padding={headCell.disablePadding ? 'none' : 'normal'}
      sortDirection={orderBy === headCell.id ? order : false}
      style={style}
      className={headCell.className || ''}
      sx={headCell.sx}
    >
      {headCell.label && (
        <TableSortLabel
          active={orderBy === headCell.id}
          direction={orderBy === headCell.id ? order : 'asc'}
          onClick={createSortHandler(headCell.id)}
        >
          {i > 0 && (
            <DragHandle
              {...attributes}
              {...listeners}
              sx={{
                marginLeft: '-20px',
                color: theme.palette.common.white,
                '&:hover': {
                  color: theme.palette.neutral[600],
                },
              }}
            />
          )}
          {headCell.label}
          {headCell.tooltipTitle && <IconTooltip title={headCell.tooltipTitle} />}
        </TableSortLabel>
      )}
    </TableCell>
  );
}
