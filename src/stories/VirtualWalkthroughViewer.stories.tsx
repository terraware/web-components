import React from 'react';

import { action } from '@storybook/addon-actions';
import { Story } from '@storybook/react';

import { AnnotationProps } from '../components/VirtualWalkthrough/Annotation';
import Application from '../components/VirtualWalkthrough/Application';
import VirtualWalkthroughViewer, {
  VirtualWalkthroughViewerProps,
} from '../components/VirtualWalkthrough/VirtualWalkthroughViewer';

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
    position: [0.1, 0.05, 0],
    title: 'Mangrove nursery',
    bodyText:
      'Seedlings raised here are transplanted along the coastline to restore the mangrove belt that protects the village from storm surge.',
    // picsum.photos serves permissive CORS headers, so the image can be drawn to a
    // canvas and uploaded as a WebGL texture in the VR panel without tainting it.
    icon: 'image',
    imageUrls: ['https://picsum.photos/seed/mangrove/800/600'],
  },
  {
    position: [-0.4, 0.1, -0.3],
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
    position: [0.45, 0.08, -0.7],
    title: 'Community trail',
    label: 'Trail',
    bodyText:
      'The boardwalk lets visitors cross the wetland without trampling seedlings, and doubles as the route rangers use for weekly surveys.',
  },
];

// The viewer renders PlayCanvas scene-graph elements and calls useApp(), so it
// must be mounted inside the PlayCanvas <Application> (which provides the WebGL
// canvas). The story runs in Storybook's real browser, so WebGL works as it
// does in the consuming app.
const Template: Story<Partial<VirtualWalkthroughViewerProps>> = (args) => (
  <div style={{ position: 'relative', width: '95%', height: '100%', overflow: 'hidden', borderRadius: 8 }}>
    <Application style={{ width: '100%', height: '100%' }}>
      <VirtualWalkthroughViewer
        splatSrc={DEFAULT_SPLAT_SRC}
        annotations={sampleAnnotations}
        onSaveAnnotations={action('onSaveAnnotations')}
        editable
        showFreeFly
        skyColor={'#4286DC'}
        groundColor={'#98932E'}
        groundPlane={[
          [-0.15, -0.1, 0],
          [0.8, -0.1, -0.1],
          [-0.3, -0.1, -1],
        ]}
        sceneBounds={{ x: 0, y: -0.1, z: -0.1, m: 1 }}
        averageCameraHeight={0.2}
        scaleFactor={15}
        {...args}
      />
    </Application>
  </div>
);

export const Default = Template.bind({});
Default.args = {
  splatSrc: DEFAULT_SPLAT_SRC,
};
