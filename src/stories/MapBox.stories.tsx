import React, { useCallback, useMemo, useState } from 'react';

import { Box } from '@mui/material';
import { action } from '@storybook/addon-actions';
import { Story } from '@storybook/react';

import MapBox, { MapBoxProps, MapFeatureGroup, MapHighlightGroup } from '../components/Map/MapBox';
import MapContainer from '../components/Map/MapContainer';
import MapDrawer from '../components/Map/MapDrawer';
import { MapViewStyle } from '../components/Map/types';
import { useDeviceInfo } from '../utils';

export default {
  title: 'MapBox',
  component: MapBox,
};

const Template: Story<MapBoxProps> = (args) => {
  const { isDesktop } = useDeviceInfo();
  const [mapViewStyle, setMapViewStyle] = useState<MapViewStyle>('Satellite');

  const [selectedFeatureId, setSelectedFeatureId] = useState<string>();

  const onFeatureClicked = useCallback(
    (groupId: string, featureId: string) => () => {
      setSelectedFeatureId((oldId) => (oldId === featureId ? undefined : featureId));
      action(`Group ${groupId} feature ${featureId} clicked`)();
    },
    [action]
  );

  const onMapCLick = useCallback(() => {
    action('Map canvas clicked')();
  }, []);

  const mapFeautureGroups = useMemo((): MapFeatureGroup[] => {
    return [
      {
        groupId: 'Green',
        features: [
          {
            featureId: 'A',
            label: 'A',
            onClick: onFeatureClicked('Green', 'A'),
            priority: 4,
            selected: selectedFeatureId === 'A',
            geometry: {
              type: 'MultiPolygon',
              coordinates: [
                [
                  [
                    [-157.85, 21.3],
                    [-157.84, 21.32],
                    [-157.82, 21.33],
                    [-157.81, 21.31],
                    [-157.83, 21.29],
                    [-157.85, 21.3],
                  ],
                ],
              ],
            },
          },
          {
            featureId: 'B',
            label: 'B',
            onClick: onFeatureClicked('Green', 'B'),
            priority: 3,
            selected: selectedFeatureId === 'B',
            geometry: {
              type: 'MultiPolygon',
              coordinates: [
                [
                  [
                    [-157.84, 21.31],
                    [-157.82, 21.34],
                    [-157.79, 21.33],
                    [-157.8, 21.3],
                    [-157.82, 21.28],
                    [-157.84, 21.31],
                  ],
                ],
              ],
            },
          },
        ],
        style: {
          borderColor: '#41C07F',
          fillColor: '#41C07F',
          opacity: 0.2,
          type: 'fill',
        },
      },
      {
        groupId: 'Red',
        features: [
          {
            featureId: 'C',
            label: 'C',
            // onClick is unset intentionally. There will be no cursor pointer or hover shading.
            // onClick: onFeatureClicked('Red', 'C'),
            priority: 2,
            selected: selectedFeatureId === 'C',
            geometry: {
              type: 'MultiPolygon',
              coordinates: [
                [
                  [
                    [-157.86, 21.32],
                    [-157.85, 21.34],
                    [-157.83, 21.35],
                    [-157.81, 21.33],
                    [-157.83, 21.31],
                    [-157.86, 21.32],
                  ],
                ],
              ],
            },
          },
          {
            featureId: 'D',
            label: 'D',
            onClick: onFeatureClicked('Red', 'D'),
            priority: 1,
            selected: selectedFeatureId === 'D',
            geometry: {
              type: 'MultiPolygon',
              coordinates: [
                [
                  [
                    [-157.83, 21.29],
                    [-157.8, 21.3],
                    [-157.78, 21.28],
                    [-157.8, 21.26],
                    [-157.83, 21.27],
                    [-157.83, 21.29],
                  ],
                ],
              ],
            },
          },
        ],
        style: {
          borderColor: '#BD9FDA',
          fillColor: '#BD9FDA',
          opacity: 0.2,
          type: 'fill',
        },
      },
    ];
  }, [selectedFeatureId]);

  const mapHighlightGroups: MapHighlightGroup[] = [
    {
      highlights: [
        {
          featureIds: [{ featureGroupId: 'Red', featureId: 'D' }],
          highlightId: 'highlight',
          style: {
            fillPatternUrl: '/assets/stripes-m.png',
            opacity: 1.0,
            type: 'fill',
          },
        },
      ],
    },
  ];

  return (
    <MapContainer
      containerId={'map-container'}
      map={
        <MapBox
          {...args}
          containerId={'map-container'}
          cursorInteract={'pointer'}
          disableDoubleClickZoom
          featureGroups={mapFeautureGroups}
          highlightGroups={mapHighlightGroups}
          initialViewState={{
            latitude: 21.3,
            longitude: -157.8,
            zoom: 14,
          }}
          mapImageUrls={['/assets/stripes-m.png']}
          mapViewStyle={mapViewStyle}
          setMapViewStyle={setMapViewStyle}
          onClickCanvas={onMapCLick}
        />
      }
      drawer={
        <MapDrawer
          open={selectedFeatureId !== undefined}
          onClose={() => setSelectedFeatureId(undefined)}
          size={'small'}
          title={`Selected: ${selectedFeatureId}`}
        />
      }
      drawerOpen={selectedFeatureId !== undefined}
      legend={
        <Box
          display={'flex'}
          minWidth={'184px'}
          width={isDesktop ? '184px' : 'fill'}
          minHeight={'700px'}
          height={'fill'}
          bgcolor={'#FCF4A3'}
          alignItems={'center'}
          justifyContent={'center'}
          textAlign={'center'}
        >
          Legend Placeholder
        </Box>
      }
    />
  );
};

export const Default = Template.bind({});

Default.args = {
  mapId: 'map',
  mapViewStyle: 'Satellite',
  token: process.env.TERRAWARE_MAPBOX_API_TOKEN,
};
