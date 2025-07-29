import React, { ReactNode, useMemo } from 'react';

import { Box, useTheme } from '@mui/material';

import { useDeviceInfo } from '../../utils';

type MapContainerProps = {
  drawer?: ReactNode;
  drawerOpen?: boolean;
  legend?: ReactNode;
  map: ReactNode;
};

const MapContainer = (props: MapContainerProps) => {
  const { drawer, drawerOpen, legend, map } = props;
  const { isDesktop } = useDeviceInfo();
  const theme = useTheme();

  const border = useMemo(() => {
    if (!isDesktop && drawerOpen) {
      return undefined;
    }

    return `1px solid ${theme.palette.TwClrBrdrTertiary}`;
  }, [drawerOpen, isDesktop, theme]);

  const borderRadius = useMemo(() => {
    if (!isDesktop && drawerOpen) {
      return undefined;
    }

    return '8px';
  }, [drawerOpen, isDesktop]);

  return (
    <Box sx={{ marginTop: '30px' }}>
      <Box
        border={border}
        borderRadius={borderRadius}
        display={'flex'}
        flexDirection={isDesktop ? 'row' : 'column'}
        maxHeight={isDesktop ? '700px' : undefined}
        overflow={'hidden'}
      >
        {(isDesktop || !drawerOpen) && map}
        {drawerOpen && drawer}
        {(isDesktop || !drawerOpen) && legend}
      </Box>
    </Box>
  );
};

export default MapContainer;
