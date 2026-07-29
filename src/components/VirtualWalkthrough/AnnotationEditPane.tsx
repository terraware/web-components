import React, { useCallback, useMemo } from 'react';

import { Box, Fade, ThemeProvider, Tooltip, Typography, useTheme } from '@mui/material';

import PhotoChooser from '../PhotoChooser';
import Textfield from '../Textfield/Textfield';
import { AnnotationProps } from './Annotation';

export interface AnnotationEditPaneStrings {
  editAnnotation: string;
  title: string;
  titleTooltip: string;
  description: string;
  descriptionTooltip: string;
  label: string;
  labelTooltip: string;
  images?: {
    uploadTitle?: string;
    uploadText?: string;
    uploadDescription?: string;
    chooseFileText?: string;
    replaceFileText?: string;
    photoSelectedText?: string;
  };
}

interface AnnotationEditPaneProps {
  visible: boolean;
  annotation: AnnotationProps | null;
  strings: AnnotationEditPaneStrings;
  onUpdate: (updates: Partial<AnnotationProps>) => void;
  onTextFieldFocus?: (isFocused: boolean) => void;
  maxImages?: number;
  /** Fires with the current selection on every add/remove, including an initial empty emission on mount. */
  onImagesChange?: (files: File[]) => void;
}

const AnnotationEditPane = ({
  visible,
  annotation,
  strings,
  onUpdate,
  onTextFieldFocus,
  maxImages,
  onImagesChange,
}: AnnotationEditPaneProps) => {
  const theme = useTheme();

  const showImageUpload = !!onImagesChange && !!maxImages && maxImages > 0;

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
            <Typography sx={{ fontWeight: 600 }}>{strings.editAnnotation}</Typography>

            <Tooltip title={strings.titleTooltip} placement='top' disableFocusListener>
              <Textfield
                id='annotation-title'
                label={strings.title}
                type='text'
                value={annotation.title}
                onChange={handleTitleChange}
                onFocus={handleFocus}
                onBlur={handleBlur}
                sx={textFieldSx}
                required
              />
            </Tooltip>

            <Tooltip title={strings.descriptionTooltip} placement='top' disableFocusListener>
              <Textfield
                id='annotation-body'
                label={strings.description}
                type='text'
                value={annotation.bodyText ?? ''}
                onChange={handleBodyTextChange}
                onFocus={handleFocus}
                onBlur={handleBlur}
                sx={textFieldSx}
              />
            </Tooltip>

            <Tooltip title={strings.labelTooltip} placement='top' disableFocusListener>
              <Textfield
                id='annotation-label'
                label={strings.label}
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
                {strings.images?.uploadTitle && (
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
                    {strings.images.uploadTitle}
                  </Typography>
                )}
                <ThemeProvider theme={photoChooserTheme}>
                  <PhotoChooser
                    uploadText={strings.images?.uploadText}
                    uploadDescription={strings.images?.uploadDescription}
                    chooseFileText={strings.images?.chooseFileText}
                    replaceFileText={strings.images?.replaceFileText}
                    photoSelectedText={strings.images?.photoSelectedText}
                    multipleSelection={(maxImages ?? 0) > 1}
                    maxPhotos={maxImages}
                    onPhotosChanged={(files) => onImagesChange?.(files)}
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
