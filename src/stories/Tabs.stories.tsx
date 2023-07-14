import { Story } from '@storybook/react';
import React from 'react';
import Tabs, { TabsProps } from '../components/Tabs';

export default {
  title: 'Tabs',
  component: Tabs,
};

const Template: Story<TabsProps> = (args) => {
  return <Tabs {...args} />;
};

export const Default = Template.bind({});

Default.args = {
  tabs: [
    { label: 'Tab1', children: 'tab1 contents', disabled: false },
    { label: 'Tab2', children: 'tab2 contents', disabled: false },
  ],
};
