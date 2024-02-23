import React from 'react';
import { Story } from '@storybook/react';
import Separator from '../components/Separator';

export default {
  title: 'Separator',
  component: Separator,
};

const Template: Story<{ height: string }> = (args) => <Separator {...args} />;

export const Default = Template.bind({});

Default.args = {
  height: '32px',
};
