import React, { useCallback, useEffect, useRef } from 'react';

import { Fullscreen, FullscreenExit } from '@mui/icons-material';
import { Box, IconButton, useTheme } from '@mui/material';

import useBoolean from '../../hooks/useBoolean';
import { useCameraPosition } from '../../hooks/useCameraPosition';
import { useXr } from '../../hooks/useXr';
import { useStrings } from '../../strings';
import { getRgbaFromHex } from '../../utils/color';
import useDeviceInfo from '../../utils/useDeviceInfo';
import Button from '../Button/Button';
import Icon from '../Icon/Icon';
import { AnnotationProps } from './Annotation';
import AnnotationEditPane from './AnnotationEditPane';
import CameraInfo from './CameraInfo';
import ControlsInfoPane from './ControlsInfoPane';

export interface SplatControlsProps {
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
  const strings = useStrings();
  const { isDesktop, isMobile } = useDeviceInfo();
  const { setCamera, getCameraState } = useCameraPosition();
  const { isXrAvailable, startXr } = useXr({ onError });
  const [isInfoVisible, setIsInfoVisible] = useBoolean(true);
  const paneRef = useRef<HTMLDivElement>(null);
  const infoButtonRef = useRef<HTMLButtonElement>(null);

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
            <Button label={strings.ADD_ANNOTATION} onClick={onAddAnnotation} />
          )}
          {hasSelectedAnnotation && onDeselectAnnotation && (
            <Button label={strings.DESELECT_ANNOTATION} onClick={onDeselectAnnotation} />
          )}
          {hasSelectedAnnotation && onDeleteAnnotation && (
            <Button label={strings.DELETE_ANNOTATION} onClick={onDeleteAnnotation} />
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
        {isMobile && isXrAvailable('AR') && !isEdit && <Button label={strings.AR} onClick={() => startXr('AR')} />}
        {!isMobile && isXrAvailable('VR') && !isEdit && <Button label={strings.VR} onClick={() => startXr('VR')} />}
        {isDesktop && editable && !isEdit && onToggleEdit && <Button label={strings.EDIT} onClick={handleEdit} />}
        {isDesktop && showFreeFly && !isEdit && onToggleFreeFly && (
          <Button label={isFreeFly ? strings.BOUNDED_FLY : strings.FREE_FLY} onClick={onToggleFreeFly} />
        )}
        {isEdit && onCancel && <Button label={strings.CANCEL} onClick={onCancel} />}
        {isEdit && onSave && <Button label={strings.SAVE} onClick={onSave} disabled={!canSave} />}
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
        onUpdate={onAnnotationUpdate}
        onTextFieldFocus={onTextFieldFocus}
        maxImages={maxImagesPerAnnotation}
        onImagesChange={onImagesChange}
      />
      {isEdit && <CameraInfo getCameraState={getCameraState} />}
    </Box>
  );
};

export default SplatControls;
