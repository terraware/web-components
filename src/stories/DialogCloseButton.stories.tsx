// YourComponent.stories.js

import { action } from '@storybook/addon-actions';
import { Story } from '@storybook/react';
import React from 'react';
import DialogCloseButton, {
  Props as DialogCloseButtonProps,
} from '../components/DialogCloseButton';

export default {
  title: 'DialogCloseButton',
  component: DialogCloseButton,
};

const Template: Story<DialogCloseButtonProps> = (args) => (
  <DialogCloseButton {...args} />
);

export const Default = Template.bind({});

Default.args = {
  onClick: () => {
    action('onClick')();
  },
};
