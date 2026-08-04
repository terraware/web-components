import React from 'react';

import { Entity } from '@playcanvas/react';
import { Script } from '@playcanvas/react/components';

import type { AnnotationProps } from './Annotation';
import { VrAnnotationPanel as VrAnnotationPanelScript } from './vr-annotation-panel';

interface VrAnnotationPanelProps {
  annotation: AnnotationProps;
  annotationIndex: number;
  scaleFactor: number;
}

const VrAnnotationPanel = ({ annotation, annotationIndex, scaleFactor }: VrAnnotationPanelProps) => (
  <Entity name='vr-annotation-panel'>
    <Script
      script={VrAnnotationPanelScript}
      title={annotation.title}
      label={annotation.label}
      bodyText={annotation.bodyText}
      imageUrls={annotation.imageUrls}
      annotationIndex={annotationIndex}
      scaleFactor={scaleFactor}
    />
  </Entity>
);

export default VrAnnotationPanel;
