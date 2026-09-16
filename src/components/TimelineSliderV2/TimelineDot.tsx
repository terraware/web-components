import React, { type JSX, useMemo } from 'react';

import { type ColorWeight, toConicGradient } from './layout';
import './styles.scss';

type TimelineDotProps = {
  ariaLabel?: string;
  colorWeights: ColorWeight[];
  dimmed: boolean;
  leftPx: number;
  markCount: number;
  onClick: () => void;
  selected: boolean;
  sizePx: number;
};

const TimelineDot = ({
  ariaLabel,
  colorWeights,
  dimmed,
  leftPx,
  markCount,
  onClick,
  selected,
  sizePx,
}: TimelineDotProps): JSX.Element => {
  const background = useMemo(() => toConicGradient(colorWeights), [colorWeights]);

  const className = [
    'timeline-v2-dot',
    dimmed ? 'timeline-v2-dot--dimmed' : '',
    selected ? 'timeline-v2-dot--selected' : '',
  ]
    .filter((entry) => entry !== '')
    .join(' ');

  return (
    <button
      aria-label={ariaLabel}
      className={className}
      style={{ background, height: `${sizePx}px`, left: `${leftPx}px`, width: `${sizePx}px` }}
      onClick={onClick}
      type='button'
    >
      {markCount > 1 && <span className='timeline-v2-dot__count'>{markCount}</span>}
    </button>
  );
};

export default TimelineDot;
