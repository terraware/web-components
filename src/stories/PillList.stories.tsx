import React from 'react';

import { Story } from '@storybook/react';

import PillList, { PillListProps } from '../components/PillList';

export default {
  title: 'PillList',
  component: PillList,
};

const Template: Story<PillListProps<number>> = (args) => {
  return <PillList {...args} />;
};

export const Default = Template.bind({});

Default.args = {
  data: [
    {
      id: 1,
      label: 'Fruit',
      value: 'Banana',
      onRemove: () => window.alert('You clicked delete banana. Why would you do that?'),
    },
    {
      id: 2,
      label: 'Fruit',
      value: 'Apple',
    },
    {
      id: 3,
      label: 'Tree',
      value: 'Oak',
    },
  ],
  onRemove: () => window.alert('Default close pill handler.'),
};
