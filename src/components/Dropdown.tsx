import { FormControl, InputLabel, MenuItem, Select, SelectChangeEvent, TooltipProps } from '@mui/material';
import { DropdownItem } from './types';
import SelectT from './Select/SelectT';
import Autocomplete, { ValueType } from './Autocomplete/Autocomplete';
import { makeStyles } from '@mui/styles';
import React from 'react';

export interface Props {
  id: string;
  label: string;
  values?: DropdownItem[];
  onChange: (value: string) => void;
  selected: string | undefined;
  disabled?: boolean;
}

const useStyles = makeStyles(() => ({
  formControl: {
    width: '100%',
  },
}));

export function DropdownV1({ id, label, values, onChange, selected, disabled }: Props): JSX.Element {
  const onChangeH = (event: SelectChangeEvent<string>, _child: React.ReactNode) => {
    onChange(event.target.value as string);
  };
  const classes = useStyles();

  return (
    <FormControl variant='outlined' className={classes.formControl} size='small' disabled={disabled}>
      <InputLabel id={`${id}-outlined-label`}>{label}</InputLabel>
      <Select labelId={`${id}-outlined-label`} id={id} label={label} onChange={onChangeH} value={selected}>
        {values?.map(({ label: inLabel, value }) => (
          <MenuItem id={value} key={value} value={value}>
            {inLabel}
          </MenuItem>
        ))}
      </Select>
    </FormControl>
  );
}

export interface DropdownProps<T = string> {
  onChange: (newValue: T) => void;
  id?: string;
  label?: string;
  options?: DropdownItem<T>[];
  selectedValue?: any;
  disabled?: boolean;
  className?: string;
  placeholder?: string;
  errorText?: string;
  tooltipTitle?: TooltipProps['title'];

  // select props
  helperText?: string | string[];
  warningText?: string | string[];
  readonly?: boolean;
  fullWidth?: boolean;
  hideArrow?: boolean;
  onBlur?: () => void;
  onFocus?: () => void;
  fixedMenu?: boolean;

  // auto complete props
  freeSolo?: boolean;
  hideClearIcon?: boolean;

  autocomplete?: boolean;
  required?: boolean;
}

/**
 * This is a simple dropdown that takes in a tuple { label, value }
 * for list of options.
 * The label is used for display, the value is passed back in onChange, and used to set selectedValue.
 *
 * Example:
 * <Dropdown
 *   options=[{ label: 'label', value: 'value'}, { label: 'label1': value: 'value1'} ]
 *   onChange={(value: string) => setSomeValue(value)}
 *   selectedValue={'value1'}
 * />
 *
 * You can also explicitly define the options[].value type by passing a type into the Dropdown:
 *
 * // This could also be `number` for example. It defaults to `string`
 * type SpecificValues = 'value1' | 'value2';
 * const options: DropdownItem<SpecificValues> = [{...}, {...}];
 *
 * <Dropdown<SpecificValues>
 *     options={options}
 *     ...
 *     // onChange will use the generic type
 *     onChange={(value: SpecificValues} => setSomeValue(value)}
 *     ...
 * />
 */
export default function Dropdown<T = string>(props: DropdownProps<T>): JSX.Element {
  const { selectedValue, onChange, options, autocomplete, ...remainingProps } = props;

  const selectedItem = options?.find((option) => option.value === selectedValue);

  if (autocomplete) {
    return (
      <Autocomplete
        {...remainingProps}
        options={options ?? []}
        selected={selectedItem || ''}
        isEqual={(A: ValueType, B: ValueType) => (A as DropdownItem).value === (B as DropdownItem).value}
        onChange={(option: ValueType) => onChange((option as DropdownItem).value)}
      />
    );
  }

  return (
    <SelectT<DropdownItem>
      {...remainingProps}
      options={options}
      selectedValue={selectedItem}
      isEqual={(A: DropdownItem, B: DropdownItem) => A.value === B.value}
      renderOption={(option: DropdownItem) => option.label}
      toT={(str: string) => ({ label: str, value: str } as DropdownItem)}
      displayLabel={(option: DropdownItem) => option?.label || ''}
      onChange={(option: DropdownItem) => onChange(option.value)}
    />
  );
}
