import { Edit, Notes } from '@mui/icons-material';
import { Box, Link, TableCell, Theme, Typography } from '@mui/material';
import React, { ReactNode } from 'react';
import { RendererProps } from './types';
import { makeStyles } from '@mui/styles';
import { getDateDisplayValue, preventDefaultEvent } from '../../utils';

const useStyles = makeStyles((theme: Theme) => ({
  editIcon: {
    marginLeft: theme.spacing(1),
  },
  textRoot: {
    maxWidth: 400,
  },
  date: {
    whiteSpace: 'nowrap',
  },
}));

export type TableRowType = Record<string, any>;

export default function CellRenderer(props: RendererProps<TableRowType>): JSX.Element {
  const { column, value, onRowClick, index, className } = props;
  const id = `row${index}-${column.key}`;

  if (column.type === 'date' && typeof value === 'string' && value) {
    return <CellDateRenderer id={id} value={value} className={className} />;
  } else if (column.type === 'notes' && value && typeof value === 'string') {
    return <CellNotesRenderer id={id} value={value} className={className} />;
  } else if (column.type === 'boolean') {
    return <CellBooleanRenderer id={id} value={value} className={className} />;
  } else if (column.type === 'edit') {
    return <CellEditRenderer id={id} onRowClick={onRowClick} className={className} />;
  }

  return <CellTextRenderer id={id} value={value} className={className} />;
}

export const cellDateFormatter = (value?: string): string | undefined => {
  if (value) {
    return getDateDisplayValue(value);
  }
};

export function CellDateRenderer({
  id,
  value,
  className,
}: {
  id: string;
  value: string,
  className?: string;
}): JSX.Element {
  const classes = useStyles();

  return (
    <TableCell id={id} align='left' className={classes.date + ' ' + (className || '')}>
      <Typography component='p' variant='body1'>
        {cellDateFormatter(value)}
      </Typography>
    </TableCell>
  );
}

export function CellTextRenderer({
  id,
  value,
  className,
}: {
  id: string;
  value?: string | number | any[] | ReactNode;
  className?: string;
}): JSX.Element {
  const classes = useStyles();

  return (
    <TableCell id={id} align='left' title={typeof value === 'string' ? value : ''} className={className || ''}>
      <Typography component='p' variant='body1' noWrap={true} classes={{ root: classes.textRoot }}>
        {value}
      </Typography>
    </TableCell>
  );
}

export function CellBooleanRenderer({
  id,
  value,
  className,
}: {
  id: string;
  value?: string | number | any[] | ReactNode;
  className?: string;
}): JSX.Element {
  return (
    <TableCell id={id} align='left' className={className || ''}>
      <Typography component='p' variant='body1'>
        {value === 'true' ? 'YES' : 'NO'}
      </Typography>
    </TableCell>
  );
}

export function CellNotesRenderer({
  id,
  value,
  className,
}: {
  id: string;
  value?: string
  className?: string;
}): JSX.Element {
  return (
    <TableCell id={id} align='left' className={className || ''}>
      <Typography id={id} component='p' variant='body1'>
        {value && value.length > 0 ? <Notes /> : ''}
      </Typography>
    </TableCell>
  );
}

export function CellEditRenderer({
  id,
  onRowClick,
  className,
}: {
  id: string;
  onRowClick?: () => void;
  className?: string;
}): JSX.Element {
  const classes = useStyles();

  return (
    <TableCell id={id} align='left' className={className || ''}>
      <Link
        id={`${id}-button`}
        href='#'
        onClick={(event: React.SyntheticEvent) => {
          preventDefaultEvent(event);
          if (onRowClick) {
            onRowClick();
          }
        }}
      >
        <Box display='flex'>
          <Typography component='p' variant='body1'>
            Edit
          </Typography>
          <Edit fontSize='small' className={classes.editIcon} />
        </Box>
      </Link>
    </TableCell>
  );
}
