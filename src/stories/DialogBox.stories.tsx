import { Story } from '@storybook/react';
import React, { useState } from 'react';
import Button from '../components/Button/Button';
import DialogBox, { Props as DialogBoxProps } from '../components/DialogBox/DialogBox';
import Dropdown from '../components/Dropdown';

export default {
  title: 'Dialog Box',
  component: DialogBox,
};

const Template: Story<DialogBoxProps> = (args) => {
  return <DialogBox {...args} open={true} />;
};

const WithButtonTemplate: Story<DialogBoxProps> = (args) => {
  const [opened, setOpened] = useState(false);

  return (
    <main>
      <button onClick={() => setOpened(true)}>Click me</button>
      <DialogBox {...args} open={opened} onClose={() => setOpened(false)}>
        <Dropdown
          fullWidth
          onChange={() => {
            return;
          }}
          options={[
            { label: 'Item 1', value: 'item1' },
            { label: 'Item 2', value: 'item2' },
            { label: 'Item 3', value: 'item3' },
          ]}
        />
      </DialogBox>
    </main>
  );
};

export const Small = Template.bind({});
Small.args = {
  open: true,
  title: 'Title',
  message: 'Message',
  size: 'small',
  middleButtons: [
    <Button id='new-species' label='Test' onClick={() => true} size='small' key={'1'} />,
    <Button id='new-species' label='Test' onClick={() => true} size='small' key={'2'} />,
  ],
};

export const Medium = Template.bind({});
Medium.args = {
  title: 'Title',
  message: 'Message',
  size: 'medium',
  middleButtons: [
    <Button id='new-species' label='Test' onClick={() => true} size='small' key={'1'} />,
    <Button id='new-species' label='Test' onClick={() => true} size='small' key={'2'} />,
  ],
};

export const Large = Template.bind({});
Large.args = {
  title: 'Title',
  message: 'Message',
  size: 'large',
  middleButtons: [
    <Button id='new-species' label='Test' onClick={() => true} size='small' key={'1'} />,
    <Button id='new-species' label='Test' onClick={() => true} size='small' key={'2'} />,
  ],
};

export const XLarge = Template.bind({});
XLarge.args = {
  title: 'Title',
  message: 'Message',
  size: 'x-large',
  middleButtons: [
    <Button id='new-species' label='Test' onClick={() => true} size='small' key={'1'} />,
    <Button id='new-species' label='Test' onClick={() => true} size='small' key={'2'} />,
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

export const CloseOutside = WithButtonTemplate.bind({});
CloseOutside.args = {
  title: 'Title',
  message: 'Message',
  size: 'small',
  middleButtons: [
    <Button id='new-species' label='Test' onClick={() => true} size='small' key={'1'} />,
    <Button id='new-species' label='Test' onClick={() => true} size='small' key={'2'} />,
  ],
};
