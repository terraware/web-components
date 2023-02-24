import React from 'react';
import Icon from '../Icon/Icon';
import { IconName } from '../Icon/icons';
import { Size } from '../Size';
import './styles.scss';

import { makeStyles } from '@mui/styles';

const useStyles = makeStyles(() => ({
  svgIconFill: {
    '& path': {
      fill: 'currentColor',
    },
  },
}));

export interface Props {
  onClick: (event?: React.MouseEvent<HTMLButtonElement, MouseEvent>) => void;
  label?: string;
  type?: 'productive' | 'passive' | 'destructive';
  priority?: 'primary' | 'secondary' | 'ghost';
  size?: Size;
  disabled?: boolean;
  icon?: IconName;
  processing?: boolean;
  id?: string;
  className?: string;
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
    processing,
    id,
    className,
  } = props;
  const classes = useStyles();

  return (
    <button
      id={id}
      onClick={onClick}
      className={`button ${type}-${priority} button--${size} ${type}-${priority}--${size} ${
        icon && !processing ? 'button-with-icon' : ''
      } ${classes.svgIconFill}
      ${!label ? 'button-no-label' : ''} ${className ?? ''}`}
      disabled={disabled}
    >
      {processing && <Icon name='spinner' size={size} className='icon-spinner' />}
      {!processing && icon && <Icon name={icon} size={size} />}
      {!processing && !!label && label}
    </button>
  );
}
