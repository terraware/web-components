import moment from 'moment-timezone';
import 'moment/min/locales';
import React, { useState, KeyboardEventHandler } from 'react';
import { TextField } from '@mui/material';
import { LocalizationProvider, DesktopDatePicker } from '@mui/x-date-pickers';
import { AdapterMoment } from '@mui/x-date-pickers/AdapterMoment';
import Icon from '../Icon/Icon';
import './styles.scss';

export interface Props {
  id: string;
  autoFocus?: boolean;
  label: React.ReactNode;
  value?: string | null;
  onChange: (id: string, value?: string | null) => void;
  'aria-label': string;
  onKeyPress?: KeyboardEventHandler;
  minDate?: any;
  maxDate?: any;
  errorText?: string;
  helperText?: string;
  disabled?: boolean;
  className?: string;
  onError?: (reason: any, value: any) => void;
}

export default function DatePicker(props: Props): JSX.Element {
  const [temporalValue, setTemporalValue] = useState(props.value || null);
  React.useEffect(() => {
    moment.locale([window.navigator.language, 'en']);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [window.navigator.language]);

  const renderInput = (params: object) => (
    <>
      <TextField
        {...params}
        id={props.id}
        autoFocus={props.autoFocus}
        onKeyPress={props.onKeyPress}
      />
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

  // set default timezone to UTC
  moment.tz.setDefault('UTC');

  return (
    <div className={`date-picker ${props.className} ${props.errorText ? 'date-picker--error' : ''}`}>
      <LocalizationProvider dateAdapter={AdapterMoment} dateLibInstance={moment}>
        {props.label && (
          <label htmlFor={props.id} className='textfield-label'>
            {props.label}
          </label>
        )}
        <DesktopDatePicker
          onError={props.onError}
          minDate={props.minDate ? moment(props.minDate) : undefined}
          maxDate={props.maxDate ? moment(props.maxDate) : undefined}
          inputFormat='yyyy-MM-DD'
          value={temporalValue}
          onChange={(newValue: any) => {
            setTemporalValue(newValue);
            props.onChange(props.id, newValue?.isValid() ? newValue?.toDate() : null);
          }}
          renderInput={renderInput}
          disabled={props.disabled}
        />
      </LocalizationProvider>
    </div>
  );
}
