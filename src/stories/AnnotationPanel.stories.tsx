import React from 'react';

import { Story } from '@storybook/react';

import { AnnotationProps } from '../components/VirtualWalkthrough/Annotation';
import AnnotationPanel from '../components/VirtualWalkthrough/AnnotationPanel';

export default {
  title: 'AnnotationPanel',
  component: AnnotationPanel,
};

// A stand-in for the annotation image so the story is self-contained.
const SAMPLE_IMAGE =
  'data:image/svg+xml;utf8,' +
  encodeURIComponent(
    `<svg xmlns='http://www.w3.org/2000/svg' width='480' height='300'>
      <defs>
        <linearGradient id='g' x1='0' y1='0' x2='1' y2='1'>
          <stop offset='0' stop-color='#2f855a'/>
          <stop offset='1' stop-color='#276749'/>
        </linearGradient>
      </defs>
      <rect width='480' height='300' fill='url(#g)'/>
      <text x='240' y='158' fill='#ffffff' font-family='sans-serif' font-size='24' text-anchor='middle'>Sample image</text>
    </svg>`
  );

const baseAnnotation: AnnotationProps = {
  position: [0, 0, 0],
  title: 'Mangrove nursery',
  bodyText:
    'Seedlings raised here are transplanted along the coastline to restore the mangrove belt that protects the village from storm surge.',
};

// Renders the panel inside a positioned "viewer" so its absolute positioning
// and the SVG connector line are visible in isolation.
const Template: Story<React.ComponentProps<typeof AnnotationPanel>> = (args) => (
  <div
    style={{
      position: 'relative',
      width: 900,
      height: 600,
      overflow: 'hidden',
      background: 'linear-gradient(135deg, #1a202c 0%, #2d3748 100%)',
      borderRadius: 8,
    }}
  >
    <AnnotationPanel {...args} />
  </div>
);

export const TextOnly = Template.bind({});
TextOnly.args = {
  annotation: baseAnnotation,
  onClose: () => window.alert('Closed'),
};

export const WithLabel = Template.bind({});
WithLabel.args = {
  annotation: { ...baseAnnotation, label: 'Restoration site' },
  onClose: () => window.alert('Closed'),
};

export const WithImage = Template.bind({});
WithImage.args = {
  annotation: { ...baseAnnotation, label: 'Restoration site', imageUrls: [SAMPLE_IMAGE] },
  onClose: () => window.alert('Closed'),
};

export const MultipleImages = Template.bind({});
MultipleImages.args = {
  annotation: { ...baseAnnotation, label: 'Restoration site', imageUrls: [SAMPLE_IMAGE, SAMPLE_IMAGE, SAMPLE_IMAGE] },
  onClose: () => window.alert('Closed'),
};
