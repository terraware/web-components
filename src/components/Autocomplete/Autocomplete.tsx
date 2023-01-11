import { Box, Autocomplete as MUIAutocomplete, TextField, Theme } from '@mui/material';
import React, { ChangeEvent } from 'react';
import Icon from '../Icon/Icon';
import IconTooltip from '../IconTooltip';
import '../Select/styles.scss';
import './styles.scss';

export type Option = {
  value: any;
  label: string;
};

export type ValueType = string | Option;

export interface Props {
  id: string;
  label: string;
  values: ValueType[];
  onChange: (value: ValueType) => void;
  selected: ValueType | undefined;
  freeSolo: boolean;
  disabled?: boolean;
  className?: string;
  hideClearIcon?: boolean;
  isEqual?: (option: ValueType, value: ValueType) => void;
  placeholder?: string;
  errorText?: string;
  tooltipTitle?: TooltipProps['title'];
}

export type DropdownItem = {
  label: string;
  value: string;
};

export default function Autocomplete({
  id,
  label,
  values,
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
          {label}
          {tooltipTitle && <IconTooltip placement='top' title={tooltipTitle} />}
        </label>
      )}
      <TextField {...params} variant='outlined' size='small' placeholder={placeholder} className={errorText ? 'auto-complete--error' : ''} />
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
      options={values}
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
