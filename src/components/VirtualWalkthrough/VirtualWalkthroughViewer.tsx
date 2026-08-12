import React, { useCallback, useEffect, useMemo, useState } from 'react';

import { useTheme } from '@mui/material';
import { Entity } from '@playcanvas/react';
import { Camera, Script } from '@playcanvas/react/components';
import { useApp } from '@playcanvas/react/hooks';
import { Color, Vec3, XrInputSource } from 'playcanvas';
import { XrControllers } from 'playcanvas/scripts/esm/xr/xr-controllers.mjs';

import { useCameraPosition } from '../../hooks/useCameraPosition';
import { useDevicePerformance } from '../../hooks/useDevicePerformance';
import { useXr } from '../../hooks/useXr';
import Annotation, { AnnotationProps } from './Annotation';
import AnnotationPanel from './AnnotationPanel';
import { AutoRotator } from './AutoRotator';
import BoundaryRing from './BoundaryRing';
import BoundaryWall from './BoundaryWall';
import GradientSky from './GradientSky';
import SplatControls from './SplatControls';
import SplatModel from './SplatModel';
import { TfAnnotationManager } from './TfAnnotationManager';
import { TfXrNavigation } from './TfXrNavigation';
import VrAnnotationPanel from './VrAnnotationPanel';
import XrAnnotationInteraction from './XrAnnotationInteraction';
import XrExitButton from './XrExitButton';
import XrGazeDwell from './XrGazeDwell';
import XrPointerRay from './XrPointerRay';
import { XrStartPose } from './XrStartPose';
import { SplatFormat } from './splatFormat';
import { WalkthroughCamera } from './walkthrough-camera';
import { rayHitsInteractiveUi } from './xr-interactive-ui';

const DEFAULT_FOCUS_POINT: [number, number, number] = [0, 0.1, 0];
const DEFAULT_POSITION: [number, number, number] = [1, 0.1, 0];

// How far outside the clamp radius the boundary wall stands. Without it the wall would be coplanar
// with the surface the head is clamped to, so a pinned user would have it in their face and through
// their near clip plane.
const WALL_INSET = 0.25;

/**
 * Largest world size (metres) a hotspot is allowed to reach as the camera approaches it, so it
 * stops growing rather than filling the view from close up.
 */
const MAX_HOTSPOT_WORLD_SIZE = 0.75;

/**
 * Every coordinate, distance and size in this component is world-space, in the metres an XR
 * headset imposes on the scene: `scaleFactor` converts the splat's own arbitrary units to them,
 * and is applied to nothing but the splat itself.
 */
export interface VirtualWalkthroughViewerProps {
  splatSrc: string;
  splatFormat?: SplatFormat;
  /** World-space point the camera looks at. */
  origin?: [number, number, number];
  /** World-space point the camera starts at. */
  cameraPosition?: [number, number, number];
  /** World-space centre (x, y, z) and radius (m) of the circle the camera is held inside. */
  sceneBounds?: { x: number; y: number; z: number; m: number };
  /** Three world-space points defining the plane the camera walks on. */
  groundPlane?: [number, number, number][];
  skyColor?: string;
  groundColor?: string;
  /** Eye height (m) above the ground plane. */
  averageCameraHeight?: number;
  /**
   * Scale that converts the splat model's units to the world's metres. Applied to the splat
   * entity alone — every other coordinate this component takes is already world-space.
   */
  scaleFactor?: number;
  annotations: AnnotationProps[];
  onSaveAnnotations: (annotations: AnnotationProps[]) => void | Promise<void>;
  editable?: boolean;
  showFreeFly?: boolean;
  isFullScreen?: boolean;
  onToggleFullScreen?: () => void;
  maxImagesPerAnnotation?: number;
}

