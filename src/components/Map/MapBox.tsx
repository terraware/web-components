import React, { useCallback, useMemo, useRef } from 'react';
import ReactMapGL, { FullscreenControl, MapRef, Marker, NavigationControl } from 'react-map-gl/mapbox';

import { useTheme } from '@mui/material';
import 'mapbox-gl/dist/mapbox-gl.css';

import { useDeviceInfo } from '../../utils';
import Icon from '../Icon/Icon';
import { IconName } from '../Icon/icons';
import MapViewStyleControl from './MapViewStyleControl';

export type MapViewStyle = 'Outdoors' | 'Satellite' | 'Light' | 'Dark' | 'Streets';
export const MapViewStyles: MapViewStyle[] = ['Outdoors', 'Satellite', 'Light', 'Dark', 'Streets'];

export const stylesUrl: Record<MapViewStyle, string> = {
  Outdoors: 'mapbox://styles/mapbox/outdoors-v12?optimize=true',
  Satellite: 'mapbox://styles/mapbox/satellite-streets-v12?optimize=true',
  Streets: 'mapbox://styles/mapbox/streets-v12?optimize=true',
  Light: 'mapbox://styles/mapbox/light-v11?optimize=true',
  Dark: 'mapbox://styles/mapbox/dark-v11?optimize=true',
};

export type MapMarker = {
  featureId?: string; // markers of the same feature ID can be clustered together
  longitude: number;
  latitude: number;
  iconColor: string;
  iconName: IconName;
  iconOpacity?: number;
  onClick: () => void;
  selected?: boolean;
};

export type MapBoxProps = {
  containerId?: string;
  disableZoom?: boolean;
  hideFullScreenControl?: boolean;
  hideMapViewStyleControl?: boolean;
  hideZoomControl?: boolean;
  mapId: string;
  mapViewStyle: MapViewStyle;
  markers?: MapMarker[];
  setMapViewStyle: (style: MapViewStyle) => void;
  token: string;
};

const MapBox = (props: MapBoxProps): JSX.Element => {
  const {
    containerId,
    disableZoom,
    hideFullScreenControl,
    hideMapViewStyleControl,
    hideZoomControl,
    mapId,
    mapViewStyle,
    markers,
    setMapViewStyle,
    token,
  } = props;
  const theme = useTheme();
  const mapRef = useRef<MapRef | null>(null);
  const { isDesktop } = useDeviceInfo();

  const mapRefCallback = useCallback((map: MapRef | null) => {
    if (map !== null) {
      mapRef.current = map;
    }
  }, []);

  const markersComponents = useMemo(() => {
    return markers?.map((marker, idx) => {
      // TODO: apply clustering
      return (
        <Marker
          className='map-marker'
          key={idx}
          longitude={marker.longitude}
          latitude={marker.latitude}
          anchor='bottom'
          onClick={marker.onClick}
        >
          <Icon
            fillColor={marker.iconColor}
            name={marker.iconName}
            size={'small'}
            style={{ opacity: marker.iconOpacity }}
          />
        </Marker>
      );
    });
  }, [markers]);

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
      scrollZoom={!disableZoom}
      doubleClickZoom={!disableZoom}
    >
      {isDesktop && !hideFullScreenControl && <FullscreenControl position='top-left' containerId={containerId} />}
      {!hideZoomControl && (
        <NavigationControl
          showCompass={false}
          style={{
            marginRight: theme.spacing(2),
            marginBottom: theme.spacing(2),
          }}
          position='bottom-right'
        />
      )}
      {!hideMapViewStyleControl && (
        <MapViewStyleControl containerId={containerId} mapViewStyle={mapViewStyle} setMapViewStyle={setMapViewStyle} />
      )}
      {markersComponents}
    </ReactMapGL>
  );
};

export default MapBox;
