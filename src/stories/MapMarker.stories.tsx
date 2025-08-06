import React, { useCallback, useState } from 'react';

import { Box } from '@mui/material';
import { action } from '@storybook/addon-actions';
import { Story } from '@storybook/react';
import { MapMouseEvent } from 'mapbox-gl';

import Button from '../components/Button/Button';
import Dropdown from '../components/Dropdown';
import icons, { IconName } from '../components/Icon/icons';
import MapBox, { MapMarker, MapViewStyle } from '../components/Map/MapBox';
import MapContainer from '../components/Map/MapContainer';
import TextField from '../components/Textfield/Textfield';
import { DropdownItem } from '../components/types';
import { useDeviceInfo } from '../utils';

export default {
  title: 'MapMarker',
  component: MapBox,
};

const Template: Story<{ token: string }> = (args) => {
  const { isDesktop } = useDeviceInfo();
  const [mapViewStyle, setMapViewStyle] = useState<MapViewStyle>('Satellite');

  const [markers, setMarkers] = useState<MapMarker[]>([]);
  const [latitude, setLatitude] = useState('');
  const [longitude, setLongitude] = useState('');
  const [icon, setIcon] = useState<IconName>('iconLivePlant');
  const [iconColor, setIconColor] = useState<string>('');
  const [markerNumber, setMarkerNumber] = useState(1);

  const iconDropdownOptions = Object.keys(icons).map(
    (iconName): DropdownItem => ({
      label: iconName,
      value: iconName,
    })
  );

  const [error, setError] = useState<string>();

  const onMarkerClick = useCallback(
    (markerId: string) => {
      action('Marker Deleted')(markerId);
      setMarkers((_markers) => {
        const newMarkers = _markers.filter((marker) => marker.id !== markerId);

        return [...newMarkers];
      });
    },
    [action, markers]
  );

  const onSubmit = useCallback(() => {
    const color = iconColor || 'black';

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
        style: {
          iconColor: color,
          iconName: icon,
          type: 'icon',
        },
      },
    ]);

    action('Marker Placed')(`marker-${markerNumber}`);
    setMarkerNumber((value) => value + 1);
  }, [action, latitude, longitude, markerNumber, onMarkerClick, icon, iconColor]);

  const onMapCLick = useCallback((event: MapMouseEvent) => {
    setLatitude(event.lngLat.lat.toString());
    setLongitude(event.lngLat.lng.toString());
  }, []);

  return (
    <MapContainer
      containerId={'map-container'}
      map={
        <MapBox
          mapId={'map'}
          containerId={'map-container'}
          mapViewStyle={mapViewStyle}
          markers={markers}
          onClick={onMapCLick}
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
          <Dropdown
            label={'Icon'}
            options={iconDropdownOptions}
            selectedValue={icon}
            onChange={(value) => setIcon(value as IconName)}
          />
          <TextField
            label={'color'}
            value={iconColor}
            onChange={(value) => setIconColor(value as string)}
            id={''}
            type={'text'}
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
  token: process.env.TERRAWARE_MAPBOX_API_TOKEN,
};
