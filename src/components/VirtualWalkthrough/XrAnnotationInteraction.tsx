import React from 'react';

import { Entity } from '@playcanvas/react';
import { Script } from '@playcanvas/react/components';

import { XrAnnotationInteraction as XrAnnotationInteractionScript } from './xr-annotation-interaction';

interface XrAnnotationInteractionProps {
  onEmptySelect?: () => void;
}

const XrAnnotationInteraction = ({ onEmptySelect }: XrAnnotationInteractionProps) => (
  <Entity name='xr-annotation-interaction'>
    <Script script={XrAnnotationInteractionScript} onEmptySelectCallback={onEmptySelect} />
  </Entity>
);

export default XrAnnotationInteraction;
