import React, { memo, useEffect } from 'react';

import { Entity } from '@playcanvas/react';
import { GSplat } from '@playcanvas/react/components';
import { useSplat } from '@playcanvas/react/hooks';

import BlockingSpinner from './BlockingSpinner';
import SplatCrop from './SplatCrop';
import SplatFadeCrop from './SplatFadeCrop';
import SplatRevealRain from './SplatRevealRain';
import { SplatFormat, detectSplatFormat, splatLoaderFilename } from './splatFormat';

export interface SplatModelProps {
  splatSrc: string;
  /**
   * Splat format of `splatSrc`. Inferred from the URL when omitted, which covers bundled `.sog`,
   * unbundled sog (`meta.json`), streamed LOD sog (`lod-meta.json`) and `.ply` sources. Set this
   * explicitly when the URL hides the filename.
   */
  splatFormat?: SplatFormat;
  rotation?: [number, number, number];
  /**
   * Scale applied to the splat entity. Splat models come out of reconstruction in their own
   * arbitrary units, so this is what converts them world units.
   */
  scaleFactor?: number;
  cropAabbMin?: [number, number, number];
  cropAabbMax?: [number, number, number];
  cropEdgeScaleFactor?: number;
  cropFade?: boolean;
  cropFadeDistance?: number;
  revealRain?: boolean;
  onError?: (error: Error) => void;
}

const SplatModel = ({
  splatSrc,
  splatFormat,
  rotation,
  scaleFactor = 1,
  cropAabbMin,
  cropAabbMax,
  cropEdgeScaleFactor,
  cropFade = false,
  cropFadeDistance = 0.5,
  revealRain = false,
  onError,
}: SplatModelProps) => {
  // The loader selects its parser from this filename rather than from splatSrc, so it has to name the
  // format we are actually loading. See splatFormat.ts.
  const filename = splatLoaderFilename(splatFormat ?? detectSplatFormat(splatSrc));
  const { asset, loading, error } = useSplat(splatSrc, { file: { filename } });

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

  return (
    <Entity name='splat' rotation={rotation} scale={[scaleFactor, scaleFactor, scaleFactor]}>
      <GSplat asset={asset} unified />
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
