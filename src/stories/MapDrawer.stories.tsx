import React, { useCallback, useState } from 'react';

import { Box } from '@mui/material';
import { action } from '@storybook/addon-actions';
import { Story } from '@storybook/react';

import Button from '../components/Button/Button';
import MapContainer from '../components/Map/MapContainer';
import MapDrawer, { MapDrawerProp } from '../components/Map/MapDrawer';
import { useDeviceInfo } from '../utils';

export default {
  title: 'MapDrawer',
  component: MapDrawer,
};

const Template: Story<MapDrawerProp> = (args) => {
  const { isDesktop } = useDeviceInfo();
  const [open, setOpen] = useState(true);

  const onClose = useCallback(() => {
    action('onClose')();
    setOpen(false);
  }, [setOpen]);

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
          <Button onClick={() => setOpen(true)} label='Open Drawer' />
        </Box>
      }
      drawer={
        <MapDrawer {...args} onClose={onClose} open={open}>
          {args.children}
        </MapDrawer>
      }
      drawerOpen={open}
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
  title: 'Map Drawer Title',
  size: 'small',
  children: `\
Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nullam faucibus, ex in dignissim pulvinar, \
nunc quam molestie massa, sit amet pulvinar mauris mauris eget enim. Nullam suscipit ultrices turpis \
id volutpat. Pellentesque accumsan risus ac tortor dictum, et varius augue viverra. Vestibulum \
lectus mauris, rhoncus vel elit eu, faucibus aliquam enim. Maecenas aliquam pellentesque magna. \
Etiam quis turpis fermentum, bibendum turpis in, bibendum velit. Nulla facilisi. Nam egestas \
gravida lorem, sit amet laoreet quam tincidunt vitae. Ut lobortis, massa id sodales faucibus, \
neque nibh varius massa, eget faucibus purus lorem sed ligula.

Sed eleifend, diam sed malesuada dapibus, nulla enim ultrices diam, non iaculis sem enim id \
elit. Cras imperdiet urna et libero iaculis, in lacinia metus lacinia. Sed quis leo non lectus \
tristique scelerisque. Nam at sodales ligula. Etiam congue porttitor odio, non consequat sem \
molestie at. Sed semper in elit eleifend accumsan. Pellentesque in porttitor enim. Phasellus odio \
odio, finibus vitae elit et, pharetra viverra justo. Duis eu ligula sit amet dui bibendum tempus. \
Cras leo purus, lobortis ut leo vel, congue maximus dolor. Aliquam condimentum leo vitae nulla \
vulputate, pulvinar blandit lorem condimentum. Duis eget leo et arcu rhoncus iaculis vel vel risus. \
Sed scelerisque, justo quis auctor mollis, eros magna cursus risus, id suscipit lectus massa ac urna.`,
};
