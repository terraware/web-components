import React from 'react';
import { Tooltip as MUITooltip, Theme, TooltipProps } from '@mui/material';
import { makeStyles } from '@mui/styles';

import { useDeviceInfo } from '../../utils';

const useStyles = makeStyles((theme: Theme) => ({
  arrow: {
    color: theme.palette.TwClrBaseGray800,
  },
  tooltip: {
    backgroundColor: theme.palette.TwClrBaseGray800,
    color: theme.palette.TwClrBaseWhite,
    padding: '8px',
    '& a': {
      color: theme.palette.TwClrBaseWhite,
    },
  },
}));

export default function Tooltip({ placement = 'top-start', title, children }: TooltipProps): JSX.Element {
  const [open, setOpen] = React.useState(false);
  const { isMobile } = useDeviceInfo();
  const classes = useStyles();

  const handleTooltipClose = () => {
    setOpen(false);
  };

  const handleTooltipOpen = (event: React.SyntheticEvent | Event) => {
    if(event.type === 'click' || (event.type === 'mouseover' && !isMobile)){
      setOpen(true);
    }
  };

  return (
    <MUITooltip
      arrow={true}
      classes={{
        arrow: classes.arrow,
        tooltip: classes.tooltip,
      }}
      onOpen={handleTooltipOpen}
      onClose={handleTooltipClose}
      open={open}
      placement={placement}
      sx={{
        maxWidth: isMobile ? '342px' : '464px',
      }}
      title={title}
    >
      <span onClick={handleTooltipOpen}>
        {children}
      </span>
    </MUITooltip>
  );
}
