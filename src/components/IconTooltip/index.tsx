import React from 'react';
import { Theme, Tooltip, TooltipProps } from '@mui/material';
import { makeStyles } from '@mui/styles';

import Icon from '../Icon/Icon';
import { IconName } from '../Icon/icons';
import { useDeviceInfo } from '../../utils';

const useStyles = makeStyles((theme: Theme) => ({
  arrow: {
    color: theme.palette.ClrBaseGray800,
    marginLeft: '3px',
    marginTop: '-1px',
  },
  icon: {
    fill: theme.palette.ClrBaseGray800,
    paddingLeft: '.5em',
    paddingRight: '.5em',
    verticalAlign: 'text-top',
  },
  tooltip: {
    backgroundColor: theme.palette.ClrBaseGray800,
    borderRadius: '8px',
    color: theme.palette.ClrBaseWhite,
    padding: '8px',
    '& a': {
      color: theme.palette.ClrBaseWhite,
    },
  },
}));

export type IconTooltipProps = {
  iconName?: IconName;
  placement?: TooltipProps['placement'];
  title: TooltipProps['title'];
};

export default function IconTooltip({ iconName = 'info', placement = 'top-start', title }: IconTooltipProps): JSX.Element {
  const { isMobile } = useDeviceInfo();
  const classes = useStyles();

  return (
    <Tooltip
      arrow={true}
      classes={{
        arrow: classes.arrow,
        tooltip: classes.tooltip,
      }}
      placement={placement}
      sx={{
        maxWidth: isMobile ? '342px' : '464px',
      }}
      title={title}
    >
      <span>
        <Icon name={iconName} className={classes.icon} />
      </span>
    </Tooltip>
  );
}
