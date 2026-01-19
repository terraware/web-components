import React, { type JSX } from 'react';

import { Box, Typography, useTheme } from '@mui/material';

export interface Props {
  children: string;
}

export default function Note({ children }: Props): JSX.Element {
  const theme = useTheme();

  return (
    <Box
      sx={{
        borderRadius: 8,
        backgroundColor: theme.palette.neutral[200],
        marginBottom: theme.spacing(3),
        padding: theme.spacing(2),
      }}
    >
      <Typography component='p'>{children}</Typography>
    </Box>
  );
}
