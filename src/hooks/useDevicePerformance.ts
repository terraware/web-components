import { useMemo } from 'react';

import useDeviceInfo from '../utils/useDeviceInfo';

interface DevicePerformance {
  isHighPerformance: boolean;
  cpuCores: number;
  deviceMemory?: number;
  isMobile: boolean;
}

export const useDevicePerformance = (): DevicePerformance => {
  const { isMobile } = useDeviceInfo();

  const cpuCores = useMemo(() => navigator.hardwareConcurrency || 4, []);

  const deviceMemory = useMemo(() => (navigator as Navigator & { deviceMemory?: number }).deviceMemory, []);

  const isHighPerformance = useMemo(
    () => (!isMobile && cpuCores >= 4) || (deviceMemory !== undefined && deviceMemory >= 8) || cpuCores >= 6,
    [cpuCores, deviceMemory, isMobile]
  );

  return { isHighPerformance, cpuCores, deviceMemory, isMobile };
};
