import React, { CSSProperties } from 'react';
import Icon from '../Icon/Icon';
import { IconName } from '../Icon/icons';
import { Size } from '../Size';
import './styles.scss';

import { makeStyles } from '@mui/styles';
import { ButtonBase, SxProps } from '@mui/material';

const useStyles = makeStyles(() => ({
  svgIconFill: {
    '& path': {
      fill: 'currentColor',
    },
  },
}));

export type ButtonPriority = 'primary' | 'secondary' | 'ghost';
export type ButtonType = 'productive' | 'passive' | 'destructive';

export interface Props {
  onClick: (event?: React.MouseEvent<HTMLButtonElement, MouseEvent>) => void;
  label?: string;
  type?: ButtonType;
  priority?: ButtonPriority;
  size?: Size;
  disabled?: boolean;
  icon?: IconName;
  rightIcon?: IconName;
  processing?: boolean;
  id?: string;
  className?: string;
  style?: CSSProperties;
  sx?: SxProps;
}

export default function Button(props: Props): JSX.Element {
  const {
    onClick,
    label,
    type = 'productive',
    priority = 'primary',
    size = 'small',
    disabled,
    icon,
    rightIcon,
    processing,
    id,
    className,
    style,
    sx,
  } = props;
  const classes = useStyles();

  return (
    <ButtonBase
      id={id}
      onClick={onClick}
      className={`button ${type}-${priority} button--${size} ${type}-${priority}--${size} ${
        icon && !processing ? 'button-with-icon' : ''
      } ${rightIcon && !processing ? 'button-with-right-icon' : ''} ${classes.svgIconFill}
      ${!label ? 'button-no-label' : ''} ${className ?? ''}`}
      disabled={disabled}
      style={style}
      sx={sx}
    >
      {processing && <Icon name='spinner' size={size} className='icon-spinner' />}
      {!processing && icon && <Icon name={icon} size={size} />}
      {!processing && !!label && label}
      {!processing && rightIcon && <Icon name={rightIcon} size={size} className='icon-right' />}
    </ButtonBase>
  );
}
