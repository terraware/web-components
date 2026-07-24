import React from 'react';

import { Story } from '@storybook/react';

import CameraInfo, { CameraInfoStrings, CameraState } from '../components/VirtualWalkthrough/CameraInfo';

export default {
  title: 'CameraInfo',
  component: CameraInfo,
};

const sampleStrings: CameraInfoStrings = {
  cameraInfo: 'Camera info',
  cameraPosition: 'Position',
  cameraFocusPoint: 'Focus point',
};

// A static camera state stands in for the live PlayCanvas state that
// useCameraPosition().getCameraState would supply in the real viewer.
const sampleCameraState: CameraState = {
  position: [1.234567, 2.345678, 3.456789],
  focus: [0, 0.5, 0],
};

// Renders the readout inside a positioned "viewer" so its absolute positioning
// is visible in isolation.
const Template: Story<Partial<React.ComponentProps<typeof CameraInfo>>> = (args) => (
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
    <CameraInfo strings={sampleStrings} getCameraState={() => sampleCameraState} {...args} />
  </div>
);

export const Default = Template.bind({});
Default.args = {};
