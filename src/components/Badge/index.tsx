import React from 'react';
import { Box, Typography, useTheme } from '@mui/material';

export interface BadgeProps {
  backgroundColor?: string;
  borderColor?: string;
  label: string;
  labelColor?: string;
}

const Badge = (props: BadgeProps): JSX.Element => {
  const theme = useTheme();
  const backgroundColor = props.backgroundColor || theme.palette.TwClrBgSecondary;
  const borderColor = props.borderColor || theme.palette.TwClrBrdrSecondary;
  const labelColor = props.labelColor || borderColor;

  return (
    <Box
      sx={{
        backgroundColor,
        border: `1px solid ${borderColor}`,
        borderRadius: theme.spacing(1),
        padding: theme.spacing(0.5, 1),
        width: 'fit-content',
      }}
    >
      <Typography color={labelColor} fontSize='14px' fontWeight={500}>
        {props.label}
      </Typography>
    </Box>
  );
};

export default Badge;
