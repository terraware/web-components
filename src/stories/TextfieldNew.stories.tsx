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
    maxLength: {
      control: { type: 'number' },
    },
    type: {
      options: ['text', 'textarea'],
      control: { type: 'radio' },
    },
  },
};

const Template: Story<TextFieldProps> = (args) => {
  const [value, setValue] = React.useState('');
  const handleChange = (v: unknown) => {
    setValue(v as string);
  };

  return (
    <Box sx={{ marginTop: '30px' }} width='500px'>
      <TextField {...args} value={value} onChange={handleChange} />
    </Box>
  );
};

const NumberTemplate: Story<TextFieldProps> = (args) => {
  const [value, setValue] = React.useState(0);
  const handleChange = (v: unknown) => {
    setValue(v as number);
  };

  return (
    <Box sx={{ marginTop: '30px' }}>
      <TextField {...args} value={value} onChange={handleChange} type='number' />
    </Box>
  );
};

export const Default = Template.bind({});

export const WithTooltip = Template.bind({});

export const TextArea = Template.bind({});

export const TextAreaWithTruncate = Template.bind({});

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
  preserveNewlines: false,
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
  preserveNewlines: false,
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
  preserveNewlines: true,
};

TextAreaWithTruncate.args = {
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
  preserveNewlines: true,
  truncateConfig: {
    valueTextStyle: {
      fontSize: '12px',
      lineHeight: '16px'
    },
    maxHeight: 48,
    showLessText: 'Show less',
    showMoreText: 'Show more',
  },
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
  preserveNewlines: false,
};
