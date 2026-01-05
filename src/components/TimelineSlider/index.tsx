import React, { useMemo } from 'react';

import { useTheme } from '@mui/material';

import TimelineMarker from './TimelineMarker';
import TimelineRail from './TimelineRail';
import './styles.scss';

export type TimelineSliderMark = {
  color: string;
  labelBottom?: string;
  labelTop?: string;
  onClick?: () => void;
  size: 'small' | 'medium' | 'large';
  value: number;
};

export type TimelineSliderProps = {
  labelEnd?: string;
  labelSelected?: string;
  labelStart?: string;
  marks: TimelineSliderMark[];
};

const TimelineSlider = ({ labelEnd, labelSelected, labelStart, marks }: TimelineSliderProps): JSX.Element => {
  const theme = useTheme();

  const { minValue, maxValue } = useMemo(() => {
    const values = marks.map((mark) => mark.value);
    if (values.length > 0) {
      return {
        minValue: Math.min(...values),
        maxValue: Math.max(...values),
      };
    } else {
      return {
        minValue: 0,
        maxValue: 1,
      };
    }
  }, [marks]);

  const range = maxValue - minValue;

  return (
    <div className={'timeline'}>
      <div className={'timeline-label'} style={{ marginRight: theme.spacing(2) }}>
        {labelStart}
      </div>
      <div className='timeline-container'>
        <TimelineRail />

        {marks.map((mark, idx) => {
          const normalizedValue = range === 0 ? 1 : (mark.value - minValue) / range;

          return (
            <TimelineMarker
              key={idx}
              color={mark.color}
              labelBottom={mark.labelBottom}
              labelTop={mark.labelTop}
              onClick={mark.onClick}
              size={mark.size}
              value={normalizedValue}
            />
          );
        })}
      </div>
      <div className={'timeline-label'} style={{ marginLeft: theme.spacing(2) }}>
        {labelEnd}
      </div>
      {labelSelected && <div className={'timeline-selected-label'}>{labelSelected}</div>}
    </div>
  );
};

export default TimelineSlider;
