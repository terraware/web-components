import React, { KeyboardEventHandler, useState } from 'react';

import { Box, SxProps } from '@mui/material';
import { DesktopDatePicker, DesktopDateTimePicker, LocalizationProvider } from '@mui/x-date-pickers';
import { AdapterLuxon } from '@mui/x-date-pickers/AdapterLuxon';
import { DateTime, Settings } from 'luxon';

import { DateType, getDate, tz } from '../../utils/date';
import Icon from '../Icon/Icon';
import './styles.scss';

/**
 * TODO: remove support for JS Date in DatePickerDateType once
 * clients have moved to only using DateTime objects in input props
 * and callback arguments.
 * export type DatePickerDateType = Exclude<DateType, Date> | null;
 */
export type DatePickerDateType = DateType | null;

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
  /**
   * @deprecated Use onDateChange and switch to
   *  handling luxon DateTime arguments.
   */
  onChange?: (value?: Date | null) => void;
  /**
   * TODO: remove deprecated onChange and
   * make onDateChange required once all clients
   * have migrated to using onDateChange.
   */
  onDateChange?: (value?: DateTime) => void;
  onError?: (reason: any, value: any) => void;
  onKeyPress?: KeyboardEventHandler;
  sx?: SxProps;
  value?: DatePickerDateType;
  showTime?: boolean;
  placeholder?: string;
}

const initializeDate = (value?: DatePickerDateType, timeZoneId?: string): DateTime | null => {
  if (!value) {
    return null;
  }

  const date = getDate(value, timeZoneId);

  return date?.isValid ? date : null;
};

export default function DatePicker(props: Props): JSX.Element {
  const [temporalValue, setTemporalValue] = useState<DateTime | null>(
    initializeDate(props.value, props.defaultTimeZone)
  );
  const [minDateTime, setMinDateTime] = useState<DateTime | null>(initializeDate(props.minDate, props.defaultTimeZone));
  const [maxDateTime, setMaxDateTime] = useState<DateTime | null>(initializeDate(props.maxDate, props.defaultTimeZone));
  const locale = props.locale ?? 'en';
  Settings.defaultZone = tz(props.defaultTimeZone);

  React.useEffect(() => {
    setTemporalValue((prev) => {
      if (props.value !== prev && props.value) {
        return initializeDate(props.value, props.defaultTimeZone);
      } else {
        return prev;
      }
    });
  }, [props.defaultTimeZone, props.value]);

  React.useEffect(() => {
    setMinDateTime(initializeDate(props.minDate, props.defaultTimeZone));
  }, [props.defaultTimeZone, props.minDate]);

  React.useEffect(() => {
    setMaxDateTime(initializeDate(props.maxDate, props.defaultTimeZone));
  }, [props.defaultTimeZone, props.maxDate]);

  // TODO: Localize the yyyy-mm-dd placeholder string that is shown to users when the input is
  //       empty. It appears to be generated programmatically deep in the guts of the MUI DatePicker
  //       code, and it most likely uses the browser's locale.
  return (
    <Box className={`date-picker ${props.className} ${props.errorText ? 'date-picker--error' : ''}`} sx={props.sx}>
      <LocalizationProvider dateAdapter={AdapterLuxon} adapterLocale={locale}>
        {props.label && (
          <label htmlFor={props.id} className='textfield-label'>
            {props.label}
          </label>
        )}
        {props.showTime ? (
          <DesktopDateTimePicker
            disabled={props.disabled}
            minDate={minDateTime && minDateTime.isValid ? minDateTime : undefined}
            maxDate={maxDateTime && maxDateTime.isValid ? maxDateTime : undefined}
            onChange={(newValue: DateTime | null) => {
              setTemporalValue(newValue);
              // TODO: remove onChange and make onDateChange required
              if (props.onChange) {
                props.onChange(newValue && newValue.isValid ? newValue.toJSDate() : null);
              }
              if (props.onDateChange) {
                props.onDateChange(newValue && newValue.isValid ? newValue : undefined);
              }
            }}
            onError={props.onError}
            slotProps={{
              textField: {
                sx: {
                  '& fieldset': {
                    border: 'none',
                  },
                  '& .MuiFormHelperText-root': {
                    marginLeft: 0,
                  },
                },
                helperText: props.errorText ? (
                  <div className='textfield-error-text-container'>
                    <Icon name='error' className='textfield-error-text--icon' />
                    <label htmlFor={props.id} className='textfield-error-text'>
                      {props.errorText}
                    </label>
                  </div>
                ) : (
                  props.helperText
                ),
                id: props.id,
                placeholder: props.placeholder,
                autoFocus: props.autoFocus,
                onKeyPress: props.onKeyPress,
              },
            }}
            value={temporalValue}
          />
        ) : (
          <DesktopDatePicker
            disabled={props.disabled}
            format='yyyy-MM-dd'
            minDate={minDateTime && minDateTime.isValid ? minDateTime : undefined}
            maxDate={maxDateTime && maxDateTime.isValid ? maxDateTime : undefined}
            onChange={(newValue: DateTime | null) => {
              setTemporalValue(newValue);
              // TODO: remove onChange and make onDateChange required
              if (props.onChange) {
                props.onChange(newValue && newValue.isValid ? newValue.toJSDate() : null);
              }
              if (props.onDateChange) {
                props.onDateChange(newValue && newValue.isValid ? newValue : undefined);
              }
            }}
            onError={props.onError}
            slotProps={{
              textField: {
                sx: {
                  '& fieldset': {
                    border: 'none',
                  },
                  '& .MuiFormHelperText-root': {
                    marginLeft: 0,
                  },
                },
                helperText: props.errorText ? (
                  <div className='textfield-error-text-container'>
                    <Icon name='error' className='textfield-error-text--icon' />
                    <label htmlFor={props.id} className='textfield-error-text'>
                      {props.errorText}
                    </label>
                  </div>
                ) : (
                  props.helperText
                ),
                id: props.id,
                placeholder: props.placeholder,
                autoFocus: props.autoFocus,
                onKeyPress: props.onKeyPress,
              },
            }}
            value={temporalValue}
          />
        )}
      </LocalizationProvider>
    </Box>
  );
}
