import React from 'react';
import Icon from '../Icon/Icon';
import { IconName } from '../Icon/icons';
import { Size } from '../types';
import './styles.scss';

export interface Props {
  onClick: () => void;
  label: string;
  type?: 'productive' | 'passive' | 'destructive';
  priority?: 'primary' | 'secondary';
  size?: Size;
  disabled?: boolean;
  icon?: IconName;
  processing?: boolean;
}

export default function Button(props: Props): JSX.Element {
  const { onClick, label, type = 'productive', priority = 'primary', size = 'small', disabled, icon, processing } = props;

  return (
    <button
      onClick={onClick}
      className={`button ${type}-${priority} button--${size} ${type}-${priority}--${size} ${icon && !processing ? 'button-with-icon' : ''}`}
      disabled={disabled}
    >
      {processing && <Icon name='spinner' size={size}></Icon>}
      {!processing && icon && <Icon name={icon} size={size}></Icon>}
      {!processing && label}
    </button>
  );
}
