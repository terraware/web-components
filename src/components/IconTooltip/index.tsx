import React from 'react';
import { Theme, Tooltip, TooltipProps } from '@mui/material';
import { makeStyles } from '@mui/styles';

import Icon from '../Icon/Icon';
import { IconName } from '../Icon/icons';
import { useDeviceInfo } from '../../utils';

const useStyles = makeStyles((theme: Theme) => ({
  arrow: {
    color: theme.palette.TwClrBaseGray800,
  },
  icon: {
    fill: theme.palette.TwClrIcnSecondary,
    marginLeft: '4px',
    marginRight: '4px',
    verticalAlign: 'text-top',
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

export type IconTooltipProps = {
  iconName?: IconName;
  placement?: TooltipProps['placement'];
  title: TooltipProps['title'];
};

export default function IconTooltip({
  iconName = 'info',
  placement = 'top-start',
  title,
}: IconTooltipProps): JSX.Element {
  const [open, setOpen] = React.useState(false);
  const { isMobile } = useDeviceInfo();
  const classes = useStyles();

  const handleTooltipClose = () => {
    setOpen(false);
  };

  const handleTooltipOpen = () => {
    setOpen(true);
  };

  return (
    <Tooltip
      arrow={true}
      classes={{
        arrow: classes.arrow,
        tooltip: classes.tooltip,
      }}
      onClose={handleTooltipClose}
      open={isMobile ? open : undefined}
      placement={placement}
      sx={{
        maxWidth: isMobile ? '342px' : '464px',
      }}
      title={title}
    >
      <span onClick={handleTooltipOpen}>
        <Icon name={iconName} className={classes.icon} />
      </span>
    </Tooltip>
  );
}
