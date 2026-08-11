/**
 * Render settings applied for the duration of an XR session. Splats rasterize as alpha-blended
 * quads with no early-z rejection, which makes a headset's stereo pixel throughput the binding
 * constraint on framerate long before splat count is.
 */

/**
 * Peripheral back-buffer resolution reduction, 0 (off) to 1 (strongest). Ineffective while MSAA is
 * on, which is one reason the application requests `antialias: false`.
 */
export const XR_FIXED_FOVEATION = 1;

/**
 * The subset of `GSplatParams` this module writes. Structural rather than the PlayCanvas type so
 * the logic can be exercised against a plain object.
 */
export interface GsplatTuningParams {
  radialSorting: boolean;
  alphaClipForward: number;
  minPixelSize: number;
}

/**
 * `radialSorting` orders splats by distance from the camera rather than by depth along its forward
 * axis, which is the more accurate ordering when the camera rotates rather than translates. Sorting
 * runs on a worker and so lags the view by at least a frame; head rotation dominates in a headset,
 * where that lag is what reads as swimming.
 *
 * The other two trade fidelity for fill rate: `alphaClipForward` drops near-transparent splats from
 * the forward pass, and `minPixelSize` drops splats that project to less than a few pixels.
 */
export const XR_GSPLAT_TUNING: GsplatTuningParams = {
  radialSorting: true,
  alphaClipForward: 0.05,
  minPixelSize: 3,
};

/**
 * Applies the XR settings, returning the values that were replaced so they can be restored when the
 * session ends. These live on the scene, so leaving them tuned would degrade desktop rendering.
 */
export const applyGsplatTuning = (params: GsplatTuningParams): GsplatTuningParams => {
  const previous: GsplatTuningParams = {
    radialSorting: params.radialSorting,
    alphaClipForward: params.alphaClipForward,
    minPixelSize: params.minPixelSize,
  };

  params.radialSorting = XR_GSPLAT_TUNING.radialSorting;
  params.alphaClipForward = XR_GSPLAT_TUNING.alphaClipForward;
  params.minPixelSize = XR_GSPLAT_TUNING.minPixelSize;

  return previous;
};

export const restoreGsplatTuning = (params: GsplatTuningParams, previous: GsplatTuningParams): void => {
  params.radialSorting = previous.radialSorting;
  params.alphaClipForward = previous.alphaClipForward;
  params.minPixelSize = previous.minPixelSize;
};
