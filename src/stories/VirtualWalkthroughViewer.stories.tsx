import React from 'react';

import { action } from '@storybook/addon-actions';
import { Story } from '@storybook/react';

import { AnnotationProps } from '../components/VirtualWalkthrough/Annotation';
import Application from '../components/VirtualWalkthrough/Application';
import { SplatControlsStrings } from '../components/VirtualWalkthrough/SplatControls';
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
  },
};

// Remote hosted Gaussian-splat scene. No splat asset is bundled in this repo,
// so the viewer fetches one over the network at story-view time.
const DEFAULT_SPLAT_SRC =
  'https://dl.dropboxusercontent.com/scl/fi/qc98eudfcnsdvmfgtjryf/7154.sog?rlkey=170i5e1hdwi7iu3i0cnm0afbu&st=9bqpkpph&raw=1';

const sampleStrings: SplatControlsStrings = {
  addAnnotation: 'Add annotation',
  deselectAnnotation: 'Deselect annotation',
  deleteAnnotation: 'Delete annotation',
  ar: 'AR',
  vr: 'VR',
  edit: 'Edit',
  freeFly: 'Free fly',
  boundedFly: 'Bounded fly',
  cancel: 'Cancel',
  save: 'Save',
  controlsInfoPane: {
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
  },
  cameraInfo: {
    cameraInfo: 'Camera info',
    cameraPosition: 'Position',
    cameraFocusPoint: 'Focus point',
  },
  annotationEditPane: {
    editAnnotation: 'Edit annotation',
    title: 'Title',
    titleTooltip: 'A short name for this annotation',
    description: 'Description',
    descriptionTooltip: 'Details shown when the annotation is opened',
    label: 'Label',
    labelTooltip: 'Optional short label shown on the hotspot',
  },
};

const sampleAnnotations: AnnotationProps[] = [
  {
    position: [0.1, 0.05, 0],
    title: 'Mangrove nursery',
    bodyText:
      'Seedlings raised here are transplanted along the coastline to restore the mangrove belt that protects the village from storm surge.',
  },
  {
    position: [-0.4, 0.1, -0.3],
    title: 'Monitoring station',
    bodyText: 'Sensors here track soil moisture and canopy growth over time.',
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
        strings={sampleStrings}
        editable
        showFreeFly
        {...args}
      />
    </Application>
  </div>
);

export const Default = Template.bind({});
Default.args = {
  splatSrc: DEFAULT_SPLAT_SRC,
};
