import { Story } from '@storybook/react';
import React from 'react';
import { Box } from '@mui/material';
import Slider, { SliderProps } from '../components/Slider';

export default {
  title: 'Slider',
  component: Slider,
};

const Template: Story<SliderProps> = (args) => {
  return <Box height='100vh' display='flex' alignItems='center'>
    <Slider {...args} />
  </Box>;
};

export const Default = Template.bind({});

export const SnapToMark = Template.bind({});

const marks = [
  {
    label: '0%',
    value: 0,
  },
  {
    label: '25%',
    value: 25,
  },
  {
    label: '50%',
    value: 50,
  },
  {
    label: '75%',
    value: 75,
  },
  {
    label: '100%',
    value: 100,
  },
];

Default.args = {
  defaultValue: 50,
  min: 0,
  max: 100,
  step: 1,
  marks,
  valueLabelDisplay: 'auto',
};

SnapToMark.args = {
  defaultValue: 50,
  marks,
  valueLabelDisplay: 'auto',
};
