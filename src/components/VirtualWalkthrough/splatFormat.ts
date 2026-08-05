/*
 * The playcanvas gsplat loader picks its parser from the asset's `filename`, not from the URL it
 * actually downloads, because a splat is frequently served from a signed or extensionless URL. Each
 * supported format therefore maps to a canonical filename whose extension/basename routes the asset
 * to the matching engine parser:
 *
 *   model.sog     -> SogBundleParser      sog packed into a single zip archive
 *   meta.json     -> SogParser            the same sog data left unpacked as separate files
 *   lod-meta.json -> GSplatOctreeParser   sog with LOD levels, streamed in as the camera moves
 *   model.ply     -> PlyParser
 *
 * `sog` and `sogUnbundled` are two packagings of one format, not two formats: both parsers build a
 * GSplatSogData/GSplatSogResource and both await every texture before the resource exists. Only
 * `sogStreamed` streams — playcanvas.d.ts on GSplatOctreeResource#numSplats: "Not all of these are
 * resident at runtime: the LOD streaming system selects a subset per node based on view distance and
 * the configured splat budget."
 *
 * Only the filename is faked; the textures an unbundled or streamed sog references are still
 * resolved relative to the real URL, so no rewriting of splatSrc is needed.
 */
const LOADER_FILENAMES = {
  sog: 'model.sog',
  sogUnbundled: 'meta.json',
  sogStreamed: 'lod-meta.json',
  ply: 'model.ply',
} as const;

export type SplatFormat = keyof typeof LOADER_FILENAMES;

/**
 * Format assumed when a URL is too opaque to tell us anything. Kept as the bundled `.sog` archive so
 * that existing extensionless splat URLs keep loading the way they did before the other formats were
 * supported.
 */
export const DEFAULT_SPLAT_FORMAT: SplatFormat = 'sog';

export const splatLoaderFilename = (format: SplatFormat): string => LOADER_FILENAMES[format];

export const detectSplatFormat = (splatSrc: string): SplatFormat => {
  const path = splatSrc.split(/[?#]/)[0];
  const basename = path.slice(path.lastIndexOf('/') + 1).toLowerCase();

  if (basename === 'lod-meta.json') {
    return 'sogStreamed';
  }
  if (basename === 'meta.json') {
    return 'sogUnbundled';
  }
  if (basename.endsWith('.ply')) {
    return 'ply';
  }
  if (basename.endsWith('.sog')) {
    return 'sog';
  }

  return DEFAULT_SPLAT_FORMAT;
};