const VirtualWalkthroughViewer = ({
  splatSrc,
  splatFormat,
  origin = DEFAULT_FOCUS_POINT,
  cameraPosition = DEFAULT_POSITION,
  sceneBounds,
  groundPlane: groundPlaneProp,
  skyColor,
  groundColor,
  averageCameraHeight = 0,
  scaleFactor = 1,
  annotations,
  onSaveAnnotations,
  editable = false,
  showFreeFly = false,
  isFullScreen = false,
  onToggleFullScreen,
  maxImagesPerAnnotation,
}: VirtualWalkthroughViewerProps) => {
  const theme = useTheme();
  const { setCamera } = useCameraPosition();
  const { isHighPerformance } = useDevicePerformance();
  const app = useApp();

  const [showAnnotations, setShowAnnotations] = useState(true);
  const [autoRotate, setAutoRotate] = useState(true);
  const [isEdit, setIsEdit] = useState(false);
  const [isFreeFly, setIsFreeFly] = useState(false);
  const [selectedAnnotationIndex, setSelectedAnnotationIndex] = useState(-1);
  const [localAnnotations, setLocalAnnotations] = useState<AnnotationProps[]>(annotations);
  const [isTextFieldFocused, setIsTextFieldFocused] = useState(false);
  const [viewingAnnotation, setViewingAnnotation] = useState<AnnotationProps | null>(null);
  const [viewingAnnotationIndex, setViewingAnnotationIndex] = useState(-1);
  const [viewedScreenPos, setViewedScreenPos] = useState<{ x: number; y: number; size?: number } | null>(null);
  const { isCurrentlyInXr, isCurrentlyInVr, isCurrentlyInAr } = useXr();

  const sceneBoundsRadius = useMemo(() => {
    if (sceneBounds?.m !== undefined) {
      return sceneBounds.m;
    }
    const dx = cameraPosition[0] - origin[0];
    const dy = cameraPosition[1] - origin[1];
    const dz = cameraPosition[2] - origin[2];

    return Math.sqrt(dx * dx + dy * dy + dz * dz);
  }, [cameraPosition, sceneBounds, origin]);

  const sceneBoundsCenter = useMemo(
    () =>
      sceneBounds
        ? new Vec3(sceneBounds.x, sceneBounds.y, sceneBounds.z)
        : new Vec3(origin[0], cameraPosition[1], origin[2]),
    [sceneBounds, origin, cameraPosition]
  );

  const groundPlane = useMemo<Vec3[]>(
    () => (groundPlaneProp?.length === 3 ? groundPlaneProp.map((p) => new Vec3(p[0], p[1], p[2])) : []),
    [groundPlaneProp]
  );

  useEffect(() => {
    setCamera(origin, cameraPosition);
  }, [origin, cameraPosition, setCamera]);

  useEffect(() => {
    if (!groundPlane.length) {
      return;
    }
    // @ts-expect-error - scripts are added dynamically to the camera entity
    const walkthroughCam = app.root.findByName('camera')?.script?.walkthroughCamera;
    if (walkthroughCam) {
      // Should be changed to a react prop if shallowEquals in playcanvas/react is fixed (see https://github.com/playcanvas/react/pull/298)
      walkthroughCam.groundPlane = groundPlane;
    }
  }, [groundPlane, app]);

  useEffect(() => {
    // Set imperatively for the same reason as BoundaryRing: boundsCenter is a Vec3, and the
    // @playcanvas/react memo() comparator stops at the first prop with an .equals() method.
    // @ts-expect-error - scripts are added dynamically to the entity
    const navigation = app.root.findByName('camera-root')?.script?.tfXrNavigation;
    if (navigation) {
      navigation.boundsCenter = sceneBoundsCenter;
      navigation.boundsRadius = sceneBoundsRadius;
    }
  }, [app, sceneBoundsCenter, sceneBoundsRadius]);

  const handleToggleFreeFly = useCallback(() => {
    const newFreeFly = !isFreeFly;
    // @ts-expect-error - scripts are added dynamically to the camera entity
    const walkthroughCam = app.root.findByName('camera')?.script?.walkthroughCamera;
    if (walkthroughCam) {
      walkthroughCam.freeFly = newFreeFly;
    }
    if (!newFreeFly) {
      setCamera(origin, cameraPosition);
    }
    setIsFreeFly(newFreeFly);
  }, [isFreeFly, app, setCamera, origin, cameraPosition]);

  useEffect(() => {
    setLocalAnnotations(annotations);
  }, [annotations]);

  useEffect(() => {
    if (!isEdit) {
      setSelectedAnnotationIndex(-1);
    }
  }, [isEdit]);

  const handleAnnotationPositionChange = useCallback(
    (position: [number, number, number]) => {
      setLocalAnnotations((prev) => {
        if (selectedAnnotationIndex === -1) {
          return prev;
        }
        const updated = [...prev];
        updated[selectedAnnotationIndex] = { ...updated[selectedAnnotationIndex], position };

        return updated;
      });
    },
    [selectedAnnotationIndex]
  );

  const handleSave = useCallback(() => {
    const saveAndClose = async () => {
      await onSaveAnnotations(localAnnotations);
      setIsEdit(false);
      setSelectedAnnotationIndex(-1);
    };
    void saveAndClose();
  }, [onSaveAnnotations, localAnnotations]);

  const handleCancel = useCallback(() => {
    setLocalAnnotations(annotations);
    setIsEdit(false);
    setSelectedAnnotationIndex(-1);
  }, [annotations]);

  const handleAddAnnotation = useCallback(() => {
    const newAnnotation: AnnotationProps = { position: origin, title: '' };
    setLocalAnnotations((prev) => [...prev, newAnnotation]);
    setSelectedAnnotationIndex(localAnnotations.length);
  }, [origin, localAnnotations]);

  const handleDeleteAnnotation = useCallback(() => {
    if (selectedAnnotationIndex === -1) {
      return;
    }
    setLocalAnnotations((prev) => prev.filter((_, index) => index !== selectedAnnotationIndex));
    setSelectedAnnotationIndex(-1);
  }, [selectedAnnotationIndex]);

  const handleDeselectAnnotation = useCallback(() => {
    setSelectedAnnotationIndex(-1);
  }, []);

  const handleAnnotationView = useCallback(
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    (annotation: AnnotationProps, annotationIndex: number, screenX: number, screenY: number) => {
      setViewingAnnotation(annotation);
      setViewingAnnotationIndex(annotationIndex);
      // Cleared so the connector line waits for the hotspot's post-aim position
      // rather than briefly pointing at its old spot.
      setViewedScreenPos(null);
    },
    []
  );

  const handleAnnotationScreenPositionUpdate = useCallback(
    (_index: number, screenX: number, screenY: number, size?: number) => {
      if (isCurrentlyInXr) {
        return;
      }
      // The scene is frozen while the panel is open, so guard against redundant
      // updates from the per-frame callback to avoid needless re-renders.
      setViewedScreenPos((prev) =>
        prev && prev.x === screenX && prev.y === screenY && prev.size === size ? prev : { x: screenX, y: screenY, size }
      );
    },
    [isCurrentlyInXr]
  );

  const handleCloseAnnotation = useCallback(() => {
    setViewingAnnotation(null);
    setViewingAnnotationIndex(-1);
    setViewedScreenPos(null);
  }, []);

  const isTeleportBlocked = useCallback(
    (inputSource: XrInputSource) => rayHitsInteractiveUi(app, inputSource.getOrigin(), inputSource.getDirection()),
    [app]
  );

  useEffect(() => {
    if (!isCurrentlyInXr) {
      handleCloseAnnotation();
    }
  }, [isCurrentlyInXr, handleCloseAnnotation]);

  const handleAnnotationUpdate = useCallback(
    (updates: Partial<AnnotationProps>) => {
      if (selectedAnnotationIndex === -1) {
        return;
      }
      setLocalAnnotations((prev) => {
        const updated = [...prev];
        updated[selectedAnnotationIndex] = { ...updated[selectedAnnotationIndex], ...updates };

        return updated;
      });
    },
    [selectedAnnotationIndex]
  );

  const handleImagesChange = useCallback(
    (files: File[]) => handleAnnotationUpdate({ images: files }),
    [handleAnnotationUpdate]
  );

  const canSave = useMemo(
    () => localAnnotations.every((annotation) => annotation.title && annotation.title.trim() !== ''),
    [localAnnotations]
  );

  const splatModel = useMemo(
    () => (
      <SplatModel
        key='splat'
        splatSrc={splatSrc}
        splatFormat={splatFormat}
        rotation={[-180, 0, 0]}
        scaleFactor={scaleFactor}
        revealRain={isHighPerformance}
      />
    ),
    [isHighPerformance, splatSrc, splatFormat, scaleFactor]
  );

  return (
    <>
      <GradientSky
        topColor={skyColor || '#FFFFFF'}
        horizonColor={skyColor || '#EAF8FF'}
        groundColor={groundColor || '#C3BDB7'}
      />

      <Entity name='camera-root'>
        <Entity name='camera'>
          <Camera clearColor='#EAF8FF' fov={60} />
          {!isCurrentlyInXr && (
            <Script
              script={WalkthroughCamera}
              boundsCenter={sceneBoundsCenter}
              boundsRadius={sceneBoundsRadius}
              enableFly={!isTextFieldFocused}
              averageCameraHeight={averageCameraHeight}
            />
          )}
        </Entity>
        {/* Sibling of the camera (not a child): WalkthroughCamera rewrites the camera entity's
            transform every frame, so the button drives its own world pose from the XR head pose. */}
        <XrExitButton />
        <Script script={XrControllers} enabled={!isEdit} />
        <XrAnnotationInteraction onDismiss={handleCloseAnnotation} />
        <XrPointerRay />
        {/* VR only: the panel is driven by controller rays, which AR sessions don't have. */}
        {isCurrentlyInVr && viewingAnnotation && (
          <VrAnnotationPanel
            key={viewingAnnotationIndex}
            annotation={viewingAnnotation}
            annotationIndex={viewingAnnotationIndex}
          />
        )}
        {isCurrentlyInXr && <XrGazeDwell activeIndex={viewingAnnotationIndex} />}
        {/* Teleport is off in AR, where it can be disorienting, and while an annotation panel is open,
            so the trigger can operate the panel and click out to dismiss it. */}
        {/* Number props rather than a Vec3: @playcanvas/react's memo() comparator stops at the
            first prop with an .equals() method, so a Vec3 would stop the ones after it updating. */}
        <Script
          script={XrStartPose}
          targetX={cameraPosition[0]}
          targetZ={cameraPosition[2]}
          focusX={origin[0]}
          focusZ={origin[2]}
        />
        <Script
          script={TfXrNavigation}
          enabled={!isEdit}
          enableTeleport={!isCurrentlyInAr && !viewingAnnotation}
          enableSnapVertical={false}
          isTeleportBlocked={isTeleportBlocked}
        />
        {!isCurrentlyInXr && (
          <Script
            script={AutoRotator}
            enabled={!isEdit && autoRotate && !viewingAnnotation}
            startDelay={0.5}
            restartDelay={3}
            startFadeInTime={0.5}
          />
        )}
      </Entity>

      {/* Deliberately unscaled: the splat carries scaleFactor itself, so everything mounted here
          shares the one world space the camera rig and the XR head pose already live in. */}
      <Entity name='content-root'>
        {splatModel}

        {sceneBounds?.m !== undefined && groundPlane.length === 3 && (
          <BoundaryRing center={sceneBoundsCenter} radius={sceneBoundsRadius} groundPlane={groundPlane} />
        )}

        {localAnnotations.length > 0 && (
          <Entity name='annotations-root'>
            <Script
              script={TfAnnotationManager}
              enabled={true}
              hotspotSize={30}
              maxWorldSize={MAX_HOTSPOT_WORLD_SIZE}
              opacity={1}
              hotspotColor={new Color().fromString(theme.palette.TwClrIcnBrand as string)}
              hoverColor={new Color().fromString('#ffffff')}
              hotspotBackgroundColor={theme.palette.TwClrBaseWhite as string}
            />
            {localAnnotations.map((annotation, index) => (
              <Annotation
                key={`annotation-${index}`}
                {...annotation}
                index={index}
                visible={showAnnotations}
                isEdit={isEdit}
                isSelected={selectedAnnotationIndex === index}
                isViewed={viewingAnnotationIndex === index}
                onSelect={() => setSelectedAnnotationIndex(index)}
                onPositionChange={handleAnnotationPositionChange}
                onView={(anno, screenX, screenY) => handleAnnotationView(anno, index, screenX, screenY)}
                onScreenPositionUpdate={handleAnnotationScreenPositionUpdate}
              />
            ))}
          </Entity>
        )}
      </Entity>

      {isCurrentlyInXr && sceneBoundsRadius > 0 && (
        <BoundaryWall
          center={sceneBoundsCenter}
          radius={sceneBoundsRadius + WALL_INSET}
          groundPlane={groundPlane}
          baseY={0}
        />
      )}

      <SplatControls
        defaultCameraFocus={origin}
        defaultCameraPosition={cameraPosition}
        showAnnotations={showAnnotations}
        onToggleAnnotations={setShowAnnotations}
        autoRotate={autoRotate}
        onToggleAutoRotate={setAutoRotate}
        isEdit={isEdit}
        onToggleEdit={setIsEdit}
        onSave={handleSave}
        onCancel={handleCancel}
        onAddAnnotation={handleAddAnnotation}
        onDeleteAnnotation={handleDeleteAnnotation}
        onDeselectAnnotation={handleDeselectAnnotation}
        hasSelectedAnnotation={selectedAnnotationIndex >= 0}
        selectedAnnotation={selectedAnnotationIndex >= 0 ? localAnnotations[selectedAnnotationIndex] : null}
        selectedAnnotationIndex={selectedAnnotationIndex}
        onAnnotationUpdate={handleAnnotationUpdate}
        onImagesChange={handleImagesChange}
        maxImagesPerAnnotation={maxImagesPerAnnotation}
        onTextFieldFocus={setIsTextFieldFocused}
        canSave={canSave}
        editable={editable}
        isFullScreen={isFullScreen}
        onToggleFullScreen={onToggleFullScreen}
        isFreeFly={isFreeFly}
        onToggleFreeFly={handleToggleFreeFly}
        showFreeFly={showFreeFly}
      />

      <AnnotationPanel
        annotation={viewingAnnotation}
        hotspotPosition={viewedScreenPos}
        onClose={handleCloseAnnotation}
      />
    </>
  );
};

export default VirtualWalkthroughViewer;
