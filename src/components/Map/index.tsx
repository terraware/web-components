import React, { ReactNode, useCallback, useMemo, useState } from 'react';

import { MapMouseEvent } from 'mapbox-gl';

import MapBox from './MapBox';
import MapContainer from './MapContainer';
import MapDrawer, { MapDrawerSize } from './MapDrawer';
import MapLegend, { MapHighlightLegendItem, MapLegendGroup } from './MapLegend';
import { MapCursor, MapHighlightGroup, MapLayer, MapMarkerGroup, MapViewStyle } from './types';

export type MapHighlightFeatureSection = {
  highlight: MapHighlightGroup;
  legendItems: MapHighlightLegendItem[];
  type: 'highlight';
};

export type MapLayerFeatureSection = {
  layers: MapLayer[];
  type: 'layer';
};

export type MapMarkerFeatureSection = {
  groups: MapMarkerGroup[];
  type: 'marker';
};

export type MapFeatureSection = {
  sectionDisabled?: boolean;
  sectionTitle: string;
  sectionTooltip?: string;
} & (MapHighlightFeatureSection | MapLayerFeatureSection | MapMarkerFeatureSection);

export type MapComponentProps = {
  clusterRadius?: number;
  controlBottomLeft?: React.ReactNode;
  controlTopRight?: React.ReactNode;
  cursorInteract?: MapCursor;
  cursorMap?: MapCursor;
  disableDoubleClickZoom?: boolean;
  disableZoom?: boolean;
  drawerChildren?: ReactNode;
  drawerOpen?: boolean;
  drawerSize?: MapDrawerSize;
  drawerTitle?: string;
  features?: MapFeatureSection[];
  hideFullScreenControl?: boolean;
  hideMapViewStyleControl?: boolean;
  hideZoomControl?: boolean;
  initialSelectedLayerId?: string;
  initialMapViewStyle?: MapViewStyle;
  initialViewState?: {
    latitude?: number;
    longitude?: number;
    zoom?: number;
  };
  onClickCanvas?: (event: MapMouseEvent) => void;
  setDrawerOpen?: (open: boolean) => void;
  token: string;
};

const MapComponent = (props: MapComponentProps) => {
  const {
    clusterRadius,
    controlBottomLeft,
    controlTopRight,
    cursorInteract,
    cursorMap,
    disableDoubleClickZoom,
    disableZoom,
    drawerChildren,
    drawerOpen,
    drawerSize,
    drawerTitle,
    features,
    hideFullScreenControl,
    hideMapViewStyleControl,
    hideZoomControl,
    initialSelectedLayerId,
    initialMapViewStyle,
    onClickCanvas,
    setDrawerOpen,
    token,
  } = props;
  const [mapViewStyle, setMapViewStyle] = useState<MapViewStyle>(initialMapViewStyle ?? 'Streets');

  const [visibleHighlights, setVisibleHighlights] = useState<string[]>([]);
  const setHighlightVisible = useCallback(
    (highlightId: string) => (visible: boolean) => {
      if (visible) {
        setVisibleHighlights((_visibleHighlights) => [..._visibleHighlights, highlightId]);
      } else {
        setVisibleHighlights((_visibleHighlights) =>
          _visibleHighlights.filter((_highlightId) => _highlightId !== highlightId)
        );
      }
    },
    []
  );

  const [visibleMarkers, setVisibleMarkers] = useState<string[]>([]);
  const setMarkerVisible = useCallback(
    (markerGroupId: string) => (visible: boolean) => {
      if (visible) {
        setVisibleMarkers((_visibleMarkers) => [..._visibleMarkers, markerGroupId]);
      } else {
        setVisibleMarkers((_visibleMarkers) =>
          _visibleMarkers.filter((_markerGroupId) => _markerGroupId !== markerGroupId)
        );
      }
    },
    []
  );

  const [selectedLayer, setSelectedLayer] = useState<string | undefined>(initialSelectedLayerId);

  const legends = useMemo((): MapLegendGroup[] | undefined => {
    return features?.map((feature): MapLegendGroup => {
      const baseLegendGroup = {
        disabled: feature.sectionDisabled,
        title: feature.sectionTitle,
        tooltip: feature.sectionTooltip,
      };
      switch (feature.type) {
        case 'highlight':
          return {
            ...baseLegendGroup,
            items: feature.legendItems,
            type: 'highlight',
            visible: visibleHighlights.findIndex((highlightId) => highlightId === feature.highlight.highlightId) >= 0,
            setVisible: setHighlightVisible(feature.highlight.highlightId),
          };
        case 'layer':
          return {
            ...baseLegendGroup,
            items: feature.layers.map((layer) => ({
              disabled: layer.disabled,
              id: layer.layerId,
              label: layer.label,
              style: layer.style,
            })),
            selectedLayer,
            setSelectedLayer,
            type: 'layer',
          };
        case 'marker':
          return {
            ...baseLegendGroup,
            items: feature.groups.map((group) => ({
              disabled: group.disabled,
              id: group.markerGroupId,
              label: group.label,
              style: group.style,
              setVisible: setMarkerVisible(group.markerGroupId),
              visible: visibleMarkers.findIndex((markerId) => markerId === group.markerGroupId) >= 0,
            })),
            type: 'marker',
          };
      }
    });
  }, [features, selectedLayer, visibleHighlights, visibleMarkers]);

  const layers = useMemo(() => {
    return features
      ?.filter((feature) => feature.type === 'layer')
      ?.flatMap((feature) => {
        return feature.layers;
      });
  }, [features]);

  const highlightGroups = useMemo(() => {
    return features
      ?.filter((feature) => feature.type === 'highlight')
      ?.map((feature) => {
        return feature.highlight;
      });
  }, [features]);

  const markerGroups = useMemo(() => {
    return features
      ?.filter((feature) => feature.type === 'marker')
      ?.flatMap((feature) => {
        return feature.groups;
      });
  }, [features]);

  return (
    <MapContainer
      containerId={'map-container'}
      map={
        <MapBox
          clusterRadius={clusterRadius}
          containerId={'map-container'}
          controlBottomLeft={controlBottomLeft}
          controlTopRight={controlTopRight}
          cursorInteract={cursorInteract}
          cursorMap={cursorMap}
          disableDoubleClickZoom={disableDoubleClickZoom}
          disableZoom={disableZoom}
          drawerOpen={drawerOpen}
          hideFullScreenControl={hideFullScreenControl}
          hideMapViewStyleControl={hideMapViewStyleControl}
          hideZoomControl={hideZoomControl}
          highlightGroups={highlightGroups}
          initialViewState={{
            latitude: 21.3,
            longitude: -157.8,
            zoom: 14,
          }}
          layers={layers}
          mapId={'mapId'}
          mapImageUrls={['/assets/stripes-m.png']}
          mapViewStyle={mapViewStyle}
          markerGroups={markerGroups}
          onClickCanvas={onClickCanvas}
          setMapViewStyle={setMapViewStyle}
          token={token}
        />
      }
      drawer={
        <MapDrawer
          open={drawerOpen ?? false}
          onClose={() => setDrawerOpen?.(false)}
          size={drawerSize ?? 'small'}
          title={drawerTitle ?? ''}
        >
          {drawerChildren}
        </MapDrawer>
      }
      drawerOpen={drawerOpen}
      legend={legends && <MapLegend legends={legends} />}
    />
  );
};

export default MapComponent;
