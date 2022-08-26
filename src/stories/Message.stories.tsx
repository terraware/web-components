import { Story } from '@storybook/react';
import React from 'react';
import Button from '../components/Button/Button';
import Message, { Props as MessageProps } from '../components/Message/Message';

export default {
  title: 'Message',
  component: Message,
};

const Template: Story<MessageProps> = (args) => {
  return <Message {...args} />;
};

export const Toast = Template.bind({});
Toast.args = {
  title: 'Toast message title text',
  body: 'Body message text',
  actionText: 'Undo',
  actionHandler: () => window.alert('You clicked the action.'),
  type: 'toast',
  priority: 'info',
  showCloseButton: false,
  open: true,
};

export const Page = Template.bind({});
Page.args = {
  title: 'Page message title text',
  body: 'Body message text',
  type: 'page',
  priority: 'info',
  showCloseButton: false,
  pageButtons: [
    <Button label='Test' onClick={() => true} size='small' key={'1'} priority='secondary' type='passive' />,
    <Button label='Test' onClick={() => true} size='small' key={'2'} priority='secondary' type='passive' />,
  ],
  open: true,
};
