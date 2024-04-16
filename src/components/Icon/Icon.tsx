import React, { CSSProperties } from 'react';
import { makeStyles } from '@mui/styles';
import { Size } from '../Size';
import icons, { IconName } from './icons';
import './styles.scss';

type StyleProps = {
  fillColor?: string;
};

const useStyles = makeStyles(() => ({
  icon: {
    '& path': {
      fill: (props: StyleProps) => props.fillColor,
    },
  },
}));

export interface Props {
  className?: string;
  fillColor?: string;
  name: IconName;
  size?: Size;
  style?: CSSProperties;
}

export default function Icon({ size = 'small', name, className, fillColor, style }: Props): JSX.Element {
  const classes = useStyles({ fillColor });
  const SVGComponent = icons[name];

  return (
    <SVGComponent
      className={`tw-icon tw-icon--${size} ${className ?? ''} ${fillColor ? classes.icon : ''}`}
      style={style}
    />
  );
}
