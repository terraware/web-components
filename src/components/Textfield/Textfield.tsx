import React from 'react';
import { IconName } from '../Icon/icons';
import { Size } from '../types';
import './styles.scss';

export interface Props {
  onClick?: () => void;
  label: string;
  type?: 'productive' | 'passive' | 'destructive';
  priority?: 'primary' | 'secondary';
  size?: Size;
  disabled?: boolean;
  icon?: IconName;
  processing?: boolean;
  id?: string;
  className?: string;
  helperText: string;
}

export default function TextField(props: Props): JSX.Element {
  const { onClick, label, type = 'productive', priority = 'primary', size = 'small', disabled, icon, processing, id, className, helperText } = props;

  return (
    <div className={`textfield ${className}`}>
      <label htmlFor={id} className='textfield-label'>
        {label}
      </label>
      <input id={id}></input>
      <label htmlFor={id} className='textfield-help-text'>
        {helperText}
      </label>
    </div>
  );
}
