import React, { useCallback, useMemo } from 'react';

import { Box, Fade, Tooltip, Typography, useTheme } from '@mui/material';

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
}

interface AnnotationEditPaneProps {
  visible: boolean;
  annotation: AnnotationProps | null;
  strings: AnnotationEditPaneStrings;
  onUpdate: (updates: Partial<AnnotationProps>) => void;
  onTextFieldFocus?: (isFocused: boolean) => void;
}

const AnnotationEditPane = ({ visible, annotation, strings, onUpdate, onTextFieldFocus }: AnnotationEditPaneProps) => {
  const theme = useTheme();

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
          </Box>
        </Box>
      </Fade>
    </Box>
  );
};

export default AnnotationEditPane;
