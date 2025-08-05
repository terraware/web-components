import React, { useCallback, useMemo, useRef, useState } from 'react';
import ReactMapGL, {
  FullscreenControl,
  MapRef,
  Marker,
  NavigationControl,
  ViewStateChangeEvent,
} from 'react-map-gl/mapbox';

import { useTheme } from '@mui/material';
import { MapMouseEvent, Point } from 'mapbox-gl';
import 'mapbox-gl/dist/mapbox-gl.css';

import { useDeviceInfo } from '../../utils';
import Icon from '../Icon/Icon';
import MapViewStyleControl from './MapViewStyleControl';
import { MapFillComponentStyle, MapIconComponentStyle, MapViewStyle, stylesUrl } from './types';

export type MapMarker = {
  id: string; // Must be unique
  longitude: number;
  latitude: number;
  onClick?: () => void;
  selected?: boolean;
};

export type MapMarkerGroup = {
  style: MapIconComponentStyle | MapFillComponentStyle;
  markers: MapMarker[];
};

export type MapBoxProps = {
  clusterRadius?: number;
  containerId?: string;
  disableZoom?: boolean;
  hideFullScreenControl?: boolean;
  hideMapViewStyleControl?: boolean;
  hideZoomControl?: boolean;
  mapId: string;
  mapViewStyle: MapViewStyle;
  markerGroups?: MapMarkerGroup[];
  onClick?: (event: MapMouseEvent) => void;
  setMapViewStyle: (style: MapViewStyle) => void;
  token: string;
};

const MapBox = (props: MapBoxProps): JSX.Element => {
  const {
    clusterRadius,
    containerId,
    disableZoom,
    hideFullScreenControl,
    hideMapViewStyleControl,
    hideZoomControl,
    mapId,
    mapViewStyle,
    markerGroups,
    onClick,
    setMapViewStyle,
    token,
  } = props;
  const theme = useTheme();
  const mapRef = useRef<MapRef | null>(null);
  const { isDesktop } = useDeviceInfo();
  const [zoom, setZoom] = useState<number>();

  const mapRefCallback = useCallback((map: MapRef | null) => {
    if (map !== null) {
      mapRef.current = map;
      setZoom(map.getZoom());
    }
  }, []);

  const onMove = useCallback((view: ViewStateChangeEvent) => {
    setZoom(view.viewState.zoom);
  }, []);

  const clusterMarkers = useCallback(
    (map: MapRef | null, markers: MapMarker[]): MapMarker[][] => {
      if (!map || map.getZoom() > 15) {
        // Too zoomed in. Return all marker as is
        return markers.map((marker) => [marker]);
      }

      const visited = new Set<string>();
      const markerPixels: Record<string, Point> = {};
      markers.forEach((marker) => {
        markerPixels[marker.id] = map.project({
          lat: marker.latitude,
          lon: marker.longitude,
        });
      });

      const clusters: MapMarker[][] = [];

      markers.forEach((marker, idx) => {
        if (!visited.has(marker.id)) {
          const cluster = [marker];
          markers.slice(idx + 1).forEach((otherMarker) => {
            if (!visited.has(otherMarker.id)) {
              const dx = markerPixels[marker.id].x - markerPixels[otherMarker.id].x;
              const dy = markerPixels[marker.id].y - markerPixels[otherMarker.id].y;
              const dist = Math.sqrt(dx * dx + dy * dy);

              if (dist <= (clusterRadius ?? 40)) {
                cluster.push(otherMarker);
                visited.add(otherMarker.id);
              }
            }
          });
          clusters.push(cluster);
        }
      });

      return clusters;
    },
    [clusterRadius]
  );

  const markersComponents = useMemo(() => {
    return markerGroups?.flatMap((markerGroup) => {
      const fillStyle =
        markerGroup.style.type === 'fill'
          ? {
              border: `2px solid ${markerGroup.style.borderColor}`,
              backgroundColor: markerGroup.style.fillColor,
              backgroundImage: markerGroup.style.fillPatternUrl
                ? `url('${markerGroup.style.fillPatternUrl}')`
                : undefined,
              backgroundRepeat: 'repeat',
              opacity: markerGroup.style.opacity,
            }
          : undefined;

      const markerIcon =
        markerGroup.style.type === 'icon' ? (
          <Icon
            fillColor={markerGroup.style.iconColor}
            name={markerGroup.style.iconName}
            size={'small'}
            style={{ opacity: markerGroup.style.iconOpacity }}
          />
        ) : undefined;

      // cluster markers here
      const clusteredMarkers = clusterMarkers(mapRef.current, markerGroup.markers);

      return clusteredMarkers.map((markers, i) => {
        if (markers.length === 1) {
          const marker = markers[0];

          return (
            <Marker
              className='map-marker'
              key={`marker-${i}`}
              longitude={marker.longitude}
              latitude={marker.latitude}
              anchor='center'
              onClick={marker.onClick}
              style={fillStyle}
            >
              {markerIcon}
            </Marker>
          );
        } else if (markers.length > 1) {
          const latSum = markers.reduce((sum, marker) => sum + marker.latitude, 0);
          const lngSum = markers.reduce((sum, marker) => sum + marker.longitude, 0);
          const latAvg = latSum / markers.length;
          const lngAvg = lngSum / markers.length;

          return (
            <Marker
              className='map-marker map-marker--cluster'
              key={`marker-${i}`}
              longitude={lngAvg}
              latitude={latAvg}
              anchor='center'
              onClick={() =>
                mapRef.current?.easeTo({
                  center: { lat: latAvg, lon: lngAvg },
                  zoom: (zoom ?? 10) + 1,
                  duration: 500,
                })
              }
              style={fillStyle}
            >
              <p className='count'>{markers.length}</p>
              {markerIcon}
            </Marker>
          );
        }
      });
    });
  }, [markerGroups, zoom]);

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
      onMove={onMove}
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
