import React, { useRef } from 'react';

import { Story } from '@storybook/react';

import ControlsInfoPane, { ControlsInfoPaneStrings } from '../components/VirtualWalkthrough/ControlsInfoPane';

export default {
  title: 'ControlsInfoPane',
  component: ControlsInfoPane,
};

const sampleStrings: ControlsInfoPaneStrings = {
  controls: 'Controls',
  annotations: 'Annotations',
  autoRotate: 'Auto rotate',
  orbit: 'Orbit',
  leftMouse: 'Left mouse',
  touchDrag: 'Touch drag',
  pan: 'Pan',
  middleMouse: 'Middle mouse',
  swipe: 'Swipe',
  look: 'Look',
  rightMouse: 'Right mouse',
  zoom: 'Zoom',
  mouseWheel: 'Mouse wheel',
  pinch: 'Pinch',
  fly: 'Fly',
  arrowKeys: 'Arrow keys',
  flyFaster: 'Fly faster',
  shift: 'Shift',
  flySlower: 'Fly slower',
  ctrl: 'Ctrl',
  resetCamera: 'Reset camera',
};

// Renders the pane inside a positioned "viewer" so its absolute positioning is
// visible in isolation. A local ref stands in for the scroll/click-away ref the
// SplatControls parent normally supplies.
const Template: Story<Partial<React.ComponentProps<typeof ControlsInfoPane>>> = (args) => {
  const paneRef = useRef<HTMLDivElement>(null);

  return (
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
      <ControlsInfoPane visible strings={sampleStrings} paneRef={paneRef} {...args} />
    </div>
  );
};

export const Default = Template.bind({});
Default.args = {};

export const FullScreen = Template.bind({});
FullScreen.args = { isFullScreen: true };
