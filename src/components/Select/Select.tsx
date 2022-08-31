import classNames from 'classnames';
import React, { ChangeEvent, KeyboardEvent, useEffect, useRef, useState } from 'react';
import Icon from '../Icon/Icon';
import './styles.scss';
import { isWhitespaces } from '../../utils';
import SelectT from './SelectT';

export interface SelectProps {
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
  options?: string[];
  fullWidth?: boolean;
  hideArrow?: boolean;
  onBlur?: () => void;
  onFocus?: () => void;
  fixedMenu?: boolean;
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
