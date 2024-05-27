import { Edit, Notes } from '@mui/icons-material';
import { Box, Link, TableCell, Theme, Typography } from '@mui/material';
import React, { CSSProperties, ReactNode } from 'react';
import { RendererProps } from './types';
import { makeStyles } from '@mui/styles';
import { getDateDisplayValue, preventDefaultEvent } from '../../utils';
import { TextAlignment } from '.';

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
  default: {
    '&.MuiTableCell-root': {
      height: '52px',
      paddingTop: '0px',
      paddingBottom: '0px',
      borderBottom: `1px solid ${theme.palette.TwClrBrdrSecondary}`,
      fontVariantNumeric: 'tabular-nums',
    },
  },
}));

export type TableRowType = Record<string, any>;

export default function CellRenderer(props: RendererProps<TableRowType>): JSX.Element {
  const { column, value, onRowClick, index, className, booleanFalseText, booleanTrueText, editText, style } = props;
  const id = `row${index}-${column.key}`;

  if (column.type === 'date' && typeof value === 'string' && value) {
    return <CellDateRenderer id={id} value={value} className={className} alignment={column.alignment} style={style} />;
  } else if (column.type === 'notes' && value && typeof value === 'string') {
    return <CellNotesRenderer id={id} value={value} className={className} alignment={column.alignment} style={style} />;
  } else if (column.type === 'boolean') {
    return (
      <CellBooleanRenderer
        id={id}
        value={value}
        className={className}
        booleanFalseText={booleanFalseText}
        booleanTrueText={booleanTrueText}
        alignment={column.alignment}
        style={style}
      />
    );
  } else if (column.type === 'edit') {
    return (
      <CellEditRenderer
        id={id}
        onRowClick={onRowClick}
        className={className}
        editText={editText}
        alignment={column.alignment}
        style={style}
      />
    );
  }

  return <CellTextRenderer id={id} value={value} className={className} alignment={column.alignment} style={style} />;
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
  alignment,
  style,
}: {
  id: string;
  value: string;
  className?: string;
  alignment?: TextAlignment;
  style?: CSSProperties;
}): JSX.Element {
  const classes = useStyles();

  return (
    <TableCell
      id={id}
      align={alignment || 'left'}
      className={`${classes.date} ${classes.default} ${className}`}
      sx={style}
    >
      <Typography component='p' variant='body1' fontSize='14px'>
        {cellDateFormatter(value)}
      </Typography>
    </TableCell>
  );
}

export function CellTextRenderer({
  id,
  value,
  className,
  alignment,
  style,
}: {
  id: string;
  value?: string | number | any[] | ReactNode;
  className?: string;
  alignment?: TextAlignment;
  style?: CSSProperties;
}): JSX.Element {
  const classes = useStyles();

  return (
    <TableCell
      id={id}
      align={alignment || 'left'}
      title={typeof value === 'string' ? value : ''}
      className={`${classes.default} ${className}`}
      sx={style}
    >
      <Typography component='p' variant='body1' noWrap={true} classes={{ root: classes.textRoot }} fontSize='14px'>
        {value}
      </Typography>
    </TableCell>
  );
}

export function CellBooleanRenderer({
  id,
  value,
  className,
  booleanFalseText,
  booleanTrueText,
  alignment,
  style,
}: {
  id: string;
  value?: boolean | string | number | any[] | ReactNode;
  className?: string;
  booleanFalseText: string;
  booleanTrueText: string;
  alignment?: TextAlignment;
  style?: CSSProperties;
}): JSX.Element {
  const classes = useStyles();

  return (
    <TableCell id={id} align={alignment || 'left'} className={`${classes.default} ${className}`} sx={style}>
      <Typography component='p' variant='body1' fontSize='14px'>
        {value?.toString() === 'true' ? booleanTrueText : booleanFalseText}
      </Typography>
    </TableCell>
  );
}

export function CellNotesRenderer({
  id,
  value,
  className,
  alignment,
  style,
}: {
  id: string;
  value?: string;
  className?: string;
  alignment?: TextAlignment;
  style?: CSSProperties;
}): JSX.Element {
  const classes = useStyles();

  return (
    <TableCell id={id} align={alignment || 'left'} className={`${classes.default} ${className}`} sx={style}>
      <Typography id={id} component='p' variant='body1' fontSize='14px'>
        {value && value.length > 0 ? <Notes /> : ''}
      </Typography>
    </TableCell>
  );
}

export function CellEditRenderer({
  id,
  onRowClick,
  className,
  editText,
  alignment,
  style,
}: {
  id: string;
  onRowClick?: () => void;
  className?: string;
  editText: string;
  alignment?: TextAlignment;
  style?: CSSProperties;
}): JSX.Element {
  const classes = useStyles();

  return (
    <TableCell id={id} align={alignment || 'left'} className={`${classes.default} ${className}`} sx={style}>
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
          <Typography component='p' variant='body1' fontSize='14px'>
            {editText}
          </Typography>
          <Edit fontSize='small' className={classes.editIcon} />
        </Box>
      </Link>
    </TableCell>
  );
}
