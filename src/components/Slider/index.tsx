import { Slider as MuiSlider, useTheme } from '@mui/material';
import { useState } from 'react';

export type SliderMark = {
  label?: string;
  value: number;
};

export type SliderProps = {
  defaultValue?: number;
  marks?: SliderMark[];
  min?: number;
  max?: number;
  onChange: (value: number) => void;
  step?: number;
  valueLabelDisplay?: 'auto' | 'on' | 'off';
};

export default function Slider(props: SliderProps): JSX.Element {
  const { defaultValue, marks, min, max, onChange, step, valueLabelDisplay } = props;
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

  const [currentValue, setCurrentValue] = useState(defaultValue);
  const handleChange = (event: Event, value: number | number[], activeThumb: number) => {
    if (activeThumb === 0 && !Array.isArray(value)) {
      if (value !== currentValue) {
        setCurrentValue(value);
        onChange(value);
      }
    }
  };

  return <MuiSlider
    aria-label='Small steps'
    defaultValue={defaultValue}
    marks={marks}
    min={min}
    max={max}
    onChange={handleChange}
    step={step ?? null}
    valueLabelDisplay={valueLabelDisplay}
    sx={sliderStyles}
  />;
}