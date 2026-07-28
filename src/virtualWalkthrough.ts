/*
 * Public entry point for the PlayCanvas-based virtual walkthrough components.
 *
 * These are kept out of the main index so that importing the core component
 * library does not pull in playcanvas. Import them from
 * `@terraware/web-components/virtualWalkthrough`.
 */
import Annotation from './components/VirtualWalkthrough/Annotation';
import AnnotationEditPane from './components/VirtualWalkthrough/AnnotationEditPane';
import AnnotationPanel from './components/VirtualWalkthrough/AnnotationPanel';
import { AutoRotator } from './components/VirtualWalkthrough/AutoRotator';
import CameraInfo from './components/VirtualWalkthrough/CameraInfo';
import ControlsInfoPane from './components/VirtualWalkthrough/ControlsInfoPane';
import SplatControls from './components/VirtualWalkthrough/SplatControls';
import SplatCrop from './components/VirtualWalkthrough/SplatCrop';
import SplatFadeCrop from './components/VirtualWalkthrough/SplatFadeCrop';
import SplatRevealRain from './components/VirtualWalkthrough/SplatRevealRain';
import { TfAnnotationManager } from './components/VirtualWalkthrough/TfAnnotationManager';
import { TfXrNavigation } from './components/VirtualWalkthrough/TfXrNavigation';
import { BoundaryRingScript, boundaryRingMesh } from './components/VirtualWalkthrough/boundary-ring';
import { computeGroundPlane, yOnPlane } from './components/VirtualWalkthrough/groundPlane';
import { WalkthroughCamera } from './components/VirtualWalkthrough/walkthrough-camera';

export type { AnnotationProps, AnnotationIconType } from './components/VirtualWalkthrough/Annotation';
export type { AnnotationEditPaneStrings } from './components/VirtualWalkthrough/AnnotationEditPane';
export type { CameraInfoStrings, CameraState } from './components/VirtualWalkthrough/CameraInfo';
export type { ControlsInfoPaneStrings } from './components/VirtualWalkthrough/ControlsInfoPane';
export type { SplatControlsProps, SplatControlsStrings } from './components/VirtualWalkthrough/SplatControls';
export type { BoundaryRingGeometry, BoundaryRingGeometryParams } from './components/VirtualWalkthrough/boundary-ring';
export type { GroundPlane } from './components/VirtualWalkthrough/groundPlane';

export {
  Annotation,
  AnnotationEditPane,
  AnnotationPanel,
  AutoRotator,
  boundaryRingMesh,
  BoundaryRingScript,
  CameraInfo,
  computeGroundPlane,
  ControlsInfoPane,
  SplatControls,
  SplatCrop,
  SplatFadeCrop,
  SplatRevealRain,
  TfAnnotationManager,
  TfXrNavigation,
  WalkthroughCamera,
  yOnPlane,
};
