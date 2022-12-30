import { FormControl, InputLabel, MenuItem, Select, SelectChangeEvent, TooltipProps } from '@mui/material';
import SelectT from './Select/SelectT';
import { makeStyles } from '@mui/styles';
import React from 'react';

export interface Props {
  id: string;
  propertyName: string;
  label: string;
  values?: DropdownItem[];
  onChange: (propertyName: string, value: string) => void;
  selected: string | undefined;
  disabled?: boolean;
}

const useStyles = makeStyles(() => ({
  formControl: {
    width: '100%',
  },
}));

export type DropdownItem = {
  label: string;
  value: string;
};

export function DropdownV1({ id, propertyName, label, values, onChange, selected, disabled }: Props): JSX.Element {
  const onChangeHandler = (event: SelectChangeEvent<string>, _child: React.ReactNode) => {
    onChange(propertyName, event.target.value as string);
  };
  const classes = useStyles();

  return (
    <FormControl variant='outlined' className={classes.formControl} size='small' disabled={disabled}>
      <InputLabel id={`${id}-outlined-label`}>{label}</InputLabel>
      <Select labelId={`${id}-outlined-label`} id={id} label={label} onChange={onChangeHandler} value={selected}>
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
  label?: string;
  disabled?: boolean;
  id?: string;
  className?: string;
  helperText?: string | string[];
  placeholder?: string;
  errorText?: string | string[];
  warningText?: string | string[];
  selectedValue?: string;
  readonly?: boolean;
  options?: DropdownItem[];
  fullWidth?: boolean;
  hideArrow?: boolean;
  onBlur?: () => void;
  onFocus?: () => void;
  fixedMenu?: boolean;
  tooltipTitle?: TooltipProps['title'];
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
  const { selectedValue, onChange, ...remainingProps } = props;
  const selectedItem = props.options?.find((option) => option.value === selectedValue);

  return (
    <SelectT<DropdownItem>
      {...remainingProps}
      selectedValue={selectedItem}
      isEqual={(A: DropdownItem, B: DropdownItem) => A.value === B.value}
      renderOption={(option: DropdownItem) => option.label}
      toT={(str: string) => ({ label: str, value: str } as DropdownItem)}
      displayLabel={(option: DropdownItem) => option?.label || ''}
      onChange={(option: DropdownItem) => onChange(option.value)}
      tooltipTitle={props.tooltipTitle}
    />
  );
}
