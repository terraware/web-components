import React from 'react';
import Icon from '../Icon/Icon';
import { IconName } from '../Icon/icons';
import './styles.scss';

export interface Props {
  onClick?: () => void;
  label: string;
  disabled?: boolean;
  iconLeft?: IconName;
  iconRight?: IconName;
  id?: string;
  className?: string;
  helperText?: string;
  placeholder?: string;
  errorText?: string;
  warningText?: string;
  value?: string;
}

export default function TextField(props: Props): JSX.Element {
  const { value, onClick, label, disabled, iconLeft, iconRight, id, className, helperText, placeholder, errorText, warningText } = props;

  return (
    <div className={`textfield ${className}`}>
      <label htmlFor={id} className='textfield-label'>
        {label}
      </label>
      <div id={id} className={`textfield-value ${disabled ? 'textfield-value--disabled' : ''}`} placeholder={placeholder}>
        {iconLeft && <Icon name={iconLeft} className='textfield-value--icon-left' />}
        <input value={value} disabled={disabled} placeholder={placeholder} />
        {iconRight && <Icon name={iconRight} className='textfield-value--icon-right' />}
      </div>
      <label htmlFor={id} className='textfield-help-text'>
        {helperText}
      </label>
      {errorText && (
        <div className='label-container'>
          <Icon name='error' className='textfield-error-text--icon' />
          <label htmlFor={id} className='textfield-error-text'>
            {errorText}
          </label>
        </div>
      )}
      {warningText && (
        <div className='label-container'>
          <Icon name='warning' className='textfield-warning-text--icon' />
          <label htmlFor={id} className='textfield-warning-text'>
            {warningText}
          </label>
        </div>
      )}
    </div>
  );
}
