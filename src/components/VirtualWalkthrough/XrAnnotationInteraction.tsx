import React from 'react';

import { Entity } from '@playcanvas/react';
import { Script } from '@playcanvas/react/components';

import { XrAnnotationInteraction as XrAnnotationInteractionScript } from './xr-annotation-interaction';

interface XrAnnotationInteractionProps {
  onDismiss?: () => void;
}

const XrAnnotationInteraction = ({ onDismiss }: XrAnnotationInteractionProps) => (
  <Entity name='xr-annotation-interaction'>
    <Script script={XrAnnotationInteractionScript} onDismissCallback={onDismiss} />
  </Entity>
);

export default XrAnnotationInteraction;
