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

export const Small = Template.bind({});
Small.args = {
  title: 'Title',
  message: 'Message',
  size: 'small',
  middleButtons: [
    <Button id='new-species' label='Test' onClick={() => true} size='small' />,
    <Button id='new-species' label='Test' onClick={() => true} size='small' />,
  ],
};

export const Medium = Template.bind({});
Medium.args = {
  title: 'Title',
  message: 'Message',
  size: 'medium',
  middleButtons: [
    <Button id='new-species' label='Test' onClick={() => true} size='small' />,
    <Button id='new-species' label='Test' onClick={() => true} size='small' />,
  ],
};

export const Large = Template.bind({});
Large.args = {
  title: 'Title',
  message: 'Message',
  size: 'large',
  middleButtons: [
    <Button id='new-species' label='Test' onClick={() => true} size='small' />,
    <Button id='new-species' label='Test' onClick={() => true} size='small' />,
  ],
};

export const XLarge = Template.bind({});
XLarge.args = {
  title: 'Title',
  message: 'Message',
  size: 'x-large',
  middleButtons: [
    <Button id='new-species' label='Test' onClick={() => true} size='small' />,
    <Button id='new-species' label='Test' onClick={() => true} size='small' />,
  ],
};

export const threeButtons = Template.bind({});
threeButtons.args = {
  title: 'Title',
  message: 'Message',
  size: 'medium',
  leftButton: <Button id='new-species' label='Test' onClick={() => true} size='small' />,
  rightButtons: [
    <Button id='new-species' label='Test' onClick={() => true} size='small' key='1' />,
    <Button id='new-species' label='Test' onClick={() => true} size='small' key='2' />,
  ],
};

export const noFooter = Template.bind({});
noFooter.args = {
  title: 'Title',
  message: 'Message',
  size: 'small',
};
