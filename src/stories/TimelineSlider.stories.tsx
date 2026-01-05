import React from 'react';

import { Story } from '@storybook/react';

import TimelineSlider, { TimelineSliderProps } from '../components/TimelineSlider';

// Storybook metadata
export default {
  title: 'TimelineSlider',
  component: TimelineSlider,
};

// Sample marks
const marksSample = [
  { value: 0, size: 'small' as const, labelBottom: 'Mark 0', color: '#1976d2', onClick: () => alert('Clicked mark 0') },
  {
    value: 25,
    size: 'medium' as const,
    labelBottom: 'Mark 25',
    labelTop: '12',
    color: '#e91e63',
    onClick: () => alert('Clicked mark 25'),
  },
  {
    value: 50,
    size: 'large' as const,
    labelBottom: 'Mark 50',
    labelTop: '42',
    color: '#ff9800',
    onClick: () => alert('Clicked mark 50'),
  },
  { value: 75, size: 'medium' as const, labelBottom: 'Mark 75', labelTop: '26', color: '#4caf50' },
  {
    value: 100,
    size: 'small' as const,
    labelBottom: 'Mark 100',
    color: '#9c27b0',
    onClick: () => alert('Clicked mark 100'),
  },
];

// Default story
const Template: Story<TimelineSliderProps> = (args) => <TimelineSlider {...args} />;

export const Default = Template.bind({});
Default.args = {
  labelEnd: 'Aug 2025',
  labelStart: 'Jul 2022',
  marks: marksSample,
};

// Story for all marks having the same value
export const SingleValueMarks = Template.bind({});
SingleValueMarks.args = {
  marks: [
    { value: 50, size: 'small', color: '#1976d2' },
    { value: 50, size: 'medium', color: '#e91e63' },
    { value: 50, size: 'large', color: '#ff9800' },
  ],
};
