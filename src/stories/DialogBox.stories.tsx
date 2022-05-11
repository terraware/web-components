// YourComponent.stories.js

import { Story } from '@storybook/react';
import React from 'react';
import DialogBox, { Props as DialogBoxProps } from '../components/DialogBox/DialogBox';

export default {
  title: 'Dialog Box',
  component: DialogBox,
};

const Template: Story<DialogBoxProps> = (args) => {
  return <DialogBox {...args} />;
};

export const Default = Template.bind({});

Default.args = {};
