import React, { useCallback, useMemo } from 'react';

import { Box, Fade, ThemeProvider, Tooltip, Typography, useTheme } from '@mui/material';

import { useStrings } from '../../strings';
import PhotoChooser from '../PhotoChooser';
import Textfield from '../Textfield/Textfield';
import { AnnotationProps } from './Annotation';

interface AnnotationEditPaneProps {
  visible: boolean;
  annotation: AnnotationProps | null;
  onUpdate: (updates: Partial<AnnotationProps>) => void;
  onTextFieldFocus?: (isFocused: boolean) => void;
  maxImages?: number;
  /** Fires with the current selection on every add/remove, including an initial empty emission on mount. */
  onImagesChange?: (files: File[]) => void;
}

const AnnotationEditPane = ({
  visible,
  annotation,
  onUpdate,
  onTextFieldFocus,
  maxImages,
  onImagesChange,
}: AnnotationEditPaneProps) => {
  const theme = useTheme();
  const strings = useStrings();

  const showImageUpload = !!onImagesChange && !!maxImages && maxImages > 0;

  const remainingImageSlots = Math.max(0, (maxImages ?? 0) - (annotation?.imageUrls?.length ?? 0));

  // Recolor PhotoChooser's Terraware tokens to match the dark edit pane instead of its default light card.
  const photoChooserTheme = useMemo(
    () => ({
      ...theme,
      palette: {
        ...theme.palette,
        TwClrBg: 'transparent',
        TwClrBrdrTertiary: theme.palette.grey[700],
        TwClrTxt: theme.palette.grey[300],
      },
    }),
    [theme]
  );

  const textFieldSx = useMemo(
    () => ({
      '& .textfield-label': {
        color: `${theme.palette.grey[400]} !important`,
      },
      '& .textfield-value': {
        backgroundColor: `${theme.palette.grey[800]} !important`,
        borderColor: `${theme.palette.grey[700]} !important`,
      },
      '& input': {
        color: `${theme.palette.common.white} !important`,
      },
    }),
    [theme]
  );

  const handleTitleChange = useCallback(
    (value: unknown) => {
      onUpdate({ title: value as string });
    },
    [onUpdate]
  );

  const handleBodyTextChange = useCallback(
    (value: unknown) => {
      onUpdate({ bodyText: value as string });
    },
    [onUpdate]
  );

  const handleLabelChange = useCallback(
    (value: unknown) => {
      onUpdate({ label: value as string });
    },
    [onUpdate]
  );

  const handleRemoveExistingImage = useCallback(
    (index: number) => {
      const remaining = (annotation?.imageUrls ?? []).filter((_, i) => i !== index);
      onUpdate({ imageUrls: remaining });
    },
    [annotation, onUpdate]
  );

  const handleFocus = useCallback(() => {
    onTextFieldFocus?.(true);
  }, [onTextFieldFocus]);

  const handleBlur = useCallback(() => {
    onTextFieldFocus?.(false);
  }, [onTextFieldFocus]);

  if (!annotation) {
    return null;
  }

  return (
    <Box
      sx={{
        position: 'absolute',
        top: 0,
        left: 0,
        right: 0,
        bottom: 0,
        pointerEvents: 'none',
        display: 'flex',
        justifyContent: 'flex-start',
        alignItems: 'flex-start',
        padding: 2,
        zIndex: 1001,
      }}
    >
      <Fade in={visible} timeout={500}>
        <Box
          sx={{
            backgroundColor: theme.palette.grey[900],
            color: theme.palette.common.white,
            borderRadius: 2,
            padding: 3,
            minWidth: 320,
            maxWidth: 400,
            pointerEvents: 'auto',
          }}
        >
          <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
            <Typography sx={{ fontWeight: 600 }}>{strings.EDIT_ANNOTATION}</Typography>

            <Tooltip title={strings.ANNOTATION_TITLE_TOOLTIP} placement='top' disableFocusListener>
              <Textfield
                id='annotation-title'
                label={strings.TITLE}
                type='text'
                value={annotation.title}
                onChange={handleTitleChange}
                onFocus={handleFocus}
                onBlur={handleBlur}
                sx={textFieldSx}
                required
              />
            </Tooltip>

            <Tooltip title={strings.ANNOTATION_DESCRIPTION_TOOLTIP} placement='top' disableFocusListener>
              <Textfield
                id='annotation-body'
                label={strings.DESCRIPTION}
                type='text'
                value={annotation.bodyText ?? ''}
                onChange={handleBodyTextChange}
                onFocus={handleFocus}
                onBlur={handleBlur}
                sx={textFieldSx}
              />
            </Tooltip>

            <Tooltip title={strings.ANNOTATION_LABEL_TOOLTIP} placement='top' disableFocusListener>
              <Textfield
                id='annotation-label'
                label={strings.LABEL}
                type='text'
                value={annotation.label ?? ''}
                onChange={handleLabelChange}
                onFocus={handleFocus}
                onBlur={handleBlur}
                sx={textFieldSx}
              />
            </Tooltip>

            {showImageUpload && (
              <Box>
                <Typography
                  sx={{
                    fontFamily: 'Inter',
                    fontSize: '14px',
                    fontWeight: 400,
                    lineHeight: '20px',
                    color: theme.palette.grey[400],
                    marginBottom: 0.5,
                  }}
                >
                  {strings.IMAGES}
                </Typography>
                <ThemeProvider theme={photoChooserTheme}>
                  <PhotoChooser
                    uploadText={strings.UPLOAD_FILES}
                    uploadDescription={strings.UPLOAD_FILES_DESCRIPTION}
                    chooseFileText={strings.CHOOSE_FILE}
                    replaceFileText={strings.REPLACE_FILE}
                    photoSelectedText={strings.FILE_SELECTED}
                    multipleSelection={(maxImages ?? 0) > 1}
                    maxPhotos={remainingImageSlots}
                    onPhotosChanged={(files) => onImagesChange?.(files)}
                    existingPhotos={annotation.imageUrls}
                    onExistingPhotoRemoved={handleRemoveExistingImage}
                    existingImagesLabel={strings.EXISTING}
                    newImagesLabel={strings.NEW}
                  />
                </ThemeProvider>
              </Box>
            )}
          </Box>
        </Box>
      </Fade>
    </Box>
  );
};

export default AnnotationEditPane;
