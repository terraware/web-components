import React from 'react';

import { Story } from '@storybook/react';

import BusySpinner, { BusySpinnerProps } from '../components/BusySpinner';

export default {
  title: 'BusySpinner',
  component: BusySpinner,
};

const Template: Story<BusySpinnerProps> = (args) => {
  return <BusySpinner {...args} />;
};

export const Default = Template.bind({});

Default.args = {
  withSkrim: true,
};
