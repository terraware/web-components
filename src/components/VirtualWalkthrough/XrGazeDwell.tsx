import React from 'react';

import { Entity } from '@playcanvas/react';
import { Script } from '@playcanvas/react/components';

import { XrGazeDwell as XrGazeDwellScript } from './xr-gaze-dwell';

const XrGazeDwell = () => (
  <Entity name='xr-gaze-dwell'>
    <Script script={XrGazeDwellScript} />
  </Entity>
);

export default XrGazeDwell;
