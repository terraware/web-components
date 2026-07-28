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
import CameraInfo from './components/VirtualWalkthrough/CameraInfo';
import ControlsInfoPane from './components/VirtualWalkthrough/ControlsInfoPane';
import SplatControls from './components/VirtualWalkthrough/SplatControls';
import { TfAnnotationManager } from './components/VirtualWalkthrough/TfAnnotationManager';

export type { AnnotationProps, AnnotationIconType } from './components/VirtualWalkthrough/Annotation';
export type { AnnotationEditPaneStrings } from './components/VirtualWalkthrough/AnnotationEditPane';
export type { CameraInfoStrings, CameraState } from './components/VirtualWalkthrough/CameraInfo';
export type { ControlsInfoPaneStrings } from './components/VirtualWalkthrough/ControlsInfoPane';
export type { SplatControlsProps, SplatControlsStrings } from './components/VirtualWalkthrough/SplatControls';

export {
  Annotation,
  AnnotationEditPane,
  AnnotationPanel,
  CameraInfo,
  ControlsInfoPane,
  SplatControls,
  TfAnnotationManager,
};
