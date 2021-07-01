import icons from './icons';
import './styles.scss';

export type IconType = 'help' | 'processing';

export interface Props {
  name: IconType;
  size?: 'small' | 'medium' | 'large' | 'xlarge';
}

export default function Icon({ size, name }: Props): JSX.Element {
  const icon = icons[name];

  return (
    <object
      type='image/svg+xml'
      data={icon}
      className={`tw-icon tw-icon--${size}`}
      aria-label='icon'
    ></object>
  );
}
