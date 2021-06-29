// YourComponent.stories.js

import { Story } from '@storybook/react';
import React from 'react';
import RadioButton, {
  Props as RadioButtonProps,
} from '../components/RadioButton';

export default {
  title: 'RadioButton',
  component: RadioButton,
};

const Template: Story<RadioButtonProps> = (args) => {
  return <RadioButton {...args} />;
};

export const Default = Template.bind({});

Default.args = {
  id: '1',
  name: 'Test',
  label: <p>Test</p>,
  value: false,
};
