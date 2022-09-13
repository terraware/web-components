import { Story as StoryBook } from '@storybook/react';
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

const Template: StoryBook<DatePickerProps> = (args) => {
  const [value, setValue] = useState<string|undefined|null>();

  return (
    <DatePicker
      {...args}
      value={value}
      onChange={(i, v) => setValue(v)}
    />
  );
};

export const Default = Template.bind({});

Default.args = {
  id: '1',
  label: 'Datepicker',
  minDate: undefined,
  maxDate: Date.now(),
};
