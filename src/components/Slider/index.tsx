import { Slider as MuiSlider, useTheme } from '@mui/material';
import React, { useState } from 'react';

export type SliderMark = {
  label?: string;
  value: number;
};

export type SliderProps = {
  defaultValue?: number;
  value?: number;
  marks?: SliderMark[];
  min?: number;
  max?: number;
  onChange: (value: number) => void;
  step?: number;
  valueLabelDisplay?: 'auto' | 'on' | 'off';
};

export default function Slider(props: SliderProps): JSX.Element {
  const { defaultValue, value, marks, min, max, onChange, step, valueLabelDisplay } = props;
  const theme = useTheme();

  const sliderStyles = {
    '.MuiSlider-rail': {
      backgroundColor: theme.palette.TwClrBgBrandTertiary,
      height: theme.spacing(0.5),
    },
    '.MuiSlider-track': {
      display: 'none',
    },
    '.MuiSlider-mark': {
      backgroundColor: theme.palette.TwClrBgBrand,
      height: '8px',
      width: '8px',
      borderRadius: '4px',
    },
    '.MuiSlider-thumb': {
      backgroundColor: theme.palette.TwClrBgBrand,
      height: '16px',
      width: '16px',
      borderRadius: '8px',
    },
  };

  const handleChange = (event: React.SyntheticEvent | Event, val: number | number[]) => {
    if (!Array.isArray(val)) {
      onChange(val);
    }
  };

  return (
    <MuiSlider
      aria-label='Slider'
      defaultValue={defaultValue}
      value={value}
      marks={marks}
      min={min}
      max={max}
      onChangeCommitted={handleChange}
      step={step ?? null}
      valueLabelDisplay={valueLabelDisplay}
      sx={sliderStyles}
    />
  );
}
