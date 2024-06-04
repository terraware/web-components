import { Edit, Notes } from '@mui/icons-material';
import { Box, Link, SxProps, TableCell, Theme, Typography, useTheme } from '@mui/material';
import React, { CSSProperties, ReactNode } from 'react';
import { RendererProps } from './types';
import { getDateDisplayValue, preventDefaultEvent } from '../../utils';
import { TextAlignment } from '.';

export type TableRowType = Record<string, any>;

const defaultStyles = (theme: Theme) => ({
  '&.MuiTableCell-root': {
    height: '52px',
    paddingTop: '0px',
    paddingBottom: '0px',
    borderBottom: `1px solid ${theme.palette.TwClrBrdrSecondary}`,
    fontVariantNumeric: 'tabular-nums',
  },
});

export default function CellRenderer(props: RendererProps<TableRowType>): JSX.Element {
  const { column, value, onRowClick, index, className, booleanFalseText, booleanTrueText, editText, style, sx } = props;
  const id = `row${index}-${column.key}`;

  if (column.type === 'date' && typeof value === 'string' && value) {
    return (
      <CellDateRenderer
        id={id}
        value={value}
        className={className}
        alignment={column.alignment}
        style={style}
        sx={sx}
      />
    );
  } else if (column.type === 'notes' && value && typeof value === 'string') {
    return (
      <CellNotesRenderer
        id={id}
        value={value}
        className={className}
        alignment={column.alignment}
        style={style}
        sx={sx}
      />
    );
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
        sx={sx}
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
        sx={sx}
      />
    );
  }

  return (
    <CellTextRenderer id={id} value={value} className={className} alignment={column.alignment} style={style} sx={sx} />
  );
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
  sx,
}: {
  id: string;
  value: string;
  className?: string;
  alignment?: TextAlignment;
  style?: CSSProperties;
  sx?: SxProps;
}): JSX.Element {
  const theme = useTheme();

  return (
    <TableCell
      id={id}
      align={alignment || 'left'}
      className={className}
      sx={[defaultStyles(theme), { whiteSpace: 'nowrap' }, style, ...(Array.isArray(sx) ? sx : [sx])]}
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
  sx,
}: {
  id: string;
  value?: string | number | any[] | ReactNode;
  className?: string;
  alignment?: TextAlignment;
  style?: CSSProperties;
  sx?: SxProps;
}): JSX.Element {
  const theme = useTheme();

  return (
    <TableCell
      id={id}
      align={alignment || 'left'}
      title={typeof value === 'string' ? value : ''}
      className={className}
      sx={[defaultStyles(theme), style, ...(Array.isArray(sx) ? sx : [sx])]}
    >
      <Typography component='p' variant='body1' noWrap={true} fontSize='14px' sx={{ root: { maxWidth: 400 } }}>
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
  sx,
}: {
  id: string;
  // eslint-disable-next-line @typescript-eslint/no-redundant-type-constituents
  value?: boolean | string | number | any[] | ReactNode;
  className?: string;
  booleanFalseText: string;
  booleanTrueText: string;
  alignment?: TextAlignment;
  style?: CSSProperties;
  sx?: SxProps;
}): JSX.Element {
  const theme = useTheme();

  return (
    <TableCell
      id={id}
      align={alignment || 'left'}
      className={className}
      sx={[defaultStyles(theme), style, ...(Array.isArray(sx) ? sx : [sx])]}
    >
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
  sx,
}: {
  id: string;
  value?: string;
  className?: string;
  alignment?: TextAlignment;
  style?: CSSProperties;
  sx?: SxProps;
}): JSX.Element {
  const theme = useTheme();

  return (
    <TableCell
      id={id}
      align={alignment || 'left'}
      className={className}
      sx={[defaultStyles(theme), style, ...(Array.isArray(sx) ? sx : [sx])]}
    >
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
  sx,
}: {
  id: string;
  onRowClick?: () => void;
  className?: string;
  editText: string;
  alignment?: TextAlignment;
  style?: CSSProperties;
  sx?: SxProps;
}): JSX.Element {
  const theme = useTheme();

  return (
    <TableCell
      id={id}
      align={alignment || 'left'}
      className={className}
      sx={[defaultStyles(theme), style, ...(Array.isArray(sx) ? sx : [sx])]}
    >
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
          <Edit fontSize='small' sx={{ marginLeft: theme.spacing(1) }} />
        </Box>
      </Link>
    </TableCell>
  );
}
