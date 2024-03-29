import React from 'react';
import { useSortable } from '@dnd-kit/sortable';
import { CSS } from '@dnd-kit/utilities';
import { DragHandle } from '@mui/icons-material';
import { TableCell, TableSortLabel, Theme, TooltipProps } from '@mui/material';
import { makeStyles } from '@mui/styles';

import { SortOrder } from './sort';
import IconTooltip from '../IconTooltip';

const useStyles = makeStyles((theme: Theme) => ({
  dragIcon: {
    marginLeft: -20,
    color: theme.palette.common.white,
    '&:hover': {
      color: theme.palette.neutral[600],
    },
  },
}));

interface HeadCell {
  disablePadding: boolean;
  id: string;
  label: string | JSX.Element;
  className?: string;
  tooltipTitle?: TooltipProps['title'];
}

type Props = {
  headCell: HeadCell;
  order: SortOrder;
  orderBy?: string;
  onRequestSort: (event: React.MouseEvent<unknown>, property: string) => void;
  i: number;
};

export default function TableHeaderItem(props: Props): JSX.Element {
  const { headCell, order, orderBy, onRequestSort, i } = props;
  const classes = useStyles();
  const { attributes, listeners, setNodeRef, transform, transition, isDragging } = useSortable({
    id: headCell.id,
  });
  const style = {
    transform: CSS.Transform.toString(transform),
    transition,
    opacity: isDragging ? 0.5 : 1,
  };
  const createSortHandler = (property: string) => (event: React.MouseEvent<unknown>) => {
    onRequestSort(event, property);
  };

  return (
    <TableCell
      ref={setNodeRef}
      id={`table-header-${headCell.id}`}
      key={headCell.id}
      align='left'
      padding={headCell.disablePadding ? 'none' : 'normal'}
      sortDirection={orderBy === headCell.id ? order : false}
      style={style}
      className={headCell.className || ''}
    >
      {headCell.label && (
        <TableSortLabel
          active={orderBy === headCell.id}
          direction={orderBy === headCell.id ? order : 'asc'}
          onClick={createSortHandler(headCell.id)}
        >
          {i > 0 && <DragHandle className={classes.dragIcon} {...attributes} {...listeners} />}
          {headCell.label}
          {headCell.tooltipTitle && <IconTooltip title={headCell.tooltipTitle} />}
        </TableSortLabel>
      )}
    </TableCell>
  );
}
