// YourComponent.stories.js

import { Story } from '@storybook/react';
import React from 'react';
import TextField, { Props as TextFieldProps } from '../components/Textfield/Textfield';

export default {
  title: 'TextField New',
  component: TextField,
};

const Template: Story<TextFieldProps> = (args) => {
  return <TextField label='Field Label' helperText='Help Text' />;
};

export const Default = Template.bind({});

Default.args = {
  label: 'Label',
  type: 'productive',
  priority: 'primary',
  size: 'small',
  disabled: false,
};
