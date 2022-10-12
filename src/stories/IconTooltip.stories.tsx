import { Story } from '@storybook/react';
import React from 'react';
import IconTooltip, { IconTooltipProps } from '../components/IconTooltip';

export default {
  title: 'Icon Tooltip',
  component: IconTooltip,
};

const Template: Story<IconTooltipProps> = (args) => {
  return <IconTooltip {...args} />;
};

export const Default = Template.bind({});
Default.args = {
  iconName: 'info',
  placement: 'top-start',
  title: 'This is a simple icon tooltip with default icon & placement and only text content.',
};
