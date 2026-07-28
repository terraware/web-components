import React, { useState } from 'react';

import { Story } from '@storybook/react';

import { AnnotationProps } from '../components/VirtualWalkthrough/Annotation';
import AnnotationEditPane, { AnnotationEditPaneStrings } from '../components/VirtualWalkthrough/AnnotationEditPane';

export default {
  title: 'AnnotationEditPane',
  component: AnnotationEditPane,
};

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
const Template: Story<Partial<React.ComponentProps<typeof AnnotationEditPane>>> = (args) => {
  const [annotation, setAnnotation] = useState<AnnotationProps>({
    position: [0, 0, 0],
    title: 'Mangrove nursery',
    bodyText: 'Seedlings raised here are transplanted along the coastline.',
    label: 'Restoration site',
  });

  return (
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
      <AnnotationEditPane
        visible
        strings={sampleStrings}
        {...args}
        annotation={annotation}
        onUpdate={(updates) => setAnnotation((prev) => ({ ...prev, ...updates }))}
      />
    </div>
  );
};

export const Default = Template.bind({});
Default.args = {};
