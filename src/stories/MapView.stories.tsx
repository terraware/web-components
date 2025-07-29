import React from 'react';

import { Box } from '@mui/material';
import { Story } from '@storybook/react';

import MapContainer from '../components/Map/MapContainer';
import MapView, { MapViewProps } from '../components/Map/MapView';
import { useDeviceInfo } from '../utils';

export default {
  title: 'MapView',
  component: MapView,
};

const Template: Story<MapViewProps> = (args) => {
  const { isDesktop } = useDeviceInfo();

  return (
    <MapContainer
      map={<MapView mapId={args.mapId} mapViewStyle={args.mapViewStyle} token={args.token} />}
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
