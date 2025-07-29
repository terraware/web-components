import React, { useCallback, useRef } from 'react';
import ReactMapGL, { MapRef } from 'react-map-gl/mapbox';

import { useDeviceInfo } from '../../utils';

export type MapViewStyle = 'Outdoors' | 'Satellite' | 'Light' | 'Dark' | 'Streets';
export const stylesUrl: Record<MapViewStyle, string> = {
  Outdoors: 'mapbox://styles/mapbox/outdoors-v12?optimize=true',
  Satellite: 'mapbox://styles/mapbox/satellite-streets-v12?optimize=true',
  Streets: 'mapbox://styles/mapbox/streets-v12?optimize=true',
  Light: 'mapbox://styles/mapbox/light-v11?optimize=true',
  Dark: 'mapbox://styles/mapbox/dark-v11?optimize=true',
};

export type MapViewProps = {
  mapId: string;
  mapViewStyle: MapViewStyle;
  token: string;
};

const MapView = (props: MapViewProps): JSX.Element => {
  const { token, mapId, mapViewStyle } = props;
  const mapRef = useRef<MapRef | null>(null);
  const { isDesktop } = useDeviceInfo();

  const mapRefCallback = useCallback((map: MapRef | null) => {
    if (map !== null) {
      mapRef.current = map;
    }
  }, []);

  return (
    <ReactMapGL
      key={mapId}
      attributionControl={false}
      mapboxAccessToken={token}
      ref={mapRefCallback}
      mapStyle={stylesUrl[mapViewStyle]}
      initialViewState={{
        longitude: -122.4,
        latitude: 37.8,
        zoom: 14,
      }}
      style={{ width: 'fill', height: isDesktop ? 'fill' : '80vh', flexGrow: isDesktop ? 1 : undefined }}
    />
  );
};

export default MapView;
