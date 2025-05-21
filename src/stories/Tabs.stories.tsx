import React, { useState } from 'react';
import { Story } from '@storybook/react';
import Tabs, { TabsProps } from '../components/Tabs';

export default {
  title: 'Tabs',
  component: Tabs,
};

const Template: Story<TabsProps> = (args) => {
  return <Tabs {...args} />;
};

const OverrideTemplate: Story<TabsProps> = (args) => {
  const [activeTab, setActiveTab] = useState<string>('tab1');

  const onTabChange = (tab: string) => {
    if (tab !== 'tab3') {
      setActiveTab(tab);
    }
  };

  return <Tabs {...args} activeTab={activeTab} onTabChange={onTabChange} />;
};

export const Default = Template.bind({});

Default.args = {
  tabs: [
    { icon: 'iconParchment', id: 'tab1', label: 'Tab1', children: 'tab1 contents', disabled: false },
    { id: 'tab2', label: 'Tab2', children: 'tab2 contents', disabled: false },
  ],
};

export const OverrideActiveTab = OverrideTemplate.bind({});

OverrideActiveTab.args = {
  tabs: [
    { id: 'tab1', label: 'Tab1', children: 'tab1 contents', disabled: false },
    { id: 'tab2', label: 'Tab2', children: 'tab2 contents', disabled: false },
    { id: 'tab3', label: 'Tab3', children: 'tab3 contents', disabled: false },
  ],
};
