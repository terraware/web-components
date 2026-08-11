import { XR_GSPLAT_TUNING, applyGsplatTuning, restoreGsplatTuning } from './xr-render-tuning';

// The PlayCanvas defaults these settings hold outside an XR session.
const defaultParams = () => ({
  radialSorting: false,
  alphaClipForward: 1 / 255,
  minPixelSize: 2,
});

describe('applyGsplatTuning', () => {
  it('writes every tuned value onto the params', () => {
    const params = defaultParams();

    applyGsplatTuning(params);

    expect(params).toEqual(XR_GSPLAT_TUNING);
  });

  it('returns the values the params held before tuning', () => {
    const params = defaultParams();

    expect(applyGsplatTuning(params)).toEqual(defaultParams());
  });

  it('returns a snapshot that later mutation of the params cannot change', () => {
    const params = defaultParams();

    const previous = applyGsplatTuning(params);
    params.minPixelSize = 99;

    expect(previous.minPixelSize).toBe(2);
  });
});

describe('restoreGsplatTuning', () => {
  it('returns tuned params to their pre-apply state', () => {
    const params = defaultParams();

    restoreGsplatTuning(params, applyGsplatTuning(params));

    expect(params).toEqual(defaultParams());
  });

  it('restores the pre-apply values rather than the library defaults', () => {
    const params = { radialSorting: true, alphaClipForward: 0.5, minPixelSize: 7 };

    restoreGsplatTuning(params, applyGsplatTuning(params));

    expect(params).toEqual({ radialSorting: true, alphaClipForward: 0.5, minPixelSize: 7 });
  });
});
