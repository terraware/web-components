import React from 'react';

import { Tooltip as MUITooltip, TooltipProps, useTheme } from '@mui/material';

import { useDeviceInfo } from '../../utils';

export default function Tooltip({
  children,
  placement = 'top-start',
  slotProps,
  sx,
  title,
}: TooltipProps): JSX.Element {
  const [open, setOpen] = React.useState(false);
  const { isMobile } = useDeviceInfo();
  const theme = useTheme();

  const handleTooltipClose = () => {
    setOpen(false);
  };

  const handleTooltipOpen = (event: React.SyntheticEvent | Event) => {
    if (event.type === 'click' || (event.type === 'mouseover' && !isMobile)) {
      setOpen(true);
    }
  };

  return (
    <MUITooltip
      arrow={true}
      onOpen={handleTooltipOpen}
      onClose={handleTooltipClose}
      open={open}
      placement={placement}
      slotProps={slotProps}
      sx={[
        {
          maxWidth: isMobile ? '342px' : '464px',
          '& .MuiTooltip-arrow': {
            color: theme.palette.TwClrBaseGray800,
          },
          '& .MuiTooltip-tooltip': {
            backgroundColor: theme.palette.TwClrBaseGray800,
            color: theme.palette.TwClrBaseWhite,
            padding: '8px',
            '& a': {
              color: theme.palette.TwClrBaseWhite,
            },
          },
        },
        ...(Array.isArray(sx) ? sx : [sx]),
      ]}
      title={title}
    >
      <span onClick={handleTooltipOpen}>{children}</span>
    </MUITooltip>
  );
}
