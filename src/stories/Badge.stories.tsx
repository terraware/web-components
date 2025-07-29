import React from 'react';

import { Story } from '@storybook/react';

import { BadgeProps } from '../components/Badge';
import { Badge } from '../index';

export default {
  title: 'Badge',
  component: Badge,
};

const Template: Story<BadgeProps> = (args) => <Badge {...args} />;

export const Default = Template.bind({});

Default.args = {
  label: 'Badge',
  labelColor: undefined,
  backgroundColor: '#F8EFE5',
  borderColor: '#A36A2D',
};
