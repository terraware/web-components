import React from 'react';

import { Box } from '@mui/material';
import { Story } from '@storybook/react';

import Confirm, { ConfirmProps } from '../components/Confirm';

export default {
  title: 'Confirm',
  component: Confirm,
};

const Template: Story<ConfirmProps> = (args) => {
  return <Confirm {...args} />;
};

export const Default = Template.bind({});
Default.args = {
  confirmButtonText: 'Ok',
  closeButtonText: 'Cancel',
  message: 'Hello World',
  onClose: () => window.alert('closed'),
  onConfirm: () => window.alert('confirmed'),
  open: true,
  size: 'large',
  textStyle: { color: 'blue' },
  title: 'Confirm This!',
};

export const DestructiveNoCancel = Template.bind({});
DestructiveNoCancel.args = {
  confirmButtonIcon: 'iconTrashCan',
  confirmButtonPriority: 'primary',
  confirmButtonText: 'Destroy',
  confirmButtonType: 'destructive',
  message: ['Nukem', 'Are you sure??'],
  onConfirm: () => window.alert('gone'),
  title: 'Delete all the things!',
};

export const Disabled = Template.bind({});
Disabled.args = {
  confirmButtonDisabled: true,
  confirmButtonPriority: 'secondary',
  confirmButtonText: 'Ok',
  confirmButtonType: 'passive',
  message: 'Hello World',
  onConfirm: () => window.alert('confirmed'),
  title: 'Disabled Confirm',
};

export const Hidden = Template.bind({});
Hidden.args = {
  confirmButtonText: 'Ok',
  message: 'Hello World',
  onConfirm: () => window.alert('confirmed'),
  open: false,
  title: 'Hidden Confirm',
};

export const CustomContent = Template.bind({});
CustomContent.args = {
  confirmButtonText: 'Ok',
  message: (
    <Box display='flex' flexDirection='column' textAlign='left'>
      <h2>Welcome</h2>
      <h3>to wherever</h3>
      <h4>you are</h4>
    </Box>
  ),
  onConfirm: () => window.alert('confirmed'),
  title: 'Custom Confirm',
};
