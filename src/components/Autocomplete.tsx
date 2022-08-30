import { Autocomplete as MUIAutocomplete, TextField } from '@mui/material';
import React, { ChangeEvent } from 'react';

export interface Props<T> {
  id: string;
  label: string;
  options: T[];
  onChange: (id: string, value: T | string) => void;
  selected: T | undefined;
  disabled?: boolean;
  freeSolo: boolean;
  renderOption?: (props: object, option: T, state: object) => React.ReactNode;
  optionLabel: (option: any) => string;
  optionSelected?: (option: T, value: T) => boolean;
  defaultValue: T;
}

export default function Autocomplete<T>({
  id,
  label,
  options,
  onChange,
  selected,
  disabled,
  freeSolo,
  renderOption,
  optionLabel,
  optionSelected,
  defaultValue,
}: Props<T>): JSX.Element {
  const onChangeHandler = (event: ChangeEvent<any>, value: string | T | null) => {
    if (event) {
      if (value) {
        onChange(id, value);
      } else {
        onChange(id, defaultValue);
      }
    }
  };

  return (
    <MUIAutocomplete
      disabled={disabled}
      id={id}
      options={options}
      getOptionLabel={optionLabel}
      isOptionEqualToValue={optionSelected}
      renderOption={renderOption}
      onChange={onChangeHandler}
      onInputChange={onChangeHandler}
      inputValue={optionLabel(selected)}
      freeSolo={freeSolo}
      forcePopupIcon={true}
      renderInput={(params) => <TextField {...params} label={label} variant='outlined' size='small' />}
    />
  );
}

// Default string based autocomplete

export interface SimpleAutocompleteProps {
  id: string;
  label: string;
  options: string[];
  onChange: (id: string, value: string) => void;
  selected: string | undefined;
  disabled?: boolean;
  freeSolo: boolean;
}

export function SimpleAutocomplete(props: SimpleAutocompleteProps): JSX.Element {
  return (
    <Autocomplete
      {...props}
      optionLabel={(option) => (option ? option : '')}
      optionSelected={(option, value) => option === value}
      defaultValue={''}
    />
  );
}
