import React, { useState } from 'react';
import { Story } from '@storybook/react';
import Tabs, { TabsProps } from '../components/Tabs';

export default {
  title: 'Tabs',
  component: Tabs,
};

const Template: Story<TabsProps> = (args) => {
  const { tabs } = args;

  return <Tabs tabs={tabs} />;
};

const OverrideTemplate: Story<TabsProps> = (args) => {
  const [activeTab, setActiveTab] = useState<string>('Tab1');

  const onTabChange = (tab: string) => {
    if (tab !== 'Tab3') {
      setActiveTab(tab);
    }
  };

  return <Tabs {...args} activeTab={activeTab} onTabChange={onTabChange} />;
};

export const Default = Template.bind({});

Default.args = {
  tabs: [
    { label: 'Tab1', children: 'tab1 contents', disabled: false },
    { label: 'Tab2', children: 'tab2 contents', disabled: false },
  ],
};

export const OverrideActiveTab = OverrideTemplate.bind({});

OverrideActiveTab.args = {
  tabs: [
    { label: 'Tab1', children: 'tab1 contents', disabled: false },
    { label: 'Tab2', children: 'tab2 contents', disabled: false },
    { label: 'Tab3', children: 'tab3 contents', disabled: false },
  ],
};
