import React from 'react';

import { Story } from '@storybook/react';

import Divisor, { Props as DivisorProps } from '../components/Divisor';

export default {
  title: 'Divisor',
  component: Divisor,
  argTypes: {
    mt: {
      description: 'overwritten mt',
      control: {
        type: 'range',
        min: 0,
        max: 5,
        step: 1,
      },
    },
  },
};

const Template: Story<DivisorProps> = (args) => <Divisor {...args} />;

export const Default = Template.bind({});

Default.args = {
  mt: 3,
};
