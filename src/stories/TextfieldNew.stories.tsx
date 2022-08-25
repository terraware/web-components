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
    type: {
      options: ['text', 'textarea'],
      control: { type: 'radio' },
    },
  },
};

const Template: Story<TextFieldProps> = (args) => {
  const [value, setValue] = React.useState('');
  const handleChange = (id: string, v: unknown) => {
    setValue(v as string);
  };

  return <TextField {...args} value={value} onChange={handleChange} />;
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
  type: 'text',
};
