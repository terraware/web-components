import classNames from 'classnames';
import React from 'react';
import { TooltipProps } from '@mui/material';
import Icon from '../Icon/Icon';
import { IconName } from '../Icon/icons';
import './styles.scss';
import { isWhitespaces } from '../../utils';
import IconTooltip from '../IconTooltip';

type TextfieldType = 'text' | 'textarea' | 'number';

type Handler = (value: unknown) => void;

export interface Props {
  autoFocus?: boolean;
  onChange?: Handler;
  label: string;
  disabled?: boolean;
  iconLeft?: IconName;
  iconRight?: IconName;
  id: string;
  className?: string;
  helperText?: string;
  placeholder?: string;
  errorText?: string;
  warningText?: string;
  value?: string | number;
  readonly?: boolean;
  display?: boolean;
  type: TextfieldType;
  onKeyDown?: (key: string) => void;
  onClickRightIcon?: () => void;
  tooltipTitle?: TooltipProps['title'];
  min?: number;
  max?: number;
  disableDecimals?: boolean;
}

export default function TextField(props: Props): JSX.Element {
  const {
    value,
    autoFocus,
    onChange,
    label,
    disabled,
    iconLeft,
    iconRight,
    id,
    className,
    helperText,
    placeholder,
    errorText,
    warningText,
    readonly,
    display,
    type,
    onKeyDown,
    onClickRightIcon,
    tooltipTitle,
    min,
    max,
    disableDecimals,
  } = props;

  const textfieldClass = classNames({
    'textfield-value': true,
    'textfield-value--disabled': disabled,
    'textfield-value--error': !!errorText,
    'textfield-value--warning': !!warningText,
    'textfield-value--readonly': readonly,
  });

  const textfieldOnChange = (event: React.ChangeEvent<HTMLTextAreaElement | HTMLInputElement>) => {
    const textValue = event.target.value;
    if (isWhitespaces(textValue)) {
      return;
    }
    if (onChange) {
      onChange(textValue);
    }
  };

  const onKeyDownHandler = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (disableDecimals && (e.key === '.' || e.key === ',')) {
      e?.preventDefault();
      return;
    }
    if (onKeyDown) {
      onKeyDown(e.key);
    }
  };

  const renderRightIcon = () => {
    if (iconRight === 'cancel' && !value) {
      return null;
    }

    return (
      <button onClick={onClickRightIcon} className='textfield-value--icon-container'>
        <Icon name={iconRight!} className={`textfield-value--icon-right${iconRight === 'cancel' ? '--cancel' : ''}`} />
      </button>
    );
  };

  const typeProps: { [key: string]: unknown } = {
    type,
  };

  if (type === 'number') {
    if (min !== undefined) {
      typeProps.min = min;
    }
    if (max !== undefined) {
      typeProps.max = max;
    }
  }

  const preventDecimals = (event: React.KeyboardEvent<HTMLInputElement>) => {
    return event.charCode >= 48 && event.charCode <= 57;
  };

  return (
    <div className={`textfield ${className}`}>
      <label htmlFor={id} className='textfield-label'>
        {label}
        {tooltipTitle && <IconTooltip placement='top' title={tooltipTitle} />}
      </label>
      {!display &&
        (type === 'text' || type === 'number' ? (
          <div id={id} className={textfieldClass}>
            {iconLeft && <Icon name={iconLeft} className='textfield-value--icon-left' />}
            <input
              autoFocus={autoFocus}
              value={type === 'number' ? value : value || ''}
              disabled={readonly || disabled}
              placeholder={placeholder}
              onChange={textfieldOnChange}
              onKeyDown={onKeyDownHandler}
              {...typeProps}
            />
            {iconRight ? renderRightIcon() : null}
          </div>
        ) : (
          <textarea
            autoFocus={autoFocus}
            className={textfieldClass}
            value={value}
            disabled={readonly || disabled}
            placeholder={placeholder}
            onChange={textfieldOnChange}
          />
        ))}
      {display && <p className='textfield-value--display'>{value}</p>}
      {errorText && (
        <div className='textfield-label-container'>
          <Icon name='error' className='textfield-error-text--icon' />
          <label htmlFor={id} className='textfield-error-text'>
            {errorText}
          </label>
        </div>
      )}
      {warningText && (
        <div className='textfield-label-container'>
          <Icon name='warning' className='textfield-warning-text--icon' />
          <label htmlFor={id} className='textfield-warning-text'>
            {warningText}
          </label>
        </div>
      )}
      {helperText && (
        <label htmlFor={id} className='textfield-help-text'>
          {helperText}
        </label>
      )}
    </div>
  );
}
