import React, { useState } from 'react';

import { Box } from '@mui/material';
import { Story } from '@storybook/react';

import MapBox, { MapBoxProps, MapViewStyle } from '../components/Map/MapBox';
import MapContainer from '../components/Map/MapContainer';
import { useDeviceInfo } from '../utils';

export default {
  title: 'MapBox',
  component: MapBox,
};

const Template: Story<MapBoxProps> = (args) => {
  const { isDesktop } = useDeviceInfo();
  const [mapViewStyle, setMapViewStyle] = useState<MapViewStyle>('Satellite');

  return (
    <MapContainer
      containerId={'map-container'}
      map={
        <MapBox {...args} containerId={'map-container'} mapViewStyle={mapViewStyle} setMapViewStyle={setMapViewStyle} />
      }
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
