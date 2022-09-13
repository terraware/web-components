import { Story as StoryBook } from '@storybook/react';
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
  action(`Invalid date ${value.toString()}, ${reason.toString()}`);
};

const Template: StoryBook<DatePickerProps> = (args) => {
  const [value, setValue] = useState<string|undefined|null>();

  return (
    <DatePicker
      {...args}
      value={value}
      onChange={(i, v) => setValue(v)}
      onError={onError}
    />
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
};
