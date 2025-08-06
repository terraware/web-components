import React, { useCallback, useMemo, useRef, useState } from 'react';
import ReactMapGL, {
  FullscreenControl,
  MapRef,
  Marker,
  NavigationControl,
  ViewStateChangeEvent,
} from 'react-map-gl/mapbox';

import { Box, useTheme } from '@mui/material';
import { MultiPolygon } from 'geojson';
import { MapMouseEvent, Point } from 'mapbox-gl';
import 'mapbox-gl/dist/mapbox-gl.css';

import { useDeviceInfo } from '../../utils';
import Icon from '../Icon/Icon';
import MapViewStyleControl from './MapViewStyleControl';
import { MapCursor, MapIconComponentStyle, MapProperties, MapViewStyle, stylesUrl } from './types';

// Each layer item will become a feature, with a property of id.
export type MapLayerItem = {
  itemId: string;
  geometry: MultiPolygon;
  selected?: boolean;
  onClick?: () => void;
};

// Each layer will become a set of features that have the same type.
export type MapLayer = {
  layerId: string;
  items: MapLayerItem[];
};

export type MapMarker = {
  id: string; // Must be unique
  longitude: number;
  latitude: number;
  onClick?: () => void;
  selected?: boolean;
};

export type MapMarkerGroup = {
  style: MapIconComponentStyle;
  markers: MapMarker[];
};

export type MapBoxProps = {
  children?: React.ReactNode;
  clusterRadius?: number;
  containerId?: string;
  controlBottomLeft?: React.ReactNode;
  controlTopRight?: React.ReactNode;
  cursorInteract?: MapCursor;
  cursorMap?: MapCursor;
  disableZoom?: boolean;
  hideFullScreenControl?: boolean;
  hideMapViewStyleControl?: boolean;
  hideZoomControl?: boolean;
  layers?: MapLayer[];
  mapId: string;
  mapViewStyle: MapViewStyle;
  markerGroups?: MapMarkerGroup[];
  onClickCanvas?: (event: MapMouseEvent) => void;
  setMapViewStyle: (style: MapViewStyle) => void;
  token: string;
};

const MapBox = (props: MapBoxProps): JSX.Element => {
  const {
    children,
    clusterRadius,
    containerId,
    controlBottomLeft,
    controlTopRight,
    cursorInteract,
    cursorMap,
    disableZoom,
    hideFullScreenControl,
    hideMapViewStyleControl,
    hideZoomControl,
    layers,
    mapId,
    mapViewStyle,
    markerGroups,
    onClickCanvas: onClick,
    setMapViewStyle,
    token,
  } = props;
  const theme = useTheme();
  const mapRef = useRef<MapRef | null>(null);
  const { isDesktop } = useDeviceInfo();
  const [cursor, setCursor] = useState<MapCursor>('auto');
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
              onClick={(event) => {
                marker.onClick?.();
                event.originalEvent.stopPropagation();
              }}
              style={{ backgroundColor: marker.selected ? markerGroup.style.iconColor : theme.palette.TwClrBg }}
            >
              <Icon
                fillColor={marker.selected ? theme.palette.TwClrBg : markerGroup.style.iconColor}
                name={markerGroup.style.iconName}
                size={'small'}
                style={{ opacity: markerGroup.style.iconOpacity }}
              />
            </Marker>
          );
        } else if (markers.length > 1) {
          const latSum = markers.reduce((sum, marker) => sum + marker.latitude, 0);
          const lngSum = markers.reduce((sum, marker) => sum + marker.longitude, 0);
          const latAvg = latSum / markers.length;
          const lngAvg = lngSum / markers.length;

          const selected = markers.some((marker) => marker.selected);

          return (
            <Marker
              className='map-marker map-marker--cluster'
              key={`marker-${i}`}
              longitude={lngAvg}
              latitude={latAvg}
              anchor='center'
              onClick={(event) => {
                mapRef.current?.easeTo({
                  center: { lat: latAvg, lon: lngAvg },
                  zoom: (zoom ?? 10) + 1,
                  duration: 500,
                });
                event.originalEvent.stopPropagation();
              }}
              style={{ backgroundColor: selected ? markerGroup.style.iconColor : theme.palette.TwClrBg }}
            >
              <p className='title'>{markers.length}</p>
              <Icon
                fillColor={selected ? theme.palette.TwClrBg : markerGroup.style.iconColor}
                name={markerGroup.style.iconName}
                size={'small'}
                style={{ opacity: markerGroup.style.iconOpacity }}
              />
            </Marker>
          );
        }
      });
    });
  }, [markerGroups, theme, zoom]);

  // Hovering interactive layers
  const onMouseEnter = useCallback(() => setCursor(cursorInteract ?? 'auto'), [cursorInteract]);
  const onMouseLeave = useCallback(() => setCursor('auto'), []);

  // Entering and exiting canvases
  const onMouseOver = useCallback(() => setCursor(cursorMap ?? 'auto'), [cursorMap]);
  const onMouseOut = useCallback(() => setCursor('auto'), []);

  // On layer click
  const onMapClick = useCallback(
    (event: MapMouseEvent) => {
      if (layers && event.features?.length) {
        const properties = event.features
          .map((feature) => feature.properties)
          .filter(
            (properties) =>
              properties && properties.id !== undefined && properties.priority !== undefined && properties.clickable
          ) as MapProperties[];

        if (properties.length) {
          const topPriorityFeature = properties.reduce((top, current) => {
            return current.priority > top.priority ? current : top;
          }, properties[0]);

          const clickedItem = layers
            .flatMap((layer) => layer.items)
            .find((item) => item.itemId === topPriorityFeature.id);
          if (clickedItem && clickedItem.onClick) {
            clickedItem.onClick();
            return;
          }
        }
        // If feature not clickable or not handled, fall through to canvas
      }

      onClick?.(event);
    },
    [onClick]
  );

  return (
    <ReactMapGL
      key={mapId}
      attributionControl={false}
      cursor={cursor}
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
      onClick={onMapClick}
      onMove={onMove}
      onMouseEnter={onMouseEnter}
      onMouseLeave={onMouseLeave}
      onMouseOver={onMouseOver}
      onMouseOut={onMouseOut}
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
      {controlTopRight && (
        <Box
          sx={{
            height: 'max-content',
            position: 'absolute',
            right: theme.spacing(2),
            top: theme.spacing(2),
            width: 'max-content',
            zIndex: 1000,
          }}
        >
          {controlTopRight}
        </Box>
      )}
      {controlBottomLeft && (
        <Box
          style={{
            height: 'max-content',
            position: 'absolute',
            left: theme.spacing(2),
            bottom: theme.spacing(4),
            width: 'max-content',
            zIndex: 1000,
          }}
        >
          {controlBottomLeft}
        </Box>
      )}
      {markersComponents}
      {children}
    </ReactMapGL>
  );
};

export default MapBox;
