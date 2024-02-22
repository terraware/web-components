import React from 'react';
import { Box } from '@mui/material';
import theme from '../../theme';

const Separator = (props: { height?: string }) => {
  return (
    <Box
      sx={{
        margin: theme.spacing(0, 2),
        width: '1px',
        height: props.height || '32px',
        backgroundColor: theme.palette.TwClrBgTertiary,
      }}
    />
  );
};

export default Separator;
