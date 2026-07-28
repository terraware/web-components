/*
 * Public entry point for the PlayCanvas-based virtual walkthrough components.
 *
 * These are kept out of the main index so that importing the core component
 * library does not pull in playcanvas. Import them from
 * `@terraware/web-components/virtualWalkthrough`.
 */
import AnnotationPanel from './components/VirtualWalkthrough/AnnotationPanel';

export type { AnnotationProps, AnnotationIconType } from './components/VirtualWalkthrough/Annotation';

export { AnnotationPanel };
