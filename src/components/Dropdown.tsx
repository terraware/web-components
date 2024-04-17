import { FormControl, InputLabel, MenuItem, Select, SelectChangeEvent, TooltipProps } from '@mui/material';
import { DropdownItem } from './types';
import SelectT, { SelectStyles } from './Select/SelectT';
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

export interface DropdownProps {
  onChange: (newValue: string) => void;
  id?: string;
  label?: string;
  options?: DropdownItem[];
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
  selectStyles?: SelectStyles;

  // auto complete props
  freeSolo?: boolean;
  hideClearIcon?: boolean;

  autocomplete?: boolean;
  required?: boolean;
}

/**
 * This is a simple dropdwn that takes in a tuple { label, value }
 * for list of options.
 * The label is used for display, the value is passed back in onChange, and used to set selectedValue.
 *
 * Example:
 * <Dropdown
 *   options=[{ label: 'label', value: 'value'}, { label: 'label1': value: 'value1'} ]
 *   onChange={(value: string) => setSomeValue(value)}
 *   selectedValue={'value1'}
 * />
 */
export default function Dropdown(props: DropdownProps): JSX.Element {
  const { selectedValue, onChange, options, autocomplete, ...remainingProps } = props;

  const selectedItem = options?.find((option) => option.value === selectedValue);

  const renderOption = (option: DropdownItem): React.ReactNode => {
    const styles = {
      fontWeight: option.fontWeight || 'normal',
      fontStyle: option.fontStyle || 'normal',
    };

    return <span style={styles}>{option.label}</span>;
  };

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
      renderOption={renderOption}
      toT={(str: string) => ({ label: str, value: str } as DropdownItem)}
      displayLabel={(option: DropdownItem) => option?.label || ''}
      onChange={(option: DropdownItem) => onChange(option.value)}
    />
  );
}
