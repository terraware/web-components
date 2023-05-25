import {Slider as MuiSlider, useTheme} from '@mui/material';

export type SliderMark = {
  label: string;
  value: number;
};

export type SliderProps = {
  defaultValue?: number;
  marks?: SliderMark[];
  min?: number;
  max?: number;
  step?: number;
  valueLabelDisplay?: 'auto' | 'on' | 'off';
};

export default function Slider(props: SliderProps): JSX.Element {
  const { defaultValue, marks, min, max, step, valueLabelDisplay } = props;
  const theme = useTheme();

  const sliderStyles = {
    '.MuiSlider-rail': {
      backgroundColor: theme.palette.TwClrBgBrandTertiary,
      height: '4px',
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

  return <MuiSlider
    aria-label='Small steps'
    defaultValue={defaultValue}
    marks={marks}
    min={min}
    max={max}
    step={step ?? null}
    valueLabelDisplay={valueLabelDisplay}
    sx={sliderStyles}
  />;
}