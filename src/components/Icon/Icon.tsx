import icons from './icons';
import './styles.scss';

export type IconType = 'lock' | 'processing';

export interface Props {
  name: IconType;
  size?: 'small' | 'medium' | 'large' | 'xlarge';
  type?: string;
}

export default function Icon({ size, name }: Props): JSX.Element {
  const IconByName = icons[name];
  return <IconByName className={`tw-icon tw-icon--${size}`}></IconByName>;
}
