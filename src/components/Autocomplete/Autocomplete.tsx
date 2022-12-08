import { Autocomplete as MUIAutocomplete, TextField, Theme } from '@mui/material';
import classNames from 'classnames';
import React, { ChangeEvent } from 'react';
import './styles.scss';
import { makeStyles } from '@mui/styles';

const useStyles = makeStyles((theme: Theme) => ({
  datePickerInput: {
    '& .MuiInputBase-input': {
      height: '18px',
    },
    '& .MuiIconButton-root': {
      color: theme.palette.TwClrIcnSecondary,
    },
    '& .MuiOutlinedInput-root': {
      '&:hover fieldset': {
        borderColor: theme.palette.TwClrBrdrHover,
      },
      '&.Mui-focused fieldset': {
        borderColor: theme.palette.TwClrBrdrHover,
      },
    },
  },
  autocomplete: {
    '& .MuiInputBase-input': {
      height: '21px',
    },
    '& .MuiOutlinedInput-root': {
      '&:hover fieldset': {
        borderColor: theme.palette.TwClrBrdrHover,
      },
      '&.Mui-focused fieldset': {
        borderColor: theme.palette.TwClrBrdrHover,
      },
    },
  },
}));

export interface Props {
  id: string;
  label: string;
  values: string[];
  onChange: (id: string, value: string) => void;
  selected: string | undefined;
  freeSolo: boolean;
  disabled?: boolean;
  className?: string;
  isV1?: boolean; // deprecated
}

export type DropdownItem = {
  label: string;
  value: string;
};

export default function Autocomplete({ id, label, values, onChange, selected, freeSolo, disabled, className, isV1 }: Props): JSX.Element {
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
      {label && isV1 !== true && (
        <label htmlFor={id} className='textfield-label'>
          {label}
        </label>
      )}
      <TextField label={isV1 ? label : undefined} {...params} variant='outlined' size='small' placeholder={label} />
    </div>
  );

  return (
    <MUIAutocomplete
      disabled={disabled}
      id={id}
      options={values}
      getOptionLabel={(option) => (option ? option : '')}
      onChange={onChangeHandler}
      onInputChange={onChangeHandler}
      inputValue={selected}
      freeSolo={freeSolo}
      forcePopupIcon={true}
      renderInput={renderInput}
      className={classes.autocomplete}
    />
  );
}
