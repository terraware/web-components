import React from 'react';
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
      fill: (props: StyleProps) => props.fillColor ?? 'inherit',
    }
  }
}));

export interface Props {
  name: IconName;
  size?: Size;
  className?: string;
  fillColor?: string;
}

export default function Icon({ size = 'small', name, className, fillColor }: Props): JSX.Element {
  const classes = useStyles({ fillColor });
  const SVGComponent = icons[name];

  return <SVGComponent className={`tw-icon tw-icon--${size} ${className ?? className} ${classes.icon}`} />;
}
