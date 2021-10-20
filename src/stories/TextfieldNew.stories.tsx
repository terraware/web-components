// YourComponent.stories.js

import { Story } from '@storybook/react';
import React from 'react';
import TextField, { Props as TextFieldProps } from '../components/Textfield/Textfield';

export default {
  title: 'TextField New',
  component: TextField,
  argTypes: {
    iconLeft: {
      options: ['lock', 'caretDown', 'plus', null],
      control: { type: 'radio' },
    },
    iconRight: {
      options: ['lock', 'caretDown', 'plus', null],
      control: { type: 'radio' },
    },
  },
};

const Template: Story<TextFieldProps> = (args) => {
  return <TextField {...args} />;
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
  display: false,
  value: '',
};
