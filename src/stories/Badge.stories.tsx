import React from 'react';
import { Story } from '@storybook/react';
import { Badge } from '../index';
import { BadgeProps } from '../components/Badge';

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
