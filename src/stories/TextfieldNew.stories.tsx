import { Story } from '@storybook/react';
import React from 'react';
import { Box } from '@mui/material';
import TextField, { Props as TextFieldProps } from '../components/Textfield/Textfield';

export default {
  title: 'TextField New',
  component: TextField,
  argTypes: {
    iconLeft: {
      options: ['search', 'chevronDown', null],
      control: { type: 'radio' },
    },
    iconRight: {
      options: ['calendar', 'chevronDown', 'cancel', null],
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

  return (
    <Box sx={{marginTop: '30px'}} width='500px'>
      <TextField {...args} value={value} onChange={handleChange} />
    </Box>
  );
};

const NumberTemplate: Story<TextFieldProps> = (args) => {
  const [value, setValue] = React.useState(0);
  const handleChange = (id: string, v: unknown) => {
    setValue(v as number);
  };

  return (
    <Box sx={{marginTop: '30px'}}>
      <TextField {...args} value={value} onChange={handleChange} type='number' />
    </Box>
  );
};

export const Default = Template.bind({});

export const WithTooltip = Template.bind({});

export const TextArea = Template.bind({});

export const NumberField = NumberTemplate.bind({});

Default.args = {
  label: 'Field Label',
  disabled: false,
  helperText: 'Help text.',
  placeholder: 'Placeholder...',
  errorText: '',
  warningText: '',
  readonly: false,
  display: false,
  type: 'text',
  autoFocus: false,
};

WithTooltip.args = {
  label: 'Field Label',
  disabled: false,
  helperText: 'Help text.',
  placeholder: 'Placeholder...',
  errorText: '',
  warningText: '',
  readonly: false,
  display: false,
  type: 'text',
  tooltipTitle: 'Hello world!',
  autoFocus: false,
};

TextArea.args = {
  label: 'Field Label',
  disabled: false,
  helperText: 'Help text.',
  placeholder: 'Placeholder...',
  errorText: '',
  warningText: '',
  readonly: false,
  display: false,
  type: 'textarea',
  autoFocus: false,
};

NumberField.args = {
  label: 'Number Label',
  disabled: false,
  helperText: 'Help text.',
  placeholder: 'Placeholder...',
  errorText: '',
  warningText: '',
  readonly: false,
  display: false,
  min: 5,
  max: 25,
  autoFocus: false,
};
