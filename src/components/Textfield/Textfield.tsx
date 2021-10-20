import classNames from 'classnames';
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
  readonly?: boolean;
  display?: boolean;
}

export default function TextField(props: Props): JSX.Element {
  const { value, onClick, label, disabled, iconLeft, iconRight, id, className, helperText, placeholder, errorText, warningText, readonly, display } = props;

  const textfieldClass = classNames({
    'textfield-value': true,
    'textfield-value--disabled': disabled,
    'textfield-value--error': !!errorText,
    'textfield-value--warning': !!warningText,
    'textfield-value--readonly': readonly,
  });

  return (
    <div className={`textfield ${className}`}>
      <label htmlFor={id} className='textfield-label'>
        {label}
      </label>
      {!display && (
        <div id={id} className={textfieldClass}>
          {iconLeft && <Icon name={iconLeft} className='textfield-value--icon-left' />}
          <input value={value} disabled={readonly} placeholder={placeholder} />
          {iconRight && <Icon name={iconRight} className='textfield-value--icon-right' />}
        </div>
      )}
      {display && <p className='textfield-value--display'>{value}</p>}
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
      <label htmlFor={id} className='textfield-help-text'>
        {helperText}
      </label>
    </div>
  );
}
