import { IconName } from '../Icon/icons';

/**
 * Properties class for GeoJson, with a few reserved object defined.
 */
export type MapProperties = {
  id: string;
  clickable: boolean;
  layerFeatureId: string; // combining layer + feautre ID
  layerId: string; // determines which style to apply
  priority: number;
  [name: string]: any;
};

export type MapCursor = 'auto' | 'crosshair' | 'default' | 'pointer' | 'grab';

export type MapIconComponentStyle = {
  iconColor: string;
  iconName: IconName;
  type: 'icon';
};

export type MapFillComponentStyle = {
  borderColor?: string;
  fillColor?: string;
  fillPatternUrl?: string;
  opacity?: number;
  type: 'fill';
};

export type MapViewStyle = 'Outdoors' | 'Satellite' | 'Light' | 'Dark' | 'Streets';
export const MapViewStyles: MapViewStyle[] = ['Outdoors', 'Satellite', 'Light', 'Dark', 'Streets'];

export const stylesUrl: Record<MapViewStyle, string> = {
  Outdoors: 'mapbox://styles/mapbox/outdoors-v12?optimize=true',
  Satellite: 'mapbox://styles/mapbox/satellite-streets-v12?optimize=true',
  Streets: 'mapbox://styles/mapbox/streets-v12?optimize=true',
  Light: 'mapbox://styles/mapbox/light-v11?optimize=true',
  Dark: 'mapbox://styles/mapbox/dark-v11?optimize=true',
};
