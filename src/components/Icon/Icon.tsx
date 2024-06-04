import React, { CSSProperties } from 'react';
import { Size } from '../Size';
import icons, { IconName } from './icons';
import './styles.scss';

export interface Props {
  className?: string;
  fillColor?: string;
  name: IconName;
  size?: Size;
  style?: CSSProperties;
}

export default function Icon({ size = 'small', name, className, fillColor, style }: Props): JSX.Element {
  const SVGComponent = icons[name];

  return <SVGComponent className={`tw-icon tw-icon--${size} ${className ?? ''}`} fill={fillColor} style={style} />;
}
