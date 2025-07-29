import React from 'react';

import { Story } from '@storybook/react';

import ProgressCircle, { Props as ProgressCircleProps } from '../components/ProgressCircle/ProgressCircle';

export default {
  title: 'Progress Circle',
  component: ProgressCircle,
};

const Template: Story<ProgressCircleProps> = (args) => <ProgressCircle {...args} />;

export const Default = Template.bind({});

Default.args = {
  renderPercentText: (pct) => `${pct}%`,
};
