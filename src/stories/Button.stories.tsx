// YourComponent.stories.js

import { Story } from '@storybook/react';
import React from 'react';
import Button, { Props as ButtonProps } from '../components/Button/Button';

export default {
  title: 'Button',
  component: Button,
};

const Template: Story<ButtonProps> = (args) => {
  return <Button {...args} />;
};

export const Default = Template.bind({});

Default.args = {
  label: 'Label',
  type: 'productive',
  priority: 'primary',
  size: 'small',
  disabled: false,
};
