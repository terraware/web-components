import React, { useCallback } from 'react';

import { action } from '@storybook/addon-actions';
import { Story } from '@storybook/react';
import { MapMouseEvent } from 'mapbox-gl';

import MapComponent, { MapComponentProps } from '../components/Map';

export default {
  title: 'MapComponent',
  component: MapComponent,
};

const Template: Story<MapComponentProps> = (args) => {
  const onMapClick = useCallback(
    (event: MapMouseEvent) => {
      action('Map canvas clicked')(event.lngLat);
    },
    [action]
  );

  return <MapComponent {...args} onClickCanvas={onMapClick} />;
};

export const Default = Template.bind({});

Default.args = {
  features: [
    {
      layers: [
        {
          features: [
            {
              featureId: 'site-id',
              label: 'Random Site',
              geometry: {
                type: 'MultiPolygon',
                coordinates: [
                  [
                    [
                      [-73.47834183, 21.18009191],
                      [-73.47648618, 21.18394999],
                      [-73.46907602, 21.18803056],
                      [-73.46259918, 21.18797175],
                      [-73.45557493, 21.18572845],
                      [-73.45236442, 21.17953777],
                      [-73.45623639, 21.17318093],
                      [-73.47528562, 21.17255349],
                      [-73.47768143, 21.17341176],
                      [-73.47834183, 21.18009191],
                    ],
                  ],
                ],
              },
            },
          ],
          label: 'Site',
          layerId: 'sites',
          style: {
            borderColor: '#41C07F',
            fillColor: '#41C07F',
            opacity: 0.2,
            type: 'fill',
          },
        },
        {
          features: [
            {
              featureId: 'zone-A',
              label: 'Zone A',
              geometry: {
                type: 'MultiPolygon',
                coordinates: [
                  [
                    [
                      [-73.45793234, 21.18648135],
                      [-73.46104241, 21.18475659],
                      [-73.46541278, 21.18221353],
                      [-73.46733674, 21.17993921],
                      [-73.46832952, 21.17769281],
                      [-73.4709518, 21.17538839],
                      [-73.47372848, 21.17260483],
                      [-73.47528559, 21.17255346],
                      [-73.47768139, 21.17341174],
                      [-73.47834179, 21.18009188],
                      [-73.47648614, 21.18394997],
                      [-73.46907599, 21.18803053],
                      [-73.46259915, 21.18797173],
                      [-73.45793234, 21.18648135],
                    ],
                  ],
                ],
              },
              onClick: () => {
                action('Zone A clicked.')();
              },
            },
            {
              featureId: 'zone-B',
              label: 'Zone B',
              geometry: {
                type: 'MultiPolygon',
                coordinates: [
                  [
                    [
                      [-73.4579323, 21.18648133],
                      [-73.45557489, 21.18572842],
                      [-73.45236438, 21.17953774],
                      [-73.45623636, 21.1731809],
                      [-73.47372841, 21.17260483],
                      [-73.47095176, 21.17538836],
                      [-73.46832948, 21.17769278],
                      [-73.4673367, 21.17993919],
                      [-73.46541274, 21.18221351],
                      [-73.46104238, 21.18475656],
                      [-73.4579323, 21.18648133],
                    ],
                  ],
                ],
              },
              onClick: () => {
                action('Zone B clicked.')();
              },
            },
          ],
          label: 'Zones',
          layerId: 'zones',
          style: {
            borderColor: '#BD9FDA',
            fillColor: '#BD9FDA',
            opacity: 0.2,
            type: 'fill',
          },
        },
        {
          features: [
            {
              featureId: 'subzone-A1',
              label: 'Subzone A1',
              geometry: {
                type: 'MultiPolygon',
                coordinates: [
                  [
                    [
                      [-73.4673367, 21.17993919],
                      [-73.47690134, 21.18308675],
                      [-73.47648614, 21.18394997],
                      [-73.46907599, 21.18803053],
                      [-73.46259915, 21.18797173],
                      [-73.4579323, 21.18648132],
                      [-73.46104238, 21.18475656],
                      [-73.46541274, 21.18221351],
                      [-73.46710506, 21.18021302],
                      [-73.4673367, 21.17993919],
                    ],
                  ],
                ],
              },
              onClick: () => {
                action('Subzone A1 clicked.')();
              },
            },
            {
              featureId: 'subzone-A2',
              label: 'Subzone A2',
              geometry: {
                type: 'MultiPolygon',
                coordinates: [
                  [
                    [
                      [-73.47372844, 21.1726048],
                      [-73.47528555, 21.17255344],
                      [-73.47528559, 21.17255346],
                      [-73.47768135, 21.17341171],
                      [-73.47834175, 21.18009185],
                      [-73.4769013, 21.18308672],
                      [-73.4673367, 21.17993918],
                      [-73.46832948, 21.17769278],
                      [-73.47095176, 21.17538836],
                      [-73.47372841, 21.17260483],
                      [-73.47372844, 21.1726048],
                    ],
                  ],
                ],
              },
              onClick: () => {
                action('Subzone A2 clicked.')();
              },
            },
            {
              featureId: 'subzone-B1',
              label: 'Subzone B1',
              geometry: {
                type: 'MultiPolygon',
                coordinates: [
                  [
                    [
                      [-73.46733666, 21.17993916],
                      [-73.46710502, 21.18021299],
                      [-73.4654127, 21.18221348],
                      [-73.46104234, 21.18475653],
                      [-73.45793226, 21.1864813],
                      [-73.45557489, 21.18572841],
                      [-73.45236438, 21.17953774],
                      [-73.45419338, 21.17653505],
                      [-73.46733666, 21.17993916],
                    ],
                  ],
                ],
              },
              onClick: () => {
                action('Subzone B1 clicked.')();
              },
            },
            {
              featureId: 'subzone-B2',
              label: 'Subzone B2',
              geometry: {
                type: 'MultiPolygon',
                coordinates: [
                  [
                    [
                      [-73.46733662, 21.17993913],
                      [-73.45419339, 21.17653503],
                      [-73.45623636, 21.1731809],
                      [-73.47372835, 21.17260484],
                      [-73.47095172, 21.17538833],
                      [-73.46832944, 21.17769275],
                      [-73.46733667, 21.17993915],
                      [-73.46733662, 21.17993913],
                    ],
                  ],
                ],
              },
              onClick: () => {
                action('Subzone B1 clicked.')();
              },
            },
          ],
          label: 'Subzones',
          layerId: 'subzones',
          style: {
            borderColor: '#9EA9D7',
            fillColor: '#9EA9D7',
            opacity: 0.2,
            type: 'fill',
          },
        },
      ],
      sectionTitle: 'Boundaries',
      type: 'layer',
    },
    {
      groups: [
        {
          label: 'Photos',
          markerGroupId: 'photos',
          markers: [
            {
              id: 'photo-1',
              latitude: 21.18525,
              longitude: -73.459865,
            },
            {
              id: 'photo-2',
              latitude: 21.184501,
              longitude: -73.459374,
            },
            {
              id: 'photo-3',
              latitude: 21.1834,
              longitude: -73.471836,
            },
          ],
          style: {
            iconColor: '#CC79A7',
            iconName: 'iconPhoto',
            type: 'icon',
          },
        },
      ],
      sectionTitle: 'Photos',
      type: 'marker',
    },
    {
      groups: [
        {
          label: 'Live Plants',
          markerGroupId: 'live-plants',
          markers: [
            {
              id: 'live-plant-1',
              latitude: 21.184528,
              longitude: -73.463146,
            },
            {
              id: 'live-plant-2',
              latitude: 21.177232,
              longitude: -73.457216,
            },
            {
              id: 'live-plant-3',
              latitude: 21.175807,
              longitude: -73.463329,
            },
          ],
          style: {
            iconColor: '#40B0A6',
            iconName: 'iconLivePlant',
            type: 'icon',
          },
        },
        {
          label: 'Dead Plants',
          markerGroupId: 'dead-plants',
          markers: [
            {
              id: 'dead-plant-1',
              latitude: 21.180082,
              longitude: -73.460456,
            },
            {
              id: 'dead-plant-2',
              latitude: 21.178657,
              longitude: -73.466814,
            },
            {
              id: 'dead-plant-3',
              latitude: 21.175807,
              longitude: -73.469198,
            },
          ],
          style: {
            iconColor: '#E1BE6A',
            iconName: 'iconLivePlant',
            type: 'icon',
          },
        },
      ],
      sectionTitle: 'Photos',
      type: 'marker',
    },
    {
      highlight: {
        highlightId: 'observationEvents',
        highlights: [
          {
            featureIds: [
              {
                layerId: 'subzones',
                featureId: 'subzone-B2',
              },
              {
                layerId: 'zones',
                featureId: 'zone-B',
              },
              {
                layerId: 'sites',
                featureId: 'site-id',
              },
            ],
            style: {
              fillColor: '#E7B9CD',
              opacity: 0.8,
              type: 'fill',
            },
          },
          {
            featureIds: [
              {
                layerId: 'subzones',
                featureId: 'subzone-B1',
              },
            ],
            style: {
              fillColor: '#E7B9CD',
              opacity: 0.4,
              type: 'fill',
            },
          },
        ],
      },
      sectionTitle: 'Observation Events',
      sectionTooltip: 'Previous observations are shown in decreasing opacity',
      legendItems: [
        {
          label: 'Latest Observation',
          style: {
            fillColor: '#E7B9CD',
            opacity: 1.0,
            type: 'fill',
          },
        },
      ],
      type: 'highlight',
    },
    {
      highlight: {
        highlightId: 'mortalityRate',
        highlights: [
          {
            featureIds: [
              {
                layerId: 'subzones',
                featureId: 'subzone-B2',
              },
            ],
            style: {
              fillPatternUrl: '/assets/stripes-25.png',
              type: 'fill',
            },
          },
          {
            featureIds: [
              {
                layerId: 'sites',
                featureId: 'site-id',
              },
              {
                layerId: 'zones',
                featureId: 'zone-B',
              },
            ],
            style: {
              fillPatternUrl: '/assets/stripes-50.png',
              type: 'fill',
            },
          },
          {
            featureIds: [
              {
                layerId: 'subzones',
                featureId: 'subzone-B1',
              },
            ],
            style: {
              fillPatternUrl: '/assets/stripes-75.png',
              type: 'fill',
            },
          },
        ],
      },
      sectionTitle: 'Mortality Rate',
      legendItems: [
        {
          label: '< 25%',
          style: {
            fillPatternUrl: '/assets/stripes-25.png',
            opacity: 1.0,
            type: 'fill',
          },
        },
        {
          label: '25% - 50%',
          style: {
            fillPatternUrl: '/assets/stripes-50.png',
            opacity: 1.0,
            type: 'fill',
          },
        },
        {
          label: '> 50%',
          style: {
            fillPatternUrl: '/assets/stripes-75.png',
            opacity: 1.0,
            type: 'fill',
          },
        },
      ],
      type: 'highlight',
    },
  ],
  initialMapViewStyle: 'Streets',
  initialSelectedLayerId: 'sites',
  token: process.env.TERRAWARE_MAPBOX_API_TOKEN,
};
