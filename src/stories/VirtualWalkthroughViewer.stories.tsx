import React, { useCallback, useEffect, useRef, useState } from 'react';

import { action } from '@storybook/addon-actions';
import { Story } from '@storybook/react';

import Button from '../components/Button/Button';
import { AnnotationProps } from '../components/VirtualWalkthrough/Annotation';
import Application from '../components/VirtualWalkthrough/Application';
import VirtualWalkthroughViewer, {
  VirtualWalkthroughViewerProps,
} from '../components/VirtualWalkthrough/VirtualWalkthroughViewer';
import { useXr } from '../hooks/useXr';

export default {
  title: 'VirtualWalkthroughViewer',
  component: VirtualWalkthroughViewer,
  argTypes: {
    // Exposed as an editable control so a splat can be loaded live without
    // rebuilding. Defaults to a remote hosted .sog/.ply URL; paste your own to
    // swap scenes.
    splatSrc: { control: 'text' },
    // The format is inferred from splatSrc, so leave this unset unless the URL
    // hides the filename (signed download URLs) and the guess is wrong.
    splatFormat: {
      control: 'select',
      options: [undefined, 'sog', 'sogUnbundled', 'sogStreamed', 'ply'],
    },
  },
};

// Remote hosted Gaussian-splat scene. No splat asset is bundled in this repo,
// so the viewer fetches one over the network at story-view time.
const DEFAULT_SPLAT_SRC =
  'https://dl.dropboxusercontent.com/scl/fi/qc98eudfcnsdvmfgtjryf/7154.sog?rlkey=170i5e1hdwi7iu3i0cnm0afbu&st=9bqpkpph&raw=1';

const sampleAnnotations: AnnotationProps[] = [
  {
    position: [1.5, 0.75, 0],
    title: 'Mangrove nursery',
    bodyText:
      'Seedlings raised here are transplanted along the coastline to restore the mangrove belt that protects the village from storm surge.',
    // picsum.photos serves permissive CORS headers, so the image can be drawn to a
    // canvas and uploaded as a WebGL texture in the VR panel without tainting it.
    icon: 'image',
    imageUrls: ['https://picsum.photos/seed/mangrove/800/600'],
  },
  {
    position: [-6, 1.5, -4.5],
    title: 'Monitoring station',
    bodyText: 'Sensors here track soil moisture and canopy growth over time.',
    icon: 'image',
    imageUrls: [
      'https://picsum.photos/seed/sensors/800/600',
      'https://picsum.photos/seed/canopy/800/600',
      'https://picsum.photos/seed/soil/800/600',
    ],
  },
  {
    position: [6.75, 1.2, -10.5],
    title: 'Community trail',
    label: 'Trail',
    bodyText:
      'The boardwalk lets visitors cross the wetland without trampling seedlings, and doubles as the route rangers use for weekly surveys.',
  },
];

const sceneArgs: VirtualWalkthroughViewerProps = {
  splatSrc: DEFAULT_SPLAT_SRC,
  annotations: sampleAnnotations,
  onSaveAnnotations: action('onSaveAnnotations'),
  editable: true,
  showFreeFly: true,
  skyColor: '#4286DC',
  groundColor: '#98932E',
  groundPlane: [
    [-2.25, -1.5, 0],
    [12, -1.5, -1.5],
    [-4.5, -1.5, -15],
  ],
  sceneBounds: { x: 0, y: -1.5, z: -1.5, m: 15 },
  averageCameraHeight: 3,
  cameraPosition: [5, 0.1, -3],
  scaleFactor: 15,
};

const containerStyle = {
  position: 'relative' as const,
  width: '95%',
  height: '100%',
  overflow: 'hidden',
  borderRadius: 8,
};

// The viewer renders PlayCanvas scene-graph elements and calls useApp(), so it
// must be mounted inside the PlayCanvas <Application> (which provides the WebGL
// canvas). The story runs in Storybook's real browser, so WebGL works as it
// does in the consuming app.
const Template: Story<Partial<VirtualWalkthroughViewerProps>> = (args) => (
  <div style={containerStyle}>
    <Application style={{ width: '100%', height: '100%' }}>
      <VirtualWalkthroughViewer {...sceneArgs} {...args} />
    </Application>
  </div>
);

export const Default = Template.bind({});

// The XR manager is only reachable from inside the PlayCanvas <Application>, which
// the story itself sits outside of. This sibling of the viewer reports the session
// ending so the story can take the viewer back down.
const XrExitReporter = ({ onExit }: { onExit: () => void }) => {
  const { isCurrentlyInXr } = useXr();
  const wasInXr = useRef(false);

  useEffect(() => {
    if (wasInXr.current && !isCurrentlyInXr) {
      onExit();
    }
    wasInXr.current = isCurrentlyInXr;
  }, [isCurrentlyInXr, onExit]);

  return null;
};

// The scene starts empty: the button mounts the viewer with autoStartVr already
// set, so this exercises the mount-time path rather than a prop change on a
// viewer that is already running. Leaving the session unmounts it again, so the
// story returns to the button rather than to a viewer running on the desktop.
//
// The click is also what makes the session possible at all — browsers only grant
// one inside a user gesture, and selecting a story is a click in Storybook's
// manager frame, which leaves the preview iframe without one.
const AutoStartVrTemplate: Story<Partial<VirtualWalkthroughViewerProps>> = (args) => {
  // Counted rather than a flag so that a click after a session failed to start
  // remounts the viewer and tries again, instead of leaving the story stuck with
  // a mounted viewer and a button that does nothing.
  const [mountCount, setMountCount] = useState(0);

  const handleXrExit = useCallback(() => setMountCount(0), []);

  return (
    <div style={containerStyle}>
      <div style={{ position: 'absolute', top: 16, left: 16, zIndex: 1001 }}>
        <Button
          label={mountCount === 0 ? 'Start in VR' : 'Retry in VR'}
          onClick={() => setMountCount((count) => count + 1)}
        />
      </div>
      <Application style={{ width: '100%', height: '100%' }}>
        {mountCount > 0 && (
          <>
            <XrExitReporter onExit={handleXrExit} />
            <VirtualWalkthroughViewer
              key={mountCount}
              {...sceneArgs}
              autoStartVr
              // Alerted rather than logged: the console isn't reachable from inside a headset.
              // eslint-disable-next-line no-alert
              onXrError={(error) => window.alert(error.message)}
              {...args}
            />
          </>
        )}
      </Application>
    </div>
  );
};

export const AutoStartVr = AutoStartVrTemplate.bind({});
