import React, { useCallback, useState } from 'react';

import { Box } from '@mui/material';
import { action } from '@storybook/addon-actions';
import { Story } from '@storybook/react';
import { DateTime } from 'luxon';

import MapBox, { MapBoxProps } from '../components/Map/MapBox';
import MapContainer from '../components/Map/MapContainer';
import MapDateSliderControl from '../components/Map/MapDateSliderControl';
import { MapViewStyle } from '../components/Map/types';
import { useDeviceInfo } from '../utils';

export default {
  title: 'MapDateSliderControl',
  component: MapBox,
};

const Template: Story<MapBoxProps> = (args) => {
  const { isDesktop } = useDeviceInfo();
  const [mapViewStyle, setMapViewStyle] = useState<MapViewStyle>('Satellite');

  const dates = [
    DateTime.fromISO('2024-01-01'),
    DateTime.fromISO('2024-03-01'),
    DateTime.fromISO('2024-04-01'),
    DateTime.fromISO('2024-08-01'),
    DateTime.fromISO('2024-12-01'),
  ];

  const [selectedDate, setSelectedDate] = useState<DateTime>(dates[0]);

  const onSelectDate = useCallback(
    (date: DateTime) => {
      action('Date Selected')(date);
      setSelectedDate(date);
    },
    [action]
  );

  return (
    <MapContainer
      containerId={'map-container'}
      map={
        <MapBox
          {...args}
          containerId={'map-container'}
          mapViewStyle={mapViewStyle}
          setMapViewStyle={setMapViewStyle}
          controlBottomLeft={<MapDateSliderControl dates={dates} selectedDate={selectedDate} onChange={onSelectDate} />}
        />
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
