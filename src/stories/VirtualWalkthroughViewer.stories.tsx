import React, { ReactNode, useCallback, useEffect, useState } from 'react';

import { Entity } from '@playcanvas/react';
import { Camera } from '@playcanvas/react/components';
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
  {
    position: [8.75, 1.2, -10.5],
    title: 'BIG annotation',
    label: 'Super BIG',
    bodyText:
      'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum. Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum. Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum. Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.',
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

// Exercises a camera being passed into the viewer
export const WideFieldOfView = Template.bind({});
WideFieldOfView.args = {
  camera: <Camera clearColor='#EAF8FF' fov={120} />,
};

// Browsers only grant a session from a user gesture, and selecting a story is a click in Storybook's
// manager frame, which leaves the preview iframe without one.
const AutoStartVrTemplate: Story<Partial<VirtualWalkthroughViewerProps>> = (args) => {
  const [isMounted, setIsMounted] = useState(false);

  const handleXrExit = useCallback((error?: Error) => {
    setIsMounted(false);
    if (error) {
      // eslint-disable-next-line no-alert
      window.alert(error.message);
    }
  }, []);

  return (
    <div style={containerStyle}>
      <div style={{ position: 'absolute', top: 16, left: 16, zIndex: 1001 }}>
        <Button label='Start in VR' onClick={() => setIsMounted(true)} />
      </div>
      <Application style={{ width: '100%', height: '100%' }}>
        {isMounted && <VirtualWalkthroughViewer {...sceneArgs} {...args} autoStartVr onXrExit={handleXrExit} />}
      </Application>
    </div>
  );
};

export const AutoStartVr = AutoStartVrTemplate.bind({});

/**
 * Starts a session on the scene's own camera, then mounts the walkthrough into it.
 *
 * The walkthrough is handed `camera={null}`, so it adopts that camera into its rig rather than
 * bringing one of its own — which it could only make the session's camera by ending the session.
 * Thumbstick movement, snap turning, teleport, the bounds clamp and the XR start pose all have to
 * work here exactly as they do when the walkthrough owns the camera.
 */
const HostSession = ({ children }: { children: ReactNode }) => {
  const { isCurrentlyInXr, isXrAvailable, startXr } = useXr();

  useEffect(() => {
    if (!isCurrentlyInXr && isXrAvailable('VR')) {
      startXr('VR');
    }
  }, [isCurrentlyInXr, isXrAvailable, startXr]);

  return <>{isCurrentlyInXr && children}</>;
};

const HostCameraTemplate: Story<Partial<VirtualWalkthroughViewerProps>> = (args) => {
  const [isRequested, setIsRequested] = useState(false);

  return (
    <div style={containerStyle}>
      <div style={{ position: 'absolute', top: 16, left: 16, zIndex: 1001 }}>
        <Button label='Start in VR' onClick={() => setIsRequested(true)} />
      </div>
      <Application style={{ width: '100%', height: '100%' }}>
        <Entity name='camera' position={[0, 1.3, 0.5]}>
          <Camera clearColor='#01030A' fov={70} nearClip={0.05} farClip={60000} />
        </Entity>
        {isRequested && (
          <HostSession>
            <VirtualWalkthroughViewer {...sceneArgs} {...args} camera={null} onXrExit={() => setIsRequested(false)} />
          </HostSession>
        )}
      </Application>
    </div>
  );
};

export const HostOwnedCamera = HostCameraTemplate.bind({});
