import React, { useState, KeyboardEventHandler } from 'react';
import { TextField } from '@mui/material';
import { LocalizationProvider, DesktopDatePicker } from '@mui/x-date-pickers';
import { AdapterLuxon } from '@mui/x-date-pickers/AdapterLuxon';
import { DateTime } from 'luxon';
import Icon from '../Icon/Icon';
import './styles.scss';
import { DateType, getDate } from '../../utils/date';

export type DatePickerDateType = Exclude<DateType, Date> | null;

export interface Props {
  'aria-label': string;
  autoFocus?: boolean;
  className?: string;
  defaultTimeZone?: string;
  disabled?: boolean;
  errorText?: string;
  helperText?: string;
  id: string;
  label: React.ReactNode;
  locale?: string;
  maxDate?: DatePickerDateType;
  minDate?: DatePickerDateType;
  onChange: (value?: DateTime | null) => void;
  onError?: (reason: any, value: any) => void;
  onKeyPress?: KeyboardEventHandler;
  value?: DatePickerDateType;
}

const initializeDate = (value?: DatePickerDateType, defaultTimeZone?: string): DateTime | null => {
  if (!value) {
    return null;
  }

  if (typeof value === 'string' || typeof value === 'number') {
    const date = getDate(value, defaultTimeZone);

    return date?.isValid ? date! : null;
  }

  return value as DateTime;
};

export default function DatePicker(props: Props): JSX.Element {
  const [temporalValue, setTemporalValue] = useState(initializeDate(props.value, props.defaultTimeZone));
  const locale = props.locale ?? 'en';

  React.useEffect(() => {
    if (props.value !== temporalValue && props.value !== null) {
      setTemporalValue(initializeDate(props.value, props.defaultTimeZone));
    }
  }, [props.defaultTimeZone, props.value]);

  const renderInput = (params: object) => (
    <>
      <TextField {...params} id={props.id} autoFocus={props.autoFocus} onKeyPress={props.onKeyPress} placeholder='yyyy-mm-dd' />
      {props.errorText && (
        <div className='textfield-error-text-container'>
          <Icon name='error' className='textfield-error-text--icon' />
          <label htmlFor={props.id} className='textfield-error-text'>
            {props.errorText}
          </label>
        </div>
      )}
    </>
  );

  // TODO: Localize the yyyy-mm-dd placeholder string that is shown to users when the input is
  //       empty. It appears to be generated programmatically deep in the guts of the MUI DatePicker
  //       code, and it most likely uses the browser's locale.
  return (
    <div className={`date-picker ${props.className} ${props.errorText ? 'date-picker--error' : ''}`}>
      <LocalizationProvider dateAdapter={AdapterLuxon} adapterLocale={locale}>
        {props.label && (
          <label htmlFor={props.id} className='textfield-label'>
            {props.label}
          </label>
        )}
        <DesktopDatePicker
          disabled={props.disabled}
          inputFormat='yyyy-MM-dd'
          minDate={initializeDate(props.minDate, props.defaultTimeZone) || undefined}
          maxDate={initializeDate(props.maxDate, props.defaultTimeZone) || undefined}
          onChange={(newValue: DateTime | null) => {
            setTemporalValue(newValue);
            props.onChange(newValue && newValue.isValid ? newValue : null);
          }}
          onError={props.onError}
          renderInput={renderInput}
          value={temporalValue}
        />
      </LocalizationProvider>
    </div>
  );
}
