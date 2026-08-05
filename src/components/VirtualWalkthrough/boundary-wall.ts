import { Vec3 } from 'playcanvas';

import { computeGroundPlane, yOnPlane } from './groundPlane';

export type BoundaryWallGeometryParams = {
  center: Vec3;
  radius: number;
  /** Three world-space points defining the ground the wall stands on. Empty or degenerate falls back to baseY. */
  groundPlane: Vec3[];
  /** Flat base height used when no usable ground plane is supplied. */
  baseY: number;
  /** Wall height in world units above the base. */
  height: number;
  /** Target grid cell size in world units. Rounded so cells divide the circumference and height evenly. */
  gridSpacing: number;
  segments?: number;
};

/**
 * Flat-array geometry ready for `Mesh.setPositions` / `Mesh.setUvs` / `Mesh.setIndices`, plus the
 * grid cell counts the shader needs to know how far the UVs run.
 */
export type BoundaryWallGeometry = {
  positions: number[];
  uvs: number[];
  indices: number[];
  columns: number;
  rows: number;
};

/**
 * Triangle geometry for an upright cylinder standing on the boundary circle. Each segment is a quad
 * (two triangles) spanning from the ground up to `height`; the base is sampled on the ground plane so
 * the wall meets the dashed BoundaryRing exactly.
 *
 * UVs are emitted in **grid cell units** rather than metres — u runs 0..columns around the
 * circumference and v runs 0..rows up the wall — so the shader can draw a line at every whole number
 * and have the seam at u = columns line up perfectly with u = 0.
 */
export const boundaryWallMesh = ({
  center,
  radius,
  groundPlane,
  baseY,
  height,
  gridSpacing,
  segments = 96,
}: BoundaryWallGeometryParams): BoundaryWallGeometry => {
  if (radius <= 0 || height <= 0 || segments <= 0 || gridSpacing <= 0) {
    return { positions: [], uvs: [], indices: [], columns: 0, rows: 0 };
  }

  const plane = computeGroundPlane(groundPlane);
  const columns = Math.max(1, Math.round((Math.PI * 2 * radius) / gridSpacing));
  const rows = Math.max(1, Math.round(height / gridSpacing));
  const step = (Math.PI * 2) / segments;

  const positions: number[] = [];
  const uvs: number[] = [];
  const indices: number[] = [];

  const pushColumn = (index: number) => {
    const angle = index * step;
    const x = center.x + radius * Math.cos(angle);
    const z = center.z + radius * Math.sin(angle);
    const y = plane ? yOnPlane(x, z, plane.normal, plane.point, baseY) : baseY;
    const u = (index / segments) * columns;

    positions.push(x, y, z, x, y + height, z);
    uvs.push(u, 0, u, rows);
  };

  for (let i = 0; i < segments; i++) {
    const base = i * 4;
    // Per segment: v0 bottom@a0, v1 top@a0, v2 bottom@a1, v3 top@a1.
    pushColumn(i);
    pushColumn(i + 1);
    indices.push(base, base + 1, base + 3, base, base + 3, base + 2);
  }

  return { positions, uvs, indices, columns, rows };
};
