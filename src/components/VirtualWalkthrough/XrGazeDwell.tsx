import React from 'react';

import { Entity } from '@playcanvas/react';
import { Script } from '@playcanvas/react/components';

import { XrGazeDwell as XrGazeDwellScript } from './xr-gaze-dwell';

interface XrGazeDwellProps {
  activeIndex: number;
}

const XrGazeDwell = ({ activeIndex }: XrGazeDwellProps) => (
  <Entity name='xr-gaze-dwell'>
    <Script script={XrGazeDwellScript} activeIndex={activeIndex} />
  </Entity>
);

export default XrGazeDwell;
