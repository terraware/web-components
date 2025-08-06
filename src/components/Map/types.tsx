import { IconName } from '../Icon/icons';

export type MapIconComponentStyle = {
  iconColor: string;
  iconName: IconName;
  iconOpacity?: number;
  type: 'icon';
};

export type MapFillComponentStyle = {
  borderColor?: string;
  fillColor?: string;
  fillPatternUrl?: string;
  opacity?: number;
  type: 'fill';
};
