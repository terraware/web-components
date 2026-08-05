import { Vec3 } from 'playcanvas';

import { boundaryWallMesh } from './boundary-wall';

const FLAT = [new Vec3(0, 0, 0), new Vec3(1, 0, 0), new Vec3(0, 0, 1)];

const BASE = { center: new Vec3(0, 0, 0), radius: 5, groundPlane: FLAT, baseY: 0, height: 2.5, gridSpacing: 0.5 };

const toVertices = (positions: number[]): [number, number, number][] => {
  const out: [number, number, number][] = [];
  for (let i = 0; i < positions.length; i += 3) {
    out.push([positions[i], positions[i + 1], positions[i + 2]]);
  }

  return out;
};

describe('boundaryWallMesh', () => {
  it('produces four vertices, four UVs and six indices per segment', () => {
    const geom = boundaryWallMesh({ ...BASE, segments: 16 });
    expect(geom.positions).toHaveLength(16 * 4 * 3);
    expect(geom.uvs).toHaveLength(16 * 4 * 2);
    expect(geom.indices).toHaveLength(16 * 6);
  });

  it('places every vertex at the boundary radius in XZ', () => {
    const center = new Vec3(2, 0, -3);
    const geom = boundaryWallMesh({ ...BASE, center, radius: 4, segments: 32 });
    for (const [x, , z] of toVertices(geom.positions)) {
      expect(Math.sqrt((x - center.x) ** 2 + (z - center.z) ** 2)).toBeCloseTo(4);
    }
  });

  it('puts the top ring exactly `height` above the bottom ring', () => {
    const geom = boundaryWallMesh({ ...BASE, height: 3, segments: 8 });
    const verts = toVertices(geom.positions);
    // Per segment the order is: bottom@a0, top@a0, bottom@a1, top@a1.
    for (let i = 0; i < verts.length; i += 4) {
      expect(verts[i + 1][1] - verts[i][1]).toBeCloseTo(3);
      expect(verts[i + 3][1] - verts[i + 2][1]).toBeCloseTo(3);
    }
  });

  it('sits the base on a tilted ground plane (y = z)', () => {
    const tilted = [new Vec3(0, 0, 0), new Vec3(1, 0, 0), new Vec3(0, 1, 1)];
    const geom = boundaryWallMesh({ ...BASE, groundPlane: tilted, radius: 3, height: 2, segments: 8 });
    const verts = toVertices(geom.positions);
    for (let i = 0; i < verts.length; i += 4) {
      expect(verts[i][1]).toBeCloseTo(verts[i][2]);
      expect(verts[i + 2][1]).toBeCloseTo(verts[i + 2][2]);
    }
  });

  it('falls back to a flat base at baseY when no ground plane is supplied', () => {
    const geom = boundaryWallMesh({ ...BASE, groundPlane: [], baseY: 1.5, height: 2, segments: 8 });
    const verts = toVertices(geom.positions);
    expect(verts).not.toHaveLength(0);
    for (let i = 0; i < verts.length; i += 4) {
      expect(verts[i][1]).toBeCloseTo(1.5);
      expect(verts[i + 1][1]).toBeCloseTo(3.5);
    }
  });

  it('falls back to a flat base for a degenerate ground plane', () => {
    const collinear = [new Vec3(0, 0, 0), new Vec3(1, 0, 0), new Vec3(2, 0, 0)];
    const geom = boundaryWallMesh({ ...BASE, groundPlane: collinear, baseY: -2, segments: 8 });
    const verts = toVertices(geom.positions);
    expect(verts).not.toHaveLength(0);
    expect(verts[0][1]).toBeCloseTo(-2);
  });

  it('reports whole-number grid cell counts derived from gridSpacing', () => {
    // Circumference 2*pi*5 = 31.4159; at 0.5 m spacing that rounds to 63 columns.
    const geom = boundaryWallMesh({ ...BASE, radius: 5, height: 2.5, gridSpacing: 0.5, segments: 8 });
    expect(geom.columns).toBe(63);
    expect(geom.rows).toBe(5);
  });

  it('emits u in cell units that wrap exactly at `columns`', () => {
    const geom = boundaryWallMesh({ ...BASE, segments: 8 });
    const us: number[] = [];
    for (let i = 0; i < geom.uvs.length; i += 2) {
      us.push(geom.uvs[i]);
    }
    expect(us[0]).toBeCloseTo(0);
    // Last vertex of the last segment closes the loop at exactly `columns`.
    expect(us[us.length - 1]).toBeCloseTo(geom.columns);
  });

  it('emits v as 0 at the base and `rows` at the top', () => {
    const geom = boundaryWallMesh({ ...BASE, segments: 8 });
    for (let i = 0; i < geom.uvs.length; i += 8) {
      expect(geom.uvs[i + 1]).toBeCloseTo(0);
      expect(geom.uvs[i + 3]).toBeCloseTo(geom.rows);
    }
  });

  it('references only in-range vertices from the index buffer', () => {
    const geom = boundaryWallMesh({ ...BASE, segments: 8 });
    const vertexCount = geom.positions.length / 3;
    for (const idx of geom.indices) {
      expect(idx).toBeGreaterThanOrEqual(0);
      expect(idx).toBeLessThan(vertexCount);
    }
  });

  it('returns empty geometry for a non-positive radius', () => {
    const geom = boundaryWallMesh({ ...BASE, radius: 0 });
    expect(geom.positions).toHaveLength(0);
    expect(geom.indices).toHaveLength(0);
  });

  it('returns empty geometry for a non-positive height', () => {
    expect(boundaryWallMesh({ ...BASE, height: 0 }).positions).toHaveLength(0);
  });

  it('returns empty geometry for a non-positive segment count', () => {
    expect(boundaryWallMesh({ ...BASE, segments: 0 }).positions).toHaveLength(0);
  });

  it('returns empty geometry for a non-positive grid spacing', () => {
    expect(boundaryWallMesh({ ...BASE, gridSpacing: 0 }).positions).toHaveLength(0);
  });
});
