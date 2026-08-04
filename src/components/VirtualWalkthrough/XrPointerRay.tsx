import React from 'react';

import { Entity } from '@playcanvas/react';
import { Script } from '@playcanvas/react/components';

import { XrPointerRay as XrPointerRayScript } from './xr-pointer-ray';

const XrPointerRay = () => (
  <Entity name='xr-pointer-ray'>
    <Script script={XrPointerRayScript} />
  </Entity>
);

export default XrPointerRay;
