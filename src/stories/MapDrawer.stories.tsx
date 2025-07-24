import React, { useCallback, useMemo, useState } from 'react';
import { action } from '@storybook/addon-actions';
import { Story } from '@storybook/react';
import { Box, useTheme } from '@mui/material';
import { useDeviceInfo } from '../utils';
import MapDrawer, { MapDrawerProp } from '../components/Map/MapDrawer';
import Button from '../components/Button/Button';

export default {
  title: 'MapDrawer',
  component: MapDrawer,
};

const Template: Story<MapDrawerProp> = (args) => {
  const theme = useTheme();
  const { isDesktop } = useDeviceInfo();
  const [open, setOpen] = useState(true);

  const mapBorderRadius = useMemo(() => {
    if (isDesktop) {
      return '8px 0 0 8px';
    } else {
      return '8px 8px 0 0';
    }
  }, [isDesktop]);

  const legendBorderRadius = useMemo(() => {
    if (isDesktop) {
      return '0 8px 8px 0';
    } else {
      return '0 0 8px 8px';
    }
  }, [isDesktop]);

  const onClose = useCallback(() => {
    action('onClose')();
    setOpen(false);
  }, [setOpen]);

  return (
    <Box sx={{ marginTop: '30px' }}>
      <Box display={'flex'} flexDirection={isDesktop ? 'row' : 'column'} maxHeight={'700px'}>
        <Box
          display={'flex'}
          flexDirection={'column'}
          width={'100%'}
          minHeight={'700px'}
          height={'fill'}
          border={`1px solid ${theme.palette.TwClrBrdrTertiary}`}
          borderRadius={mapBorderRadius}
          bgcolor={'#9DC183'}
          alignItems={'center'}
          justifyContent={'center'}
          textAlign={'center'}
          margin={0}
        >
          Map Placeholder
          <Button onClick={() => setOpen(true)} label='Open Drawer' />
        </Box>
        <MapDrawer {...args} onClose={onClose} open={open} >
          {args.children}
        </MapDrawer>
        <Box
          display={'flex'}
          minWidth={'184px'}
          width={isDesktop ? '184px' : 'fill'}
          minHeight={'700px'}
          height={'fill'}
          border={`1px solid ${theme.palette.TwClrBrdrTertiary}`}
          borderRadius={legendBorderRadius}
          bgcolor={'#FCF4A3'}
          alignItems={'center'}
          justifyContent={'center'}
          textAlign={'center'}
        >
          Legend Placeholder
        </Box>
      </Box>
    </Box>
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
Sed scelerisque, justo quis auctor mollis, eros magna cursus risus, id suscipit lectus massa ac urna.`
};