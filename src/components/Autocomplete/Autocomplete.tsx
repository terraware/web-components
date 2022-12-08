import { Box, Autocomplete as MUIAutocomplete, TextField, Theme } from '@mui/material';
import React, { ChangeEvent } from 'react';
import { makeStyles } from '@mui/styles';
import Icon from '../Icon/Icon';
import './styles.scss';

const useStyles = makeStyles((theme: Theme) => ({
  paper: {
    marginTop: theme.spacing(1),
  },
}));

export type Option = {
  value: any;
  label: string;
};

export type ValueType = string | Option;

export interface Props {
  id: string;
  label: string;
  values: ValueType[];
  onChange: (id: string, value: ValueType) => void;
  selected: ValueType | undefined;
  freeSolo: boolean;
  disabled?: boolean;
  className?: string;
  hideClearIcon?: boolean;
}

export type DropdownItem = {
  label: string;
  value: string;
};

export default function Autocomplete({ id, label, values, onChange, selected, freeSolo, disabled, className, hideClearIcon }: Props): JSX.Element {
  const classes = useStyles();

  const onChangeHandler = (event: ChangeEvent<any>, value: string | null) => {
    if (event) {
      if (value) {
        onChange(id, value);
      } else {
        onChange(id, '');
      }
    }
  };

  const renderInput = (params: object) => (
    <div className={`auto-complete ${className}`}>
      {label && (
        <label htmlFor={id} className='textfield-label'>
          {label}
        </label>
      )}
      <TextField {...params} variant='outlined' size='small' placeholder={label} />
    </div>
  );

  const optionalArgs: any = {};

  if (hideClearIcon) {
    optionalArgs.clearIcon = null;
  }

  return (
    <MUIAutocomplete
      disableRipple={true}
      disabled={disabled}
      id={id}
      options={values}
      getOptionLabel={(option: any) => (option ? (option.label || option) : '')}
      onChange={onChangeHandler}
      onInputChange={onChangeHandler}
      inputValue={(selected as Option)?.label || selected}
      freeSolo={freeSolo}
      forcePopupIcon={true}
      renderInput={renderInput}
      popupIcon={<Icon name='chevronDown' className='auto-complete--icon-right' size='medium'/>}
      classes={{
        paper: classes.paper,
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
