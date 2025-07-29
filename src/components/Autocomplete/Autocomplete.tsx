import React, { ChangeEvent } from 'react';

import { Box, Autocomplete as MUIAutocomplete, SxProps, TextField, TooltipProps } from '@mui/material';

import Icon from '../Icon/Icon';
import IconTooltip from '../IconTooltip';
import '../Select/styles.scss';
import { DropdownItem as Option } from '../types';
import './styles.scss';

export type ValueType = string | Option | undefined;

export interface Props {
  onChange: (value: ValueType) => void;
  options: ValueType[];
  id?: string;
  label?: string;
  selected?: ValueType;
  filterOptions?: (options: ValueType[], state: object) => ValueType[];
  freeSolo?: boolean;
  disabled?: boolean;
  className?: string;
  hideClearIcon?: boolean;
  isEqual?: (option: ValueType, value: ValueType) => void;
  placeholder?: string;
  errorText?: string;
  tooltipTitle?: TooltipProps['title'];
  required?: boolean;
  noOptionsText?: string;
  loading?: boolean;
  loadingText?: string;
  open?: boolean;
  onOpen?: (event: React.SyntheticEvent) => void;
  onClose?: (event: React.SyntheticEvent) => void;
  sx?: SxProps;
  renderOption?: (props: React.HTMLAttributes<HTMLLIElement>, option: ValueType) => React.ReactNode;
}

const isEmpty = (value: unknown) => ['', undefined].includes(value as string | undefined);

export default function Autocomplete({
  id,
  label,
  options,
  onChange,
  selected,
  filterOptions,
  freeSolo,
  disabled,
  className,
  hideClearIcon,
  isEqual,
  placeholder,
  errorText,
  tooltipTitle,
  required,
  noOptionsText,
  loading,
  loadingText,
  open,
  onOpen,
  onClose,
  sx,
  renderOption,
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
    <Box className={`auto-complete ${className}`} sx={sx}>
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
    </Box>
  );

  const optionalArgs: any = {};

  if (hideClearIcon) {
    optionalArgs.clearIcon = null;
  }

  if (isEqual) {
    optionalArgs.isOptionEqualToValue = isEqual;
  } else {
    optionalArgs.isOptionEqualToValue = (option: unknown, value: unknown) =>
      option === value || (isEmpty(option) && isEmpty(value));
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
      filterOptions={filterOptions}
      freeSolo={freeSolo}
      forcePopupIcon={true}
      renderInput={renderInput}
      aria-required={required}
      noOptionsText={noOptionsText}
      loading={loading}
      loadingText={loadingText}
      open={open}
      onOpen={onOpen}
      onClose={onClose}
      popupIcon={
        <Icon
          name={loading ? 'spinner' : open ? 'chevronUp' : 'chevronDown'}
          className='auto-complete--icon-right'
          size='medium'
        />
      }
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
      renderOption={renderOption}
    />
  );
}
