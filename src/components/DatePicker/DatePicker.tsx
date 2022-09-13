import moment from 'moment';
import 'moment/min/locales';
import React, { KeyboardEventHandler } from 'react';
import { TextField } from '@mui/material';
import { LocalizationProvider, DesktopDatePicker } from '@mui/x-date-pickers';
import { AdapterDateFns } from '@mui/x-date-pickers/AdapterDateFns';
import Icon from '../Icon/Icon';
import './styles.scss';

export interface Props {
  id: string;
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
  React.useEffect(() => {
    moment.locale([window.navigator.language, 'en']);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [window.navigator.language]);

  const renderInput = (params: object) => (
    <>
      <TextField
        {...params}
        id={props.id}
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

  return (
    <div className={`date-picker ${props.className} ${props.errorText ? 'date-picker--error' : ''}`}>
      <LocalizationProvider dateAdapter={AdapterDateFns}>
        {props.label && (
          <label htmlFor={props.id} className='textfield-label'>
            {props.label}
          </label>
        )}
        <DesktopDatePicker
          onError={props.onError}
          minDate={props.minDate}
          maxDate={props.maxDate}
          inputFormat='yyyy-MM-dd'
          value={props.value ? moment(props.value, 'YYYY-MM-DD').toDate() : null}
          onChange={(newValue: string | null) => {
            props.onChange(props.id, newValue);
          }}
          renderInput={renderInput}
          disabled={props.disabled}
        />
      </LocalizationProvider>
    </div>
  );
}
