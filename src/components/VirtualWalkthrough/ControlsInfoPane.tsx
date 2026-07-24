import React, { useCallback } from 'react';

import { Box, Checkbox, Divider, Fade, Typography, useTheme } from '@mui/material';

export interface ControlsInfoPaneStrings {
  controls: string;
  annotations: string;
  autoRotate: string;
  orbit: string;
  leftMouse: string;
  touchDrag: string;
  pan: string;
  middleMouse: string;
  swipe: string;
  look: string;
  rightMouse: string;
  zoom: string;
  mouseWheel: string;
  pinch: string;
  fly: string;
  arrowKeys: string;
  flyFaster: string;
  shift: string;
  flySlower: string;
  ctrl: string;
  resetCamera: string;
}

interface ControlsInfoPaneProps {
  visible: boolean;
  paneRef: React.RefObject<HTMLDivElement | null>;
  strings: ControlsInfoPaneStrings;
  showAnnotations?: boolean;
  onToggleAnnotations?: (show: boolean) => void;
  autoRotate?: boolean;
  onToggleAutoRotate?: (enabled: boolean) => void;
  isFullScreen?: boolean;
}

const ControlsInfoPane = ({
  visible,
  paneRef,
  strings,
  showAnnotations,
  onToggleAnnotations,
  autoRotate,
  onToggleAutoRotate,
  isFullScreen = false,
}: ControlsInfoPaneProps) => {
  const theme = useTheme();

  const handleAnnotationsChange = useCallback(
    (e: React.ChangeEvent<HTMLInputElement>) => {
      onToggleAnnotations?.(e.target.checked);
    },
    [onToggleAnnotations]
  );

  const handleAutoRotateChange = useCallback(
    (e: React.ChangeEvent<HTMLInputElement>) => {
      onToggleAutoRotate?.(e.target.checked);
    },
    [onToggleAutoRotate]
  );

  const controlRowSx = {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
  };

  const rightAlignedTextSx = {
    textAlign: 'right',
  };

  const dividerSx = {
    backgroundColor: theme.palette.TwClrBrdrTertiary,
  };

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
        justifyContent: 'flex-end',
        alignItems: 'flex-start',
        paddingX: 2,
        paddingTop: isFullScreen ? 8 : 2,
        zIndex: 1001,
      }}
    >
      <Fade in={visible} timeout={500}>
        <Box
          ref={paneRef}
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
          <Box sx={{ display: 'flex', flexDirection: 'column', gap: 1 }}>
            <Typography sx={{ fontWeight: 600 }}>{strings.controls}</Typography>

            <Box sx={controlRowSx}>
              <Typography>{strings.annotations}</Typography>
              <Checkbox
                checked={showAnnotations ?? true}
                onChange={handleAnnotationsChange}
                sx={{ color: theme.palette.primary.main }}
              />
            </Box>

            <Divider sx={dividerSx} />

            <Box sx={controlRowSx}>
              <Typography>{strings.autoRotate}</Typography>
              <Checkbox
                checked={autoRotate ?? true}
                onChange={handleAutoRotateChange}
                sx={{ color: theme.palette.primary.main }}
              />
            </Box>

            <Divider sx={dividerSx} />

            <Box sx={controlRowSx}>
              <Typography>{strings.orbit}</Typography>
              <Box sx={rightAlignedTextSx}>
                <Typography>{strings.leftMouse}</Typography>
                <Typography>{strings.touchDrag}</Typography>
              </Box>
            </Box>

            <Divider sx={dividerSx} />

            <Box sx={controlRowSx}>
              <Typography>{strings.pan}</Typography>
              <Box sx={rightAlignedTextSx}>
                <Typography>{strings.middleMouse}</Typography>
                <Typography>{strings.swipe}</Typography>
              </Box>
            </Box>

            <Divider sx={dividerSx} />

            <Box sx={controlRowSx}>
              <Typography>{strings.look}</Typography>
              <Typography>{strings.rightMouse}</Typography>
            </Box>

            <Divider sx={dividerSx} />

            <Box sx={controlRowSx}>
              <Typography>{strings.zoom}</Typography>
              <Box sx={rightAlignedTextSx}>
                <Typography>{strings.mouseWheel}</Typography>
                <Typography>{strings.pinch}</Typography>
              </Box>
            </Box>

            <Divider sx={dividerSx} />

            <Box sx={controlRowSx}>
              <Typography>{strings.fly}</Typography>
              <Box sx={rightAlignedTextSx}>
                <Typography>WASD</Typography>
                <Typography>{strings.arrowKeys}</Typography>
              </Box>
            </Box>

            <Divider sx={dividerSx} />

            <Box sx={controlRowSx}>
              <Typography>{strings.flyFaster}</Typography>
              <Typography>{strings.shift}</Typography>
            </Box>

            <Divider sx={dividerSx} />

            <Box sx={controlRowSx}>
              <Typography>{strings.flySlower}</Typography>
              <Typography>{strings.ctrl}</Typography>
            </Box>

            <Divider sx={dividerSx} />

            <Box sx={controlRowSx}>
              <Typography>{strings.resetCamera}</Typography>
              <Typography>R</Typography>
            </Box>

            <Divider sx={dividerSx} />
          </Box>
        </Box>
      </Fade>
    </Box>
  );
};

export default ControlsInfoPane;
