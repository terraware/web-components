import { Story } from '@storybook/react';
import { action } from '@storybook/addon-actions';
import React from 'react';
import RadioButton, {
  Props as RadioButtonProps,
} from '../components/RadioButton';

export default {
  title: 'RadioButton',
  component: RadioButton,
};

const Template: Story<RadioButtonProps> = (args) => {
  const onChange = (propertyName: string, value: any) => {
    action('onChange')(propertyName, value);
  };

  return <RadioButton {...args} onChange={onChange} />;
};

export const Default = Template.bind({});

Default.args = {
  id: '1',
  propertyName: 'radio',
  name: 'Test',
  label: <p>Test</p>,
  value: false,
};
