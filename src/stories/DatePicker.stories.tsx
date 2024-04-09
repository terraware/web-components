import { Story as StoryBook } from '@storybook/react';
import { Box, useTheme } from '@mui/material';
import { action } from '@storybook/addon-actions';
import React, { ReactElement, useState } from 'react';
import DatePicker, { DateType, Props as DatePickerProps } from '../components/DatePicker/DatePicker';
import { DateTime } from 'luxon';

export default {
  title: 'DatePicker',
  component: DatePicker,
  decorators: [
    (Story: typeof React.Component): ReactElement => {
      return <Story />;
    },
  ],
};

const onError = (reason: any, value: any) => {
  action(`Invalid date ${value?.toString()}, ${reason?.toString()}`);
};

const Template: StoryBook<DatePickerProps> = (args) => {
  const [value, setValue] = useState<DateType | undefined>(args.value);
  const theme = useTheme();

  return (
    <Box sx={{ backgroundColor: theme.palette.gray[200] }} width='200px' padding={2}>
      <DatePicker
        {...args}
        value={value}
        onChange={(v) => {
          action('onChange')(v);
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
  defaultTimeZone: undefined,
  errorText: '',
  helperText: '',
  id: '1',
  label: 'Datepicker',
  locale: undefined,
  maxDate: Date.now(),
  minDate: undefined,
  value: '2024-04-09',
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
