import { Story } from '@storybook/react';
import React from 'react';
import Button, { Props as ButtonProps } from '../components/Button/Button';

export default {
  title: 'Button',
  component: Button,
  argTypes: {
    type: {
      options: ['productive', 'passive', 'destructive'],
      control: { type: 'radio' },
    },
    priority: {
      options: ['primary', 'secondary', 'ghost'],
      control: { type: 'radio' },
    },
    size: {
      options: ['small', 'medium', 'large', 'xlarge'],
      control: { type: 'radio' },
    },
    icon: {
      options: ['plus', 'iconTrashCan', 'iconEdit', 'menuVertical', null],
      control: { type: 'radio' },
    },
    rightIcon: {
      options: ['plus', 'iconTrashCan', 'iconEdit', 'menuVertical', null],
      control: { type: 'radio' },
    },
  },
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
