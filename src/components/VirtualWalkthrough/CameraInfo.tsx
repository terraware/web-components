import React, { useEffect, useState } from 'react';

import { Box, Typography, useTheme } from '@mui/material';

import { getRgbaFromHex } from '../../utils/color';

const UPDATE_FREQUENCY_MS = 200;
const COORDINATE_LABELS = ['X', 'Y', 'Z'] as const;

const formatNumber = (num: number) => num.toFixed(6);

export interface CameraInfoStrings {
  cameraInfo: string;
  cameraPosition: string;
  cameraFocusPoint: string;
}

export interface CameraState {
  position: [number, number, number];
  focus: [number, number, number];
}

interface CoordinateDisplayProps {
  label: string | undefined;
  coordinates: [number, number, number];
  textColor: string;
}

const CoordinateDisplay = ({ label, coordinates, textColor }: CoordinateDisplayProps) => (
  <Box>
    <Typography variant='caption' sx={{ color: textColor, fontWeight: 'bold' }}>
      {label}:
    </Typography>
    {coordinates.map((value, index) => (
      <Typography
        key={COORDINATE_LABELS[index]}
        variant='caption'
        sx={{ color: textColor, display: 'block', fontFamily: 'monospace' }}
      >
        {COORDINATE_LABELS[index]}: {formatNumber(value)}
      </Typography>
    ))}
  </Box>
);

interface CameraInfoProps {
  strings: CameraInfoStrings;
  getCameraState: () => CameraState | null;
}

const CameraInfo = ({ strings, getCameraState }: CameraInfoProps) => {
  const theme = useTheme();
  const [cameraState, setCameraState] = useState<CameraState | null>(null);

  useEffect(() => {
    const updateCameraState = () => {
      const state = getCameraState();
      if (state) {
        setCameraState(state);
      }
    };

    updateCameraState();
    const intervalId = setInterval(updateCameraState, UPDATE_FREQUENCY_MS);

    return () => clearInterval(intervalId);
  }, [getCameraState]);

  if (!cameraState) {
    return null;
  }

  const textColor = theme.palette.TwClrIcnInfo as string;

  return (
    <Box
      sx={{
        position: 'absolute',
        bottom: 16,
        left: 16,
        backgroundColor: getRgbaFromHex(theme.palette.TwClrIcnOnBrand as string, 0.9),
        padding: 2,
        borderRadius: 1,
        pointerEvents: 'auto',
        minWidth: 220,
      }}
    >
      <Typography variant='body2' sx={{ color: textColor, fontWeight: 'bold', marginBottom: 1 }}>
        {strings.cameraInfo}
      </Typography>
      <Box sx={{ display: 'flex', flexDirection: 'column', gap: 1 }}>
        <CoordinateDisplay label={strings.cameraPosition} coordinates={cameraState.position} textColor={textColor} />
        <CoordinateDisplay label={strings.cameraFocusPoint} coordinates={cameraState.focus} textColor={textColor} />
      </Box>
    </Box>
  );
};

export default CameraInfo;
