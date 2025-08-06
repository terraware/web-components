import React, { useMemo, useState } from 'react';

import { Box } from '@mui/material';
import { Story } from '@storybook/react';

import MapContainer from '../components/Map/MapContainer';
import MapLegend, { MapLegendGroup, MapLegendProps } from '../components/Map/MapLegend';

export default {
  title: 'MapLegend',
  component: MapLegend,
};

const Template: Story<MapLegendProps> = () => {
  const [layer, setLayer] = useState<string>('forest');

  const [houseVisible, setHouseVisible] = useState<boolean>(true);
  const [treeVisible, setTreeVisible] = useState<boolean>(true);

  const [rainfallVisible, setRainfallVisible] = useState<boolean>(false);

  const legends = useMemo(
    (): MapLegendGroup[] => [
      {
        title: 'Boundaries',
        type: 'layer',
        selectedLayer: layer,
        setSelectedLayer: setLayer,
        items: [
          {
            style: {
              fillColor: '#009900',
              borderColor: '#005500',
              opacity: 0.2,
              type: 'fill',
            },
            id: 'forest',
            label: 'Forest',
          },
          {
            style: {
              fillColor: '#000099',
              borderColor: '#000055',
              opacity: 0.2,
              type: 'fill',
            },
            id: 'water',
            label: 'Water',
          },
          {
            style: {
              fillColor: '#00FF00',
              borderColor: '#000000',
              opacity: 0.2,
              type: 'fill',
            },
            id: 'radioactive',
            label: 'Radioactive Waste',
          },
          {
            style: {
              fillColor: '#FF0000',
              borderColor: '#000000',
              opacity: 0.2,
              type: 'fill',
            },
            disabled: true,
            id: 'volcanic',
            label: 'Volcanic Area',
          },
        ],
      },
      {
        title: 'Structure',
        tooltip: 'Strucutres that are placed onto the map',
        type: 'marker',
        items: [
          {
            style: {
              iconColor: '#FCD12A',
              iconName: 'home',
              iconOpacity: 0.5,
              type: 'icon',
            },
            id: 'house',
            label: 'House',
            visible: houseVisible,
            setVisible: setHouseVisible,
          },
          {
            style: {
              iconColor: '#008000',
              iconName: 'iconLivePlant',
              iconOpacity: 0.5,
              type: 'icon',
            },
            id: 'tree',
            label: 'Tree',
            visible: treeVisible,
            setVisible: setTreeVisible,
          },
          {
            style: {
              iconColor: '#FF0000',
              iconName: 'iconLivePlant',
              iconOpacity: 0.5,
              type: 'icon',
            },
            id: 'dead-tree',
            label: 'Dead Tree',
            visible: false,
            setVisible: undefined,
            disabled: true,
          },
          {
            style: {
              iconColor: '#008000',
              iconName: 'iconHelp',
              iconOpacity: 0.5,
              type: 'icon',
            },
            id: 'unknown',
            label: 'Unknown',
            visible: true,
            setVisible: undefined,
            disabled: true,
          },
        ],
      },
      {
        title: 'Rainfall',
        type: 'highlight',
        visible: rainfallVisible,
        setVisible: setRainfallVisible,
        items: [
          {
            style: {
              borderColor: '#FFFFFF',
              fillColor: 'transparent',
              fillPatternUrl: '/assets/stripes-s.png',
              opacity: 0.5,
              type: 'fill',
            },
            label: 'Dry',
          },
          {
            style: {
              borderColor: '#FFFFFF',
              fillColor: 'transparent',
              fillPatternUrl: '/assets/stripes-m.png',
              opacity: 0.5,
              type: 'fill',
            },
            label: 'Wet',
          },
        ],
      },
      {
        title: 'Land Tenure (Not Available)',
        disabled: true,
        type: 'highlight',
        visible: false,
        items: [
          {
            style: {
              borderColor: '#FF00FF',
              fillColor: '#FFB6C1',
              opacity: 0.5,
              type: 'fill',
            },
            label: 'Owned',
          },
        ],
      },
    ],
    [layer, houseVisible, treeVisible, rainfallVisible]
  );

  return (
    <MapContainer
      map={
        <Box
          display={'flex'}
          flexDirection={'column'}
          width={'100%'}
          minHeight={'700px'}
          height={'fill'}
          bgcolor={'#9DC183'}
          alignItems={'center'}
          justifyContent={'center'}
          textAlign={'center'}
          margin={0}
        >
          Map Placeholder
        </Box>
      }
      legend={<MapLegend legends={legends} />}
    />
  );
};

export const Default = Template.bind({});
