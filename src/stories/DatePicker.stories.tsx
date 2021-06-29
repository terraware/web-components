// YourComponent.stories.js

import MomentUtils from '@date-io/moment';
import { MuiPickersUtilsProvider } from '@material-ui/pickers';
import { Story as StoryBook } from '@storybook/react';
import React, { ReactElement } from 'react';
import DatePicker, { Props as DatePickerProps } from '../components/DatePicker';

export default {
  title: 'DatePicker',
  component: DatePicker,
  decorators: [
    (
      Story: typeof React.Component
    ): ReactElement<typeof MuiPickersUtilsProvider> => {
      return (
        <MuiPickersUtilsProvider utils={MomentUtils}>
          <Story />
        </MuiPickersUtilsProvider>
      );
    },
  ],
};

const Template: StoryBook<DatePickerProps> = (args) => {
  return <DatePicker {...args} />;
};

export const Default = Template.bind({});

Default.args = {
  id: '1',
  label: 'Datepicker',
};
