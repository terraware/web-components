import React, { useRef } from 'react';

import { Script } from '@playcanvas/react/components';
import { Color, Script as PcScript, Vec3 } from 'playcanvas';
import { GSplatRevealRain } from 'playcanvas/scripts/esm/gsplat/reveal-rain.mjs';

import { useRestartOnVr } from './useRestartOnVr';

interface SplatRevealRainProps {
  enabled?: boolean;
  restartOnVr?: boolean;
  scaleFactor?: number;
  center?: [number, number, number];
  distance?: number;
  speed?: number;
  acceleration?: number;
  flightTime?: number;
  rainSize?: number;
  rotation?: number;
  fallTint?: [number, number, number];
  fallTintIntensity?: number;
  hitTint?: [number, number, number];
  hitDuration?: number;
  endRadius?: number;
}

const SplatRevealRain = ({
  enabled = true,
  restartOnVr = true,
  scaleFactor = 1,
  center = [0, 0, 0],
  distance = 3,
  speed = 1,
  acceleration = 5,
  flightTime = 0.25,
  rainSize = 0.0,
  rotation = 0,
  fallTint = [0, 0, 0],
  fallTintIntensity = 0,
  hitTint = [0, 0, 0],
  hitDuration = 0,
  endRadius = 5,
}: SplatRevealRainProps) => {
  const scale = (value: number) => value * scaleFactor;
  const scriptRef = useRef<PcScript | null>(null);

  useRestartOnVr(scriptRef, enabled && restartOnVr);

  return (
    <Script
      ref={scriptRef}
      script={GSplatRevealRain}
      enabled={enabled}
      center={new Vec3(...center).mulScalar(scaleFactor)}
      distance={scale(distance)}
      speed={scale(speed)}
      acceleration={scale(acceleration)}
      flightTime={flightTime}
      rainSize={scale(rainSize)}
      rotation={rotation}
      fallTint={new Color(...fallTint)}
      fallTintIntensity={fallTintIntensity}
      hitTint={new Color(...hitTint)}
      hitDuration={hitDuration}
      endRadius={scale(endRadius)}
    />
  );
};

export default SplatRevealRain;
