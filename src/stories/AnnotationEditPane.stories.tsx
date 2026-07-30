import React, { useState } from 'react';

import { Story } from '@storybook/react';

import { AnnotationProps } from '../components/VirtualWalkthrough/Annotation';
import AnnotationEditPane, { AnnotationEditPaneStrings } from '../components/VirtualWalkthrough/AnnotationEditPane';

export default {
  title: 'AnnotationEditPane',
  component: AnnotationEditPane,
};

const SAMPLE_IMAGE =
  'data:image/svg+xml;utf8,<svg xmlns="http://www.w3.org/2000/svg" width="120" height="120"><rect width="120" height="120" fill="%234f8a5b"/></svg>';

const sampleStrings: AnnotationEditPaneStrings = {
  editAnnotation: 'Edit annotation',
  title: 'Title',
  titleTooltip: 'The heading shown at the top of the annotation panel.',
  description: 'Description',
  descriptionTooltip: 'The body text shown below the title.',
  label: 'Label',
  labelTooltip: 'An optional short tag shown above the title.',
};

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
      strings={sampleStrings}
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
  strings: {
    ...sampleStrings,
    images: {
      uploadTitle: 'Images',
      uploadText: 'Drag and drop images here',
      uploadDescription: 'JPEG or PNG, up to 3 images',
      chooseFileText: 'Choose images',
      replaceFileText: 'Replace image',
      photoSelectedText: 'Image selected',
    },
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
  strings: {
    ...sampleStrings,
    images: {
      uploadTitle: 'Images',
      uploadText: 'Drag and drop images here',
      uploadDescription: 'JPEG or PNG, up to 3 images',
      chooseFileText: 'Choose images',
      replaceFileText: 'Replace image',
      photoSelectedText: 'Image selected',
      existingImagesLabel: 'Existing',
      newImagesLabel: 'New',
    },
  },
};
