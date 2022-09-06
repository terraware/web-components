import { Autocomplete as MUIAutocomplete, TextField } from '@mui/material';
import React, { ChangeEvent } from 'react';
import './styles.scss';

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

export default function Autocomplete({
  id,
  label,
  values,
  onChange,
  selected,
  freeSolo,
  disabled,
  className,
  isV1,
}: Props): JSX.Element {
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
    />
  );
}
