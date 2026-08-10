import React, { useState } from 'react';

import { Story } from '@storybook/react';

import { AnnotationProps } from '../components/VirtualWalkthrough/Annotation';
import AnnotationEditPane from '../components/VirtualWalkthrough/AnnotationEditPane';

export default {
  title: 'AnnotationEditPane',
  component: AnnotationEditPane,
};

const SAMPLE_IMAGE =
  'data:image/svg+xml;utf8,<svg xmlns="http://www.w3.org/2000/svg" width="120" height="120"><rect width="120" height="120" fill="%234f8a5b"/></svg>';

// Drives the pane with local state so the fields are editable in the story.
const Template: Story<Partial<React.ComponentProps<typeof AnnotationEditPane>> & { initialImageUrls?: string[] }> = ({
  initialImageUrls,
  ...args
}) => {
  const [annotation, setAnnotation] = useState<AnnotationProps>({
    position: [0, 0, 0],
    title: 'Mangrove nursery',
    bodyText: 'Seedlings raised here are transplanted along the coastline.',
    label: 'Restoration site',
    imageUrls: initialImageUrls,
  });

  return (
    <AnnotationEditPane
      visible
      {...args}
      annotation={annotation}
      onUpdate={(updates) => setAnnotation((prev) => ({ ...prev, ...updates }))}
    />
  );
};

export const Default = Template.bind({});
Default.args = {};

export const WithImageUpload = Template.bind({});
WithImageUpload.args = {
  maxImages: 3,
  onImagesChange: (files: File[]) => {
    // eslint-disable-next-line no-console
    console.log('annotation images changed', files);
  },
};

export const WithExistingImages = Template.bind({});
WithExistingImages.args = {
  maxImages: 3,
  initialImageUrls: [SAMPLE_IMAGE],
  onImagesChange: (files: File[]) => {
    // eslint-disable-next-line no-console
    console.log('annotation images changed', files);
  },
};
