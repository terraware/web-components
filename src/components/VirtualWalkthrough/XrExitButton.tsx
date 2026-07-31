import React from 'react';

import { Entity } from '@playcanvas/react';
import { Script } from '@playcanvas/react/components';

import { XrExitButton as XrExitButtonScript } from './xr-exit-button';

const XrExitButton = () => (
  <Entity name='xr-exit-button'>
    <Script script={XrExitButtonScript} />
  </Entity>
);

export default XrExitButton;
