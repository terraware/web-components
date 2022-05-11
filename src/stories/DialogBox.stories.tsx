// YourComponent.stories.js

import { Story } from '@storybook/react';
import React from 'react';
import Button from '../components/Button/Button';
import DialogBox, { Props as DialogBoxProps } from '../components/DialogBox/DialogBox';

export default {
  title: 'Dialog Box',
  component: DialogBox,
};

const Template: Story<DialogBoxProps> = (args) => {
  return <DialogBox {...args} />;
};

export const Default = Template.bind({});

Default.args = {
  leftButton: <Button id='new-species' label='Test' onClick={() => true} size='small' />,
  rightButtons: [
    <Button id='new-species' label='Test' onClick={() => true} size='small' />,
    <Button id='new-species' label='Test' onClick={() => true} size='small' />,
  ],
  // middleButtons: [
  //   <Button id='new-species' label='Test' onClick={() => true} size='small' />,
  //   <Button id='new-species' label='Test' onClick={() => true} size='small' />,
  // ],
};
