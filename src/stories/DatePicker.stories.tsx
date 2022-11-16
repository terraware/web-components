import { Story as StoryBook } from '@storybook/react';
import { Box, useTheme } from '@mui/material';
import { action } from '@storybook/addon-actions';
import React, { ReactElement, useState } from 'react';
import DatePicker, { Props as DatePickerProps } from '../components/DatePicker/DatePicker';

export default {
  title: 'DatePicker',
  component: DatePicker,
  decorators: [
    (
      Story: typeof React.Component
    ): ReactElement => {
      return (
        <Story />
      );
    },
  ],
};

const onError = (reason: any, value: any) => {
  action(`Invalid date ${value?.toString()}, ${reason?.toString()}`);
};

const Template: StoryBook<DatePickerProps> = (args) => {
  const [value, setValue] = useState<string|undefined|null>();
  const theme = useTheme();

  return (
    <Box sx={{backgroundColor: theme.palette.gray[200]}} width='200px' padding={2}>
      <DatePicker
        {...args}
        value={value}
        onChange={(i, v) => {
          setValue(v);
        }}
        onError={onError}
      />
    </Box>
  );
};

export const Default = Template.bind({});

Default.args = {
  id: '1',
  label: 'Datepicker',
  minDate: undefined,
  maxDate: Date.now(),
  errorText: '',
  helperText: '',
  autoFocus: false,
};
