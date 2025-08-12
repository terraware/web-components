import React, { useCallback, useState } from 'react';

import { Box } from '@mui/material';
import { action } from '@storybook/addon-actions';
import { Story } from '@storybook/react';
import { MapMouseEvent } from 'mapbox-gl';

import Button from '../components/Button/Button';
import MapBox from '../components/Map/MapBox';
import MapContainer from '../components/Map/MapContainer';
import { MapMarker, MapViewStyle } from '../components/Map/types';
import TextField from '../components/Textfield/Textfield';
import { useDeviceInfo } from '../utils';

export default {
  title: 'MapMarker',
  component: MapBox,
};

const Template: Story<{ clusterRadius: number; token: string }> = (args) => {
  const { isDesktop } = useDeviceInfo();
  const [mapViewStyle, setMapViewStyle] = useState<MapViewStyle>('Satellite');

  const [markers, setMarkers] = useState<MapMarker[]>([]);
  const [latitude, setLatitude] = useState('');
  const [longitude, setLongitude] = useState('');
  const [markerNumber, setMarkerNumber] = useState(1);

  const [error, setError] = useState<string>();

  const onMarkerClick = useCallback(
    (markerId: string) => {
      action('Marker Clicked')(markerId);
      setMarkers((_markers) => {
        return _markers.map((marker) => ({
          ...marker,
          selected: marker.id === markerId ? !marker.selected : marker.selected,
        }));
      });
    },
    [action]
  );

  const onSubmit = useCallback(() => {
    const lat = Number(latitude);
    const long = Number(longitude);

    if (isNaN(lat) || isNaN(long)) {
      setError('invalid input');

      return;
    }

    setMarkers((_markers) => [
      ..._markers,
      {
        id: `marker-${markerNumber}`,
        latitude: lat,
        longitude: long,
        onClick: () => onMarkerClick(`marker-${markerNumber}`),
      },
    ]);

    action('Marker Placed')(`marker-${markerNumber}`);
    setMarkerNumber((value) => value + 1);
  }, [action, latitude, longitude, markerNumber, onMarkerClick]);

  const onMapCLick = useCallback((event: MapMouseEvent) => {
    action('Map clicked')();
    setLatitude(event.lngLat.lat.toString());
    setLongitude(event.lngLat.lng.toString());
  }, []);

  return (
    <MapContainer
      containerId={'map-container'}
      map={
        <MapBox
          mapId={'map'}
          clusterRadius={args.clusterRadius}
          containerId={'map-container'}
          cursorMap={'crosshair'}
          mapViewStyle={mapViewStyle}
          markerGroups={[
            {
              label: 'plant',
              markers,
              markerGroupId: 'plant',
              style: {
                iconColor: 'green',
                iconName: 'iconLivePlant',
                type: 'icon',
              },
            },
          ]}
          onClickCanvas={onMapCLick}
          setMapViewStyle={setMapViewStyle}
          token={args.token}
        />
      }
      legend={
        <Box
          bgcolor={'white'}
          display={'flex'}
          flexDirection={'column'}
          padding={'4px'}
          minWidth={'184px'}
          width={isDesktop ? '184px' : 'fill'}
          minHeight={'700px'}
          height={'fill'}
        >
          <TextField
            id={'latitude'}
            type={'number'}
            label={'latitude'}
            value={latitude}
            onChange={(value) => setLatitude(value as string)}
            errorText={error}
          />
          <TextField
            id={'longitude'}
            type={'number'}
            label={'longitude'}
            value={longitude}
            onChange={(value) => setLongitude(value as string)}
            errorText={error}
          />
          <Button label={'Add Maker'} onClick={onSubmit} />
        </Box>
      }
    />
  );
};

export const Default = Template.bind({});

Default.args = {
  clusterRadius: 40,
  token: process.env.TERRAWARE_MAPBOX_API_TOKEN,
};
