// YourComponent.stories.js

import MomentUtils from '@date-io/moment';
import { Story as StoryBook } from '@storybook/react';
import React, { ReactElement, useState } from 'react';
import DatePicker, { Props as DatePickerProps } from '../components/DatePicker';
import { AdapterDateFns } from '@mui/x-date-pickers/AdapterDateFns';


export default {
  title: 'DatePicker',
  component: DatePicker,
  decorators: [
    (
      Story: typeof React.Component
    ): ReactElement<typeof MuiPickersUtilsProvider> => {
      return (
        <Story />
      );
    },
  ],
};

const Template: StoryBook<DatePickerProps> = (args) => {
  const [value, setValue] = useState();

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
};
