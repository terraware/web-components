import React, { useCallback, useEffect, useRef, useState } from 'react';

import { Fullscreen, FullscreenExit } from '@mui/icons-material';
import { Box, IconButton, useTheme } from '@mui/material';
import { useApp } from '@playcanvas/react/hooks';
import { CameraComponent, XRSPACE_LOCAL, XRTYPE_AR, XRTYPE_VR } from 'playcanvas';

import useBoolean from '../../hooks/useBoolean';
import { useCameraPosition } from '../../hooks/useCameraPosition';
import { getRgbaFromHex } from '../../utils/color';
import useDeviceInfo from '../../utils/useDeviceInfo';
import Button from '../Button/Button';
import Icon from '../Icon/Icon';
import { AnnotationProps } from './Annotation';
import AnnotationEditPane, { AnnotationEditPaneStrings } from './AnnotationEditPane';
import CameraInfo, { CameraInfoStrings } from './CameraInfo';
import ControlsInfoPane, { ControlsInfoPaneStrings } from './ControlsInfoPane';

export interface SplatControlsStrings {
  addAnnotation: string;
  deselectAnnotation: string;
  deleteAnnotation: string;
  ar: string;
  vr: string;
  edit: string;
  freeFly: string;
  boundedFly: string;
  cancel: string;
  save: string;
  controlsInfoPane: ControlsInfoPaneStrings;
  cameraInfo: CameraInfoStrings;
  annotationEditPane: AnnotationEditPaneStrings;
}

export interface SplatControlsProps {
  strings: SplatControlsStrings;
  defaultCameraPosition?: [number, number, number];
  defaultCameraFocus?: [number, number, number];
  showAnnotations?: boolean;
  onToggleAnnotations?: (show: boolean) => void;
  autoRotate?: boolean;
  onToggleAutoRotate?: (enabled: boolean) => void;
  editable?: boolean;
  isEdit?: boolean;
  onToggleEdit?: (isEdit: boolean) => void;
  onSave?: () => void;
  onCancel?: () => void;
  onAddAnnotation?: () => void;
  onDeleteAnnotation?: () => void;
  onDeselectAnnotation?: () => void;
  hasSelectedAnnotation?: boolean;
  selectedAnnotation?: AnnotationProps | null;
  selectedAnnotationIndex?: number;
  onAnnotationUpdate: (updates: Partial<AnnotationProps>) => void;
  onTextFieldFocus?: (isFocused: boolean) => void;
  maxImagesPerAnnotation?: number;
  onImagesChange?: (files: File[]) => void;
  canSave?: boolean;
  isFullScreen?: boolean;
  onToggleFullScreen?: () => void;
  isFreeFly?: boolean;
  onToggleFreeFly?: () => void;
  showFreeFly?: boolean;
  onError?: (error: Error) => void;
}

