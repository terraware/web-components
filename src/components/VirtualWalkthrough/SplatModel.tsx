import React, { memo, useEffect } from 'react';

import { Entity } from '@playcanvas/react';
import { GSplat } from '@playcanvas/react/components';
import { useSplat } from '@playcanvas/react/hooks';

import BlockingSpinner from './BlockingSpinner';
import SplatCrop from './SplatCrop';
import SplatFadeCrop from './SplatFadeCrop';
import SplatRevealRain from './SplatRevealRain';

export interface SplatModelProps {
  splatSrc: string;
  rotation?: [number, number, number];
  cropAabbMin?: [number, number, number];
  cropAabbMax?: [number, number, number];
  cropEdgeScaleFactor?: number;
  cropFade?: boolean;
  cropFadeDistance?: number;
  revealRain?: boolean;
  onError?: (error: Error) => void;
  modelScale?: number;
}

const SplatModel = ({
  splatSrc,
  rotation,
  cropAabbMin,
  cropAabbMax,
  cropEdgeScaleFactor,
  cropFade = false,
  cropFadeDistance = 0.5,
  revealRain = false,
  onError,
  modelScale = 1,
}: SplatModelProps) => {
  // A filename is required for the file props to assist with the asset loading. Otherwise it assumes that the splatSrc is a ply file.
  const { asset, loading, error } = useSplat(splatSrc, { file: { filename: 'model.sog' } });

  useEffect(() => {
    if (error) {
      onError?.(new Error(error));
    }
  }, [error, onError]);

  if (loading) {
    return <BlockingSpinner />;
  }

  if (!asset) {
    return null;
  }

  const scale = modelScale || 1;

  return (
    <Entity name='splat' rotation={rotation} scale={[scale, scale, scale]}>
      <GSplat asset={asset} />
      {(cropAabbMin || cropAabbMax) &&
        (cropFade ? (
          <SplatFadeCrop aabbMin={cropAabbMin} aabbMax={cropAabbMax} fadeDistance={cropFadeDistance} />
        ) : (
          <SplatCrop aabbMin={cropAabbMin} aabbMax={cropAabbMax} edgeScaleFactor={cropEdgeScaleFactor} />
        ))}
      <SplatRevealRain enabled={revealRain} />
    </Entity>
  );
};

export default memo(SplatModel);
