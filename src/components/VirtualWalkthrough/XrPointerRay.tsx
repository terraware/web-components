import React from 'react';

import { Entity } from '@playcanvas/react';
import { Script } from '@playcanvas/react/components';
import { Color } from 'playcanvas';

import { DEFAULT_RAY_COLOR, XrPointerRay as XrPointerRayScript } from './xr-pointer-ray';

export type XrPointerRayProps = {
  color?: Color;
};

const XrPointerRay = ({ color = DEFAULT_RAY_COLOR }: XrPointerRayProps) => (
  <Entity name='xr-pointer-ray'>
    <Script script={XrPointerRayScript} color={color} />
  </Entity>
);

export default XrPointerRay;