const SplatControls = ({
  strings,
  defaultCameraPosition,
  defaultCameraFocus,
  showAnnotations,
  onToggleAnnotations,
  autoRotate,
  onToggleAutoRotate,
  editable,
  isEdit,
  onToggleEdit,
  onSave,
  onCancel,
  onAddAnnotation,
  onDeleteAnnotation,
  onDeselectAnnotation,
  hasSelectedAnnotation,
  selectedAnnotation,
  selectedAnnotationIndex,
  onAnnotationUpdate,
  onTextFieldFocus,
  maxImagesPerAnnotation,
  onImagesChange,
  canSave = true,
  isFullScreen = false,
  onToggleFullScreen,
  isFreeFly,
  onToggleFreeFly,
  showFreeFly = false,
  onError,
}: SplatControlsProps) => {
  const theme = useTheme();
  const { isDesktop } = useDeviceInfo();
  const app = useApp();
  const { setCamera, getCameraState } = useCameraPosition();
  const [isArAvailable, setIsArAvailable] = useState(false);
  const [isVrAvailable, setIsVrAvailable] = useState(false);
  const [isInfoVisible, setIsInfoVisible] = useBoolean(true);
  const paneRef = useRef<HTMLDivElement>(null);
  const infoButtonRef = useRef<HTMLButtonElement>(null);

  const errorCallback = useCallback(
    (err: Error | null) => {
      if (err) {
        onError?.(err);
        app.xr?.end();
      }
    },
    [app, onError]
  );

  const handleAr = useCallback(
    () =>
      app.xr?.start(app.root.findComponent('camera') as CameraComponent, XRTYPE_AR, XRSPACE_LOCAL, {
        callback: errorCallback,
      }),
    [app, errorCallback]
  );

  const handleVr = useCallback(
    () =>
      app.xr?.start(app.root.findComponent('camera') as CameraComponent, XRTYPE_VR, XRSPACE_LOCAL, {
        callback: errorCallback,
      }),
    [app, errorCallback]
  );

  useEffect(() => {
    // this can't be changed to `useMemo(() => app.xr?.isAvailable(XRTYPE_AR), [app])` because `app` doesn't update when
    // XR's availability is updated
    const handleAvailable = (type: string, available: boolean) => {
      if (type === XRTYPE_VR) {
        setIsVrAvailable(available);
      } else if (type === XRTYPE_AR) {
        setIsArAvailable(available);
      }
    };

    // Check current availability state on mount
    if (app.xr?.isAvailable(XRTYPE_VR)) {
      setIsVrAvailable(true);
    }
    if (app.xr?.isAvailable(XRTYPE_AR)) {
      setIsArAvailable(true);
    }

    app.xr?.on('available', handleAvailable);

    return () => {
      app.xr?.off('available', handleAvailable);
    };
  }, [app]);

  useEffect(() => {
    const handleKeyPress = (event: KeyboardEvent) => {
      if (event.key === 'r' || event.key === 'R') {
        if (defaultCameraFocus && !(isEdit && selectedAnnotation !== null)) {
          setCamera(defaultCameraFocus, defaultCameraPosition);
        }
      }
    };

    window.addEventListener('keydown', handleKeyPress);

    return () => {
      window.removeEventListener('keydown', handleKeyPress);
    };
  }, [isEdit, defaultCameraFocus, defaultCameraPosition, setCamera, selectedAnnotation]);

  const handleInfo = useCallback(() => {
    setIsInfoVisible((prev) => !prev);
  }, [setIsInfoVisible]);

  useEffect(() => {
    const handleScroll = (event: Event) => {
      if (isInfoVisible && paneRef.current && !paneRef.current.contains(event.target as Node)) {
        setIsInfoVisible(false);
      }
    };

    const handleMouseDown = (event: MouseEvent) => {
      const target = event.target as Node;
      const isClickOnInfoButton = infoButtonRef.current?.contains(target);
      if (isInfoVisible && paneRef.current && !paneRef.current.contains(target) && !isClickOnInfoButton) {
        setIsInfoVisible(false);
      }
    };

    if (isInfoVisible) {
      window.addEventListener('wheel', handleScroll, true);
      window.addEventListener('mousedown', handleMouseDown, true);
    }

    return () => {
      window.removeEventListener('wheel', handleScroll, true);
      window.removeEventListener('mousedown', handleMouseDown, true);
    };
  }, [isInfoVisible, setIsInfoVisible, infoButtonRef]);

  const handleEdit = useCallback(() => onToggleEdit?.(true), [onToggleEdit]);

  return (
    <Box
      sx={{
        position: 'absolute',
        top: 0,
        left: 0,
        right: 0,
        height: '100%',
        pointerEvents: 'none',
      }}
    >
      {isEdit && (
        <Box
          sx={{
            position: 'absolute',
            top: 16,
            left: '50%',
            transform: 'translateX(-50%)',
            display: 'flex',
            gap: 1,
            pointerEvents: 'auto',
          }}
        >
          {!hasSelectedAnnotation && onAddAnnotation && (
            <Button label={strings.addAnnotation} onClick={onAddAnnotation} />
          )}
          {hasSelectedAnnotation && onDeselectAnnotation && (
            <Button label={strings.deselectAnnotation} onClick={onDeselectAnnotation} />
          )}
          {hasSelectedAnnotation && onDeleteAnnotation && (
            <Button label={strings.deleteAnnotation} onClick={onDeleteAnnotation} />
          )}
        </Box>
      )}
      <Box
        sx={{
          position: 'absolute',
          bottom: 16,
          left: '50%',
          transform: 'translateX(-50%)',
          display: 'flex',
          gap: 1,
          pointerEvents: 'auto',
        }}
      >
        {isArAvailable && !isEdit && <Button label={strings.ar} onClick={handleAr} />}
        {isVrAvailable && !isEdit && <Button label={strings.vr} onClick={handleVr} />}
        {isDesktop && editable && !isEdit && onToggleEdit && <Button label={strings.edit} onClick={handleEdit} />}
        {isDesktop && showFreeFly && !isEdit && onToggleFreeFly && (
          <Button label={isFreeFly ? strings.boundedFly : strings.freeFly} onClick={onToggleFreeFly} />
        )}
        {isEdit && onCancel && <Button label={strings.cancel} onClick={onCancel} />}
        {isEdit && onSave && <Button label={strings.save} onClick={onSave} disabled={!canSave} />}
      </Box>
      {onToggleFullScreen && (
        <IconButton
          sx={{
            position: 'absolute',
            bottom: 16,
            right: 72,
            backgroundColor: getRgbaFromHex(theme.palette.TwClrIcnOnBrand as string, 0.9),
            '&:hover': { backgroundColor: getRgbaFromHex(theme.palette.TwClrIcnOnBrand as string, 1) },
            pointerEvents: 'auto',
          }}
          onClick={onToggleFullScreen}
          aria-label={isFullScreen ? 'Exit fullscreen' : 'Enter fullscreen'}
        >
          {isFullScreen ? (
            <FullscreenExit sx={{ color: theme.palette.TwClrIcnInfo }} />
          ) : (
            <Fullscreen sx={{ color: theme.palette.TwClrIcnInfo }} />
          )}
        </IconButton>
      )}
      <IconButton
        ref={infoButtonRef}
        sx={{
          position: 'absolute',
          bottom: 16,
          right: 16,
          backgroundColor: getRgbaFromHex(theme.palette.TwClrIcnOnBrand as string, 0.9),
          '&:hover': { backgroundColor: getRgbaFromHex(theme.palette.TwClrIcnOnBrand as string, 1) },
          pointerEvents: 'auto',
        }}
        onClick={handleInfo}
      >
        <Icon name='info' size={'medium'} fillColor={theme.palette.TwClrIcnInfo} />
      </IconButton>
      <ControlsInfoPane
        visible={isInfoVisible}
        paneRef={paneRef}
        strings={strings.controlsInfoPane}
        showAnnotations={showAnnotations}
        onToggleAnnotations={onToggleAnnotations}
        autoRotate={autoRotate}
        onToggleAutoRotate={onToggleAutoRotate}
        isFullScreen={isFullScreen}
      />
      <AnnotationEditPane
        key={selectedAnnotationIndex}
        visible={isEdit === true && hasSelectedAnnotation === true}
        annotation={selectedAnnotation ?? null}
        strings={strings.annotationEditPane}
        onUpdate={onAnnotationUpdate}
        onTextFieldFocus={onTextFieldFocus}
        maxImages={maxImagesPerAnnotation}
        onImagesChange={onImagesChange}
      />
      {isEdit && <CameraInfo strings={strings.cameraInfo} getCameraState={getCameraState} />}
    </Box>
  );
};

export default SplatControls;
