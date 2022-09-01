import moment from 'moment';
import 'moment/min/locales';
import React, { KeyboardEventHandler } from 'react';
import { TextField } from '@mui/material';
import { LocalizationProvider, DesktopDatePicker } from '@mui/x-date-pickers';
import { AdapterDateFns } from '@mui/x-date-pickers/AdapterDateFns';
import './styles.scss';

export interface Props {
  id: string;
  label: React.ReactNode;
  value?: string | null;
  onChange: (id: string, value?: string | null) => void;
  'aria-label': string;
  onKeyPress?: KeyboardEventHandler;
  maxDate?: string;
  error?: boolean;
  helperText?: string;
  disabled?: boolean;
  className?: string;
}

export default function DatePicker(props: Props): JSX.Element {
  React.useEffect(() => {
    moment.locale([window.navigator.language, 'en']);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [window.navigator.language]);

  return (
    <div className={`date-picker ${props.className}`}>
      <LocalizationProvider dateAdapter={AdapterDateFns}>
        {props.label && (
          <label htmlFor={props.id} className='textfield-label'>
            {props.label}
          </label>
        )}
        <DesktopDatePicker
          inputFormat='yyyy-MM-dd'
          value={props.value ? moment(props.value, 'YYYY-MM-DD').toDate() : null}
          onChange={(newValue: string | null) => {
            props.onChange(props.id, newValue);
          }}
          renderInput={(params) => <TextField {...params} id={props.id} onKeyPress={props.onKeyPress} />}
          disabled={props.disabled}
        />
      </LocalizationProvider>
    </div>
  );
}
