// YourComponent.stories.js

import { Story } from '@storybook/react';
import React from 'react';
import Icon, { Props as IconProps } from '../components/Icon/Icon';

export default {
  title: 'Icon',
  component: Icon,
};

const Template: Story<IconProps> = (args) => {
  return <Icon {...args} />;
};

export const Default = Template.bind({});

Default.args = {
  name: 'help',
};
