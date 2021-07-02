import icons from './icons';
import './styles.scss';

export type IconName = 'lock' | 'spinner';
export type IconSize = 'small' | 'medium' | 'large' | 'xlarge';

export interface Props {
  name: IconName;
  size?: IconSize;
  type?: string;
}

export default function Icon({ size, name }: Props): JSX.Element {
  const SVGComponent = icons[name];
  return <SVGComponent className={`tw-icon tw-icon--${size}`} />;
}
