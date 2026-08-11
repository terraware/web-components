import React, { useRef } from 'react';

import { Story } from '@storybook/react';

import ControlsInfoPane from '../components/VirtualWalkthrough/ControlsInfoPane';

export default {
  title: 'ControlsInfoPane',
  component: ControlsInfoPane,
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
      <ControlsInfoPane visible paneRef={paneRef} {...args} />
    </div>
  );
};

export const Default = Template.bind({});
Default.args = {};

export const FullScreen = Template.bind({});
FullScreen.args = { isFullScreen: true };
