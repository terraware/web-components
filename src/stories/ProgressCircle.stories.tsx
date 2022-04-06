import { Story } from '@storybook/react';
import React from 'react';
import ProgressCircle, { Props as ProgressCircleProps } from '../components/ProgressCircle/ProgressCircle';

export default {
  title: 'Progress Circle',
  component: ProgressCircle,
};

const Template: Story<ProgressCircleProps> = (args) => <ProgressCircle {...args} />;

export const Default = Template.bind({});
