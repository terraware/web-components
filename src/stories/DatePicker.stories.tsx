import React, { ReactElement, useState } from 'react';

import { Box, useTheme } from '@mui/material';
import { action } from '@storybook/addon-actions';
import { Story as StoryBook } from '@storybook/react';
import { DateTime } from 'luxon';

import DatePicker, { DatePickerDateType, Props as DatePickerProps } from '../components/DatePicker/DatePicker';

export default {
  title: 'DatePicker',
  component: DatePicker,
  decorators: [
    (Story: typeof React.Component): ReactElement<any> => {
      return <Story />;
    },
  ],
};

const onError = (reason: any, value: any) => {
  action(`Invalid date ${value?.toString()}, ${reason?.toString()}`);
};

const Template: StoryBook<DatePickerProps> = (args) => {
  const [value, setValue] = useState<DatePickerDateType | undefined>(args.value);
  const theme = useTheme();

  return (
    <Box sx={{ backgroundColor: theme.palette.gray[200] }} width='200px' padding={2}>
      <DatePicker
        {...args}
        value={value}
        onChange={(v) => {
          action('onChange')(v);
        }}
        onDateChange={(v) => {
          action('onDateChange')(v);
          setValue(v);
        }}
        onError={onError}
      />
    </Box>
  );
};

export const Default = Template.bind({});

Default.args = {
  autoFocus: false,
  defaultTimeZone: undefined,
  errorText: '',
  helperText: '',
  id: '1',
  label: 'Datepicker',
  locale: undefined,
  maxDate: undefined,
  minDate: undefined,
};

export const StringValueInitializedDate = Template.bind({});

StringValueInitializedDate.args = {
  autoFocus: false,
  defaultTimeZone: undefined,
  errorText: '',
  helperText: '',
  id: '1',
  label: 'Datepicker',
  locale: undefined,
  maxDate: Date.now(),
  minDate: undefined,
  value: new Date().toISOString(),
};

export const YYMMDDInitializedDate = Template.bind({});

YYMMDDInitializedDate.args = {
  autoFocus: false,
  defaultTimeZone: 'Asia/Omsk',
  errorText: '',
  helperText: '',
  id: '1',
  label: 'Datepicker',
  locale: undefined,
  maxDate: new Date(),
  minDate: undefined,
  value: '2024-04-10',
};

export const NumericValueInitializedDate = Template.bind({});

NumericValueInitializedDate.args = {
  autoFocus: false,
  defaultTimeZone: undefined,
  errorText: '',
  helperText: '',
  id: '1',
  label: 'Datepicker',
  locale: undefined,
  maxDate: Date.now(),
  minDate: undefined,
  value: Date.now(),
};

export const LuxonValueInitializedDate = Template.bind({});

const luxonNow = DateTime.now().setZone('Asia/Calcutta');

LuxonValueInitializedDate.args = {
  autoFocus: false,
  defaultTimeZone: 'Asia/Calcutta',
  errorText: '',
  helperText: '',
  id: '1',
  label: 'Datepicker',
  locale: undefined,
  maxDate: luxonNow.plus({ days: 7 }),
  minDate: luxonNow.minus({ months: 1 }),
  value: luxonNow.minus({ days: 7 }),
};

export const DateTimePicker = Template.bind({});

DateTimePicker.args = {
  autoFocus: false,
  defaultTimeZone: undefined,
  errorText: '',
  helperText: '',
  id: '1',
  label: 'DateTimepicker',
  locale: undefined,
  maxDate: undefined,
  minDate: undefined,
  showTime: true,
  placeholder: 'yyyy-mm-dd  hh:mm',
};
