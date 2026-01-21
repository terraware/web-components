import React, { type JSX } from 'react';

import './styles.scss';

type TimelineMarkerProps = {
  color: string;
  labelBottom?: string;
  labelTop?: string;
  onClick?: () => void;
  size: 'small' | 'medium' | 'large';
  value: number;
};

const TimelineMarker = ({ color, labelBottom, labelTop, onClick, size, value }: TimelineMarkerProps): JSX.Element => {
  const clampedValue = Math.min(1, Math.max(0, value));

  return (
    <div
      className={`timeline-marker timeline-marker--${size} ${onClick ? 'timeline-marker--clickable' : ''}`}
      style={{
        left: `${clampedValue * 100}%`,
        backgroundColor: color,
      }}
      onClick={onClick}
    >
      {labelTop && <div className='timeline-marker__label timeline-marker__label--top'>{labelTop}</div>}
      {labelBottom && <div className='timeline-marker__label timeline-marker__label--bottom'>{labelBottom}</div>}
    </div>
  );
};

export default TimelineMarker;
