import { Autocomplete as MUIAutocomplete, TextField, TooltipProps } from '@mui/material';
import React, { ChangeEvent } from 'react';
import Icon from '../Icon/Icon';
import IconTooltip from '../IconTooltip';
import { DropdownItem as Option } from '../types';
import '../Select/styles.scss';
import './styles.scss';

export type ValueType = string | Option;

export interface Props {
  onChange: (value: ValueType) => void;
  options: ValueType[];
  id?: string;
  label?: string;
  selected?: ValueType | undefined;
  freeSolo?: boolean;
  disabled?: boolean;
  className?: string;
  hideClearIcon?: boolean;
  isEqual?: (option: ValueType, value: ValueType) => void;
  placeholder?: string;
  errorText?: string;
  tooltipTitle?: TooltipProps['title'];
  required?: boolean;
}

export default function Autocomplete({
  id,
  label,
  options,
  onChange,
  selected,
  freeSolo,
  disabled,
  className,
  hideClearIcon,
  isEqual,
  placeholder,
  errorText,
  tooltipTitle,
  required,
}: Props): JSX.Element {
  const onChangeHandler = (event: ChangeEvent<any>, value: string | null) => {
    if (event) {
      if (value) {
        onChange(value);
      } else {
        onChange('');
      }
    }
  };

  const renderInput = (params: object) => (
    <div className={`auto-complete ${className}`}>
      {label && (
        <label htmlFor={id} className='textfield-label'>
          {label} {required ? '*' : ''}
          {tooltipTitle && <IconTooltip placement='top' title={tooltipTitle} />}
        </label>
      )}
      <TextField
        {...params}
        variant='outlined'
        size='small'
        placeholder={placeholder}
        className={errorText ? 'auto-complete--error' : ''}
      />
      {errorText && (
        <div className='textfield-label-container'>
          <Icon name='error' className='textfield-error-text--icon' />
          <label htmlFor={id} className='textfield-error-text'>
            {errorText}
          </label>
        </div>
      )}
    </div>
  );

  const optionalArgs: any = {};

  if (hideClearIcon) {
    optionalArgs.clearIcon = null;
  }

  if (isEqual) {
    optionalArgs.isOptionEqualToValue = isEqual;
  }

  return (
    <MUIAutocomplete
      disabled={disabled}
      id={id}
      options={options}
      getOptionLabel={(option: any) => {
        if (typeof option === 'object') {
          return option.label ?? '';
        }

        return option ?? '';
      }}
      onChange={onChangeHandler}
      onInputChange={(event: any, value: any) => freeSolo && onChangeHandler(event, value)}
      value={selected}
      freeSolo={freeSolo}
      forcePopupIcon={true}
      renderInput={renderInput}
      aria-required={required}
      popupIcon={<Icon name='chevronDown' className='auto-complete--icon-right' size='medium' />}
      classes={{
        paper: 'auto-complete select',
        listbox: 'options-container',
      }}
      sx={{
        '& .MuiAutocomplete-popupIndicator:hover': {
          background: 'transparent',
        },
        '& .MuiAutocomplete-popupIndicator': {
          background: 'transparent',
          transform: 'none',
        },
        '& .MuiTouchRipple-root': {
          display: 'none',
        },
      }}
      {...optionalArgs}
    />
  );
}
