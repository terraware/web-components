import React, { useMemo } from 'react';

import { Info } from '@mui/icons-material';
import { Box, IconButton, SxProps, Typography, useTheme } from '@mui/material';

export interface Props {
  id?: string;
  title: string;
  value: number | string;
  variant?: 'default' | 'available' | 'zero' | 'full';
  icon?: boolean;
  onIconClick?: () => void;
}

export default function SummaryBox({ title, value, variant = 'default', id, icon, onIconClick }: Props): JSX.Element {
  const theme = useTheme();

  const summaryBoxStyles: SxProps = useMemo(() => {
    switch (variant) {
      case 'default':
        return {
          position: 'relative',
          borderRadius: 8,
          backgroundColor: theme.palette.neutral[200],
          padding: theme.spacing(2),
        };
      case 'available':
        return {
          borderRadius: 8,
          backgroundColor: theme.palette.neutral[700],
          padding: theme.spacing(2),
          color: theme.palette.common.white,
        };
      case 'full':
        return {
          borderRadius: 8,
          backgroundColor: theme.palette.neutral[200],
          padding: theme.spacing(2),
          height: '100%',
          boxSizing: 'border-box',
        };
      default:
        return {
          borderRadius: 8,
          backgroundColor: theme.palette.state[5],
          padding: theme.spacing(2),
          color: theme.palette.common.white,
        };
    }
  }, [theme, variant]);

  return (
    <Box id={id} sx={summaryBoxStyles}>
      {icon && (
        <IconButton onClick={onIconClick} sx={{ position: 'absolute', right: theme.spacing(2) }}>
          <Info />
        </IconButton>
      )}
      <Typography component='p'>{title}</Typography>
      <Typography
        component='p'
        variant='h6'
        sx={{
          fontWeight: theme.typography.fontWeightBold,
          whiteSpace: 'pre-line',
        }}
      >
        {value}
      </Typography>
    </Box>
  );
}
