import React, { useCallback } from 'react';

import { action } from '@storybook/addon-actions';
import { Story } from '@storybook/react';

import MapComponent, { MapComponentProps } from '../components/Map';

export default {
  title: 'MapComponent',
  component: MapComponent,
};

const Template: Story<MapComponentProps> = (args) => {
  const onMapClick = useCallback(() => {
    action('Map canvas clicked')();
  }, [action]);

  return <MapComponent {...args} onClickCanvas={onMapClick} />;
};

export const Default = Template.bind({});

Default.args = {
  initialMapViewStyle: 'Streets',
  token: process.env.TERRAWARE_MAPBOX_API_TOKEN,
};
