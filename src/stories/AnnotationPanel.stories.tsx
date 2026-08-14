import React from 'react';

import { Story } from '@storybook/react';

import { PhotoItem } from '../components/PhotosCarousel';
import { AnnotationProps } from '../components/VirtualWalkthrough/Annotation';
import AnnotationPanel from '../components/VirtualWalkthrough/AnnotationPanel';

export default {
  title: 'AnnotationPanel',
  component: AnnotationPanel,
};
const SAMPLE_PHOTOS: PhotoItem[] = [
  {
    url: 'https://assets-global.website-files.com/600f0cac30d70b8364793d7c/62a17149aa7b1acd29fa1695_22_TF_Website_Homepage_Banner_5000x2500px_04%20(1).jpg',
  },
  {
    url: 'https://assets-global.website-files.com/600f0cac30d70b8364793d7c/63447bf401a1314055b50708_Terraformation-25%20(1)-p-1600.jpg',
  },
  {
    url: 'https://assets-global.website-files.com/600f0cac30d70b8364793d7c/63447cc759b9f238760b40b1_DSC_3921-II-EDIT.jpg',
  },
];

const baseAnnotation: AnnotationProps = {
  position: [0, 0, 0],
  title: 'Mangrove nursery',
  bodyText:
    'Seedlings raised here are transplanted along the coastline to restore the mangrove belt that protects the village from storm surge.',
};

// Renders the panel inside a positioned "viewer" so its absolute positioning
// and the SVG connector line are visible in isolation.
const Template: Story<React.ComponentProps<typeof AnnotationPanel>> = (args) => <AnnotationPanel {...args} />;

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
  annotation: { ...baseAnnotation, label: 'Restoration site', imageUrls: [SAMPLE_PHOTOS[0].url] },
  onClose: () => window.alert('Closed'),
};

export const LongText = Template.bind({});
LongText.args = {
  annotation: {
    ...baseAnnotation,
    label: 'Restoration site',
    imageUrls: [SAMPLE_PHOTOS[0].url],
    bodyText: Array(8).fill(baseAnnotation.bodyText).join(' '),
  },
  onClose: () => window.alert('Closed'),
};

export const MultipleImages = Template.bind({});
MultipleImages.args = {
  annotation: {
    ...baseAnnotation,
    label: 'Restoration site',
    imageUrls: SAMPLE_PHOTOS.map((p) => p.url),
  },
  onClose: () => window.alert('Closed'),
};
