import React, { ReactNode } from 'react';

import { useDeviceInfo } from '../../utils';
import './styles.scss';

type MapContainerProps = {
  containerId?: string;
  drawer?: ReactNode;
  drawerOpen?: boolean;
  legend?: ReactNode;
  map: ReactNode;
};

const MapContainer = (props: MapContainerProps) => {
  const { containerId, drawer, drawerOpen, legend, map } = props;
  const { isDesktop } = useDeviceInfo();

  return (
    <div
      id={containerId}
      className={`map-container map-container${
        isDesktop ? '--desktop' : `--mobile${drawerOpen ? '-drawer-open' : ''}`
      }`}
    >
      {(isDesktop || !drawerOpen) && map}
      {drawerOpen && drawer}
      {(isDesktop || !drawerOpen) && legend}
    </div>
  );
};

export default MapContainer;
