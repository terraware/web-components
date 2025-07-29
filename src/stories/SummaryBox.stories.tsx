import React from 'react';

import { Story } from '@storybook/react';

import SummaryBox, { Props as SummaryBoxProps } from '../components/SummaryBox';

export default {
  title: 'SummaryBox',
  component: SummaryBox,
};

const Template: Story<SummaryBoxProps> = (args) => <SummaryBox {...args} />;

export const Default = Template.bind({});
Default.args = {
  id: '1',
  title: 'Summary Box',
  value: 'Summary box example test',
  variant: 'default',
};

export const Available = Template.bind({});
Available.args = {
  id: '1',
  title: 'Summary Box',
  value: 'Summary box example test',
  variant: 'available',
};

export const Zero = Template.bind({});
Zero.args = {
  id: '1',
  title: 'Summary Box',
  value: 'Summary box example test',
  variant: 'zero',
};
