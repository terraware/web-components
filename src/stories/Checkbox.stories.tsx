import React from 'react';
import { action } from '@storybook/addon-actions';
import { Story } from '@storybook/react';

import Checkbox, { Props as CheckboxProps } from '../components/Checkbox';

export default {
  title: 'Checkbox',
  component: Checkbox,
};

const Template: Story<CheckboxProps> = (args) => {
  const [value, setValue] = React.useState(true);
  const toggleChange = (_value: boolean) => {
    action('onChange')(_value);
    setValue(_value);
  };

  return <Checkbox {...args} onChange={toggleChange} value={value} sx={{ width: '200px' }} />;
};

export const Default = Template.bind({});
export const TopAlignLongLabel = Template.bind({});

Default.args = {
  id: '1',
  name: 'Test',
  label: 'Test',
  disabled: false,
};

TopAlignLongLabel.args = {
  id: '2',
  name: 'Alignment Test',
  label: 'The Quick Brown Fox Jumped Over The Silly Lazy Goat',
  disabled: false,
};
