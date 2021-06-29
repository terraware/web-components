// YourComponent.stories.js

import { Story } from '@storybook/react';
import React from 'react';
import CancelButton, {
  Props as CancelButtonProps,
} from '../components/CancelButton';

export default {
  title: 'CancelButton',
  component: CancelButton,
};

const Template: Story<CancelButtonProps> = (args) => {
  return <CancelButton {...args} />;
};

export const Default = Template.bind({});

Default.args = {
  label: 'Cancel',
};
