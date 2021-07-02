import React from 'react';
import Icon, { IconType } from '../Icon/Icon';
import './styles.scss';

export interface Props {
  onClick: () => void;
  label: string;
  type?: 'productive' | 'passive' | 'destructive';
  priority?: 'primary' | 'secondary';
  size?: 'small' | 'medium' | 'large' | 'xlarge';
  disabled?: boolean;
  icon?: IconType;
  processing?: boolean;
}

export default function Button(props: Props): JSX.Element {
  const {
    onClick,
    label,
    type = 'productive',
    priority = 'primary',
    size = 'small',
    disabled = false,
    icon,
    processing = false,
  } = props;

  return (
    <button
      onClick={onClick}
      className={`button ${type}-${priority} button--${size} ${type}-${priority}--${size} ${
        icon ? 'button-with-icon' : ''
      }`}
      disabled={disabled}
    >
      {processing && <Icon name='processing' size={size}></Icon>}
      {!processing && icon && <Icon name={icon} size={size}></Icon>}
      {!processing && label}
    </button>
  );
}
