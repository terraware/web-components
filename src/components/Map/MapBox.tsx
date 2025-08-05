import React, { useCallback, useMemo, useRef } from 'react';
import ReactMapGL, { FullscreenControl, MapRef, Marker, NavigationControl } from 'react-map-gl/mapbox';

import { useTheme } from '@mui/material';
import { MapMouseEvent } from 'mapbox-gl';
import 'mapbox-gl/dist/mapbox-gl.css';

import { useDeviceInfo } from '../../utils';
import Icon from '../Icon/Icon';
import MapViewStyleControl from './MapViewStyleControl';
import { MapFillComponentStyle, MapIconComponentStyle } from './types';

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
  id: string;
  longitude: number;
  latitude: number;
  style: MapIconComponentStyle | MapFillComponentStyle;
  onClick?: () => void;
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
  onClick?: (event: MapMouseEvent) => void;
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
    onClick,
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
    return markers?.map((marker) => {
      // TODO: implement clustering
      const fillStyle =
        marker.style.type === 'fill'
          ? {
              border: `2px solid ${marker.style.borderColor}`,
              backgroundColor: marker.style.fillColor,
              backgroundImage: marker.style.fillPatternUrl ? `url('${marker.style.fillPatternUrl}')` : undefined,
              backgroundRepeat: 'repeat',
              opacity: marker.style.opacity,
            }
          : undefined;

      return (
        <Marker
          className='map-marker'
          key={marker.id}
          longitude={marker.longitude}
          latitude={marker.latitude}
          anchor='center'
          onClick={marker.onClick}
          style={fillStyle}
        >
          {marker.style.type === 'icon' && (
            <Icon
              fillColor={marker.style.iconColor}
              name={marker.style.iconName}
              size={'small'}
              style={{ opacity: marker.style.iconOpacity }}
            />
          )}
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
      onClick={onClick}
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
