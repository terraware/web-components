import { detectSplatFormat, splatLoaderFilename } from './splatFormat';

describe('detectSplatFormat', () => {
  it('detects a bundled .sog archive', () => {
    expect(detectSplatFormat('https://example.com/scenes/7154.sog')).toBe('sog');
  });

  it('detects an unbundled sog meta.json', () => {
    expect(detectSplatFormat('https://example.com/scenes/7154/meta.json')).toBe('sogUnbundled');
  });

  it('detects a streamed LOD sog lod-meta.json', () => {
    expect(detectSplatFormat('https://example.com/scenes/7154/lod-meta.json')).toBe('sogStreamed');
  });

  it('detects a .ply model', () => {
    expect(detectSplatFormat('https://example.com/scenes/7154.ply')).toBe('ply');
  });

  it('ignores query strings on signed urls', () => {
    expect(detectSplatFormat('https://example.com/7154/meta.json?rlkey=abc123&raw=1')).toBe('sogUnbundled');
  });

  it('ignores url fragments', () => {
    expect(detectSplatFormat('https://example.com/7154/lod-meta.json#frag')).toBe('sogStreamed');
  });

  it('is case insensitive', () => {
    expect(detectSplatFormat('https://example.com/7154/Meta.JSON')).toBe('sogUnbundled');
    expect(detectSplatFormat('https://example.com/7154.SOG')).toBe('sog');
  });

  it('handles a bare filename with no directory', () => {
    expect(detectSplatFormat('meta.json')).toBe('sogUnbundled');
  });

  it('does not mistake lod-meta.json for the unbundled format', () => {
    expect(detectSplatFormat('https://example.com/lod-meta.json')).not.toBe('sogUnbundled');
  });

  it('does not treat an arbitrary .json file as a sog manifest', () => {
    expect(detectSplatFormat('https://example.com/scene.json')).toBe('sog');
  });

  it('falls back to the bundled sog format for extensionless urls', () => {
    expect(detectSplatFormat('https://example.com/assets/abc123?raw=1')).toBe('sog');
  });
});

describe('splatLoaderFilename', () => {
  it('maps the bundled format to a .sog filename so the loader picks the sog bundle parser', () => {
    expect(splatLoaderFilename('sog')).toBe('model.sog');
  });

  it('maps the unbundled format to meta.json so the loader picks the plain sog parser', () => {
    expect(splatLoaderFilename('sogUnbundled')).toBe('meta.json');
  });

  it('maps the streamed format to the exact basename the octree parser matches on', () => {
    expect(splatLoaderFilename('sogStreamed')).toBe('lod-meta.json');
  });

  it('maps ply to a .ply filename', () => {
    expect(splatLoaderFilename('ply')).toBe('model.ply');
  });
});
