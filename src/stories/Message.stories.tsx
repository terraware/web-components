import { Story } from '@storybook/react';
import React from 'react';
import Button from '../components/Button/Button';
import Message, { Props as MessageProps } from '../components/Message/Message';

export default {
  title: 'Message',
  component: Message,
};

const Template: Story<MessageProps> = (args) => {
  return (
    <div style={{padding: '100px', backgroundColor: '#f5f5f5'}}>
      <Message {...args} />
    </div>
  );
};

export const Toast = Template.bind({});
Toast.args = {
  title: 'Message title text',
  body: 'Message body text',
  actionText: 'Undo',
  actionHandler: () => window.alert('You clicked the action.'),
  type: 'toast',
  priority: 'info',
  showCloseButton: false,
};

export const Page = Template.bind({});
Page.args = {
  title: 'Message Title Text',
  body: 'Message body text.',
  type: 'page',
  priority: 'info',
  showCloseButton: false,
  pageButtons: [
    <Button label='Test' onClick={() => true} size='small' key={'1'} priority='secondary' type='passive' />,
    <Button label='Test' onClick={() => true} size='small' key={'2'} priority='secondary' type='passive' />,
  ],
};
