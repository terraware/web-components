import React from 'react';

import { Entity } from '@playcanvas/react';
import { Script } from '@playcanvas/react/components';

import { XrAnnotationInteraction as XrAnnotationInteractionScript } from './xr-annotation-interaction';

const XrAnnotationInteraction = () => (
  <Entity name='xr-annotation-interaction'>
    <Script script={XrAnnotationInteractionScript} />
  </Entity>
);

export default XrAnnotationInteraction;
