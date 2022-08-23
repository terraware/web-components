// YourComponent.stories.js

import { Story } from '@storybook/react';
import React from 'react';
import Select, { SelectProps } from '../components/Select/Select';

export default {
  title: 'Select',
  component: Select,
};

const Template: Story<SelectProps> = (args) => {
  // tslint:disable-next-line:no-unused-vars
  const [value, setValue] = React.useState('');
  const handleChange = (str: string) => {
    setValue(str);
  };

  return <Select {...args} onChange={handleChange} />;
};

export const Default = Template.bind({});

Default.args = {
  label: 'Field Label',
  disabled: false,
  helperText: 'Help Text',
  placeholder: 'placeholder',
  errorText: '',
  warningText: '',
  readonly: false,
  options: ['test 1', 'test 2', 'test 3'],
};
