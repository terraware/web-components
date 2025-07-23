import React, { useMemo, useState } from 'react';
import { Story } from '@storybook/react';
import MapLegend, { MapLegendGroup, MapLegendProps } from '../components/Map/MapLegend';
import { Box } from '@mui/material';
import { useDeviceInfo } from '../utils';


export default {
  title: 'MapLegend',
  component: MapLegend,
};

const Template: Story<MapLegendProps> = () => {
  const { isDesktop } = useDeviceInfo();
  const [layer, setLayer] = useState<string>('forest');

  const [houseVisible, setHouseVisible] = useState<boolean>(true);
  const [treeVisible, setTreeVisible] = useState<boolean>(true);

  const [rainfallVisible, setRainfallVisible] = useState<boolean>(false);

  const mapBorderRadius = useMemo(() => {
    if (isDesktop) {
      return '8px 0 0 8px';
    } else {
      return '8px 8px 0 0';
    }
  }, [isDesktop]);

  const legends = useMemo(() : MapLegendGroup[] => [
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
            },
            id: 'forest',
            label: 'Forest',
          },
          {
            style: {
              fillColor: '#000099',
              borderColor: '#000055',
              opacity: 0.2,
            },
            id: 'water',
            label: 'Water',
          },
          {
            style: {
              fillColor: '#00FF00',
              borderColor: '#000000',
              opacity: 0.2,
            },
            id: 'radioactive',
            label: 'Radioactive Waste',
          },
          {
            style: {
              fillColor: '#FF0000',
              borderColor: '#000000',
              opacity: 0.2,
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
        type: 'feature',
        items: [
          {
            icon: 'home',
            iconColor: '#FCD12A',
            iconOpacity: 0.5,
            id: 'house',
            label: 'House',
            visible: houseVisible,
            setVisible: setHouseVisible
          },
          {
            icon: 'iconLivePlant',
            iconColor: '#008000',
            iconOpacity: 0.5,
            id: 'tree',
            label: 'Tree',
            visible: treeVisible,
            setVisible: setTreeVisible
          },
          {
            icon: 'iconLivePlant',
            iconColor: '#FF0000',
            iconOpacity: 0.5,
            id: 'dead-tree',
            label: 'Dead Tree',
            visible: false,
            setVisible: undefined,
            disabled: true,
          },
          {
            icon: 'iconHelp',
            iconColor: '#008000',
            iconOpacity: 0.5,
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
            },
            label: 'Dry',
          },
          {
            style: {
              borderColor: '#FFFFFF',
              fillColor: 'transparent',
              fillPatternUrl: '/assets/stripes-m.png',
              opacity: 0.5,
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
            },
            label: 'Owned',
          },
        ],
      },
    ], [layer, houseVisible, treeVisible, rainfallVisible]);

  return (
    <Box sx={{ marginTop: '30px' }}>
      <Box display={'flex'} flexDirection={isDesktop ? 'row' : 'column'}>
        <Box
          display={'flex'}
          width={'100%'}
          height={'fill'}
          minHeight={'700px'}
          borderRadius={mapBorderRadius}
          bgcolor={'#9DC183'}
          alignItems={'center'}
          justifyContent={'center'}
          margin={0}
        >
          Map Placeholder
        </Box>
        <MapLegend legends={legends} />
      </Box>
    </Box>
  );
};

export const Default = Template.bind({});