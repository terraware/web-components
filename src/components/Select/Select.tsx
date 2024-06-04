import { SxProps, TooltipProps } from '@mui/material';
import React from 'react';

import './styles.scss';
import SelectT, { SelectStyles } from './SelectT';

export interface SelectProps {
  className?: string;
  disabled?: boolean;
  errorText?: string | string[];
  editable?: boolean;
  fixedMenu?: boolean;
  fullWidth?: boolean;
  helperText?: string | string[];
  hideArrow?: boolean;
  id?: string;
  label?: string;
  onBlur?: () => void;
  onChange: (newValue: string) => void;
  onFocus?: () => void;
  options?: string[];
  placeholder?: string;
  readonly?: boolean;
  selectedValue?: string;
  selectStyles?: SelectStyles;
  sx?: SxProps;
  tooltipTitle?: TooltipProps['title'];
  warningText?: string | string[];
}

export default function Select(props: SelectProps): JSX.Element {
  const toString = (option: string) => option;

  return (
    <SelectT
      {...props}
      isEqual={(A: string, B: string) => A === B}
      renderOption={toString}
      toT={toString}
      displayLabel={(option: any) => (option as string) || ''}
    />
  );
}
