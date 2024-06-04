import React from 'react';
import { Tooltip, TooltipProps, useTheme } from '@mui/material';

import Icon from '../Icon/Icon';
import { IconName } from '../Icon/icons';
import { useDeviceInfo } from '../../utils';

export type IconTooltipProps = {
  iconName?: IconName;
  placement?: TooltipProps['placement'];
  title: TooltipProps['title'];
  disableRightMargin?: boolean;
};

export default function IconTooltip({
  iconName = 'info',
  placement = 'top-start',
  title,
  disableRightMargin,
}: IconTooltipProps): JSX.Element {
  const [open, setOpen] = React.useState(false);
  const { isMobile } = useDeviceInfo();
  const theme = useTheme();

  const handleTooltipClose = () => {
    setOpen(false);
  };

  const handleTooltipOpen = () => {
    setOpen(true);
  };

  return (
    <Tooltip
      arrow={true}
      onClose={handleTooltipClose}
      open={isMobile ? open : undefined}
      placement={placement}
      sx={{
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
      }}
      title={title}
    >
      <span onClick={handleTooltipOpen}>
        <Icon
          name={iconName}
          style={{
            fill: theme.palette.TwClrIcnSecondary,
            marginLeft: '4px',
            marginRight: disableRightMargin ? '0px' : '4px',
            verticalAlign: 'text-top',
          }}
        />
      </span>
    </Tooltip>
  );
}
