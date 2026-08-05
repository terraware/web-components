import {
  BLEND_NORMAL,
  CULLFACE_NONE,
  Color,
  Entity,
  LAYERID_IMMEDIATE,
  Mesh,
  MeshInstance,
  SEMANTIC_POSITION,
  SEMANTIC_TEXCOORD0,
  Script,
  ShaderMaterial,
  Vec3,
} from 'playcanvas';

import { computeGroundPlane, yOnPlane } from './groundPlane';
import { distanceToCircleEdge } from './xr-scene-bounds';

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

// GLSL only: @playcanvas/react's Application defaults to deviceTypes [DEVICETYPE_WEBGL2], so the
// WGSL variants the engine's own shaders carry would never be compiled here.
const wallVertexGLSL = /* glsl */ `
    attribute vec3 vertex_position;
    attribute vec2 aUv0;

    uniform mat4 matrix_model;
    uniform mat4 matrix_viewProjection;

    varying vec2 uv0;
    varying vec3 vWorld;

    void main(void) {
        vec4 world = matrix_model * vec4(vertex_position, 1.0);
        vWorld = world.xyz;
        uv0 = aUv0;
        gl_Position = matrix_viewProjection * world;
    }
`;

const wallFragmentGLSL = /* glsl */ `
    uniform vec3 uHeadPos;
    uniform float uFadeDistance;
    uniform float uBlockedFadeScale;
    uniform float uBlocked;
    uniform float uRows;
    uniform vec3 uCalmColor;
    uniform vec3 uWarnColor;

    varying vec2 uv0;
    varying vec3 vWorld;

    // Antialiased line mask: 1 at whole-number coordinates, 0 between them.
    float gridLine(float coord) {
        float w = fwidth(coord);
        float d = abs(fract(coord + 0.5) - 0.5);
        return 1.0 - smoothstep(0.0, w * 1.5, d);
    }

    void main(void) {
        // Distance from this fragment to the head, so only the arc of wall near the user lights up.
        float fade = uFadeDistance * mix(1.0, uBlockedFadeScale, uBlocked);
        float proximity = 1.0 - clamp(distance(vWorld.xz, uHeadPos.xz) / fade, 0.0, 1.0);
        if (proximity <= 0.0) discard;

        // Soften the open top edge so the wall does not end in a hard rim.
        float topFade = 1.0 - smoothstep(0.6, 1.0, uv0.y / uRows);
        float grid = max(gridLine(uv0.x), gridLine(uv0.y));

        float alpha = proximity * topFade * grid;
        if (alpha <= 0.0) discard;

        gl_FragColor = vec4(mix(uCalmColor, uWarnColor, max(proximity, uBlocked)), alpha);
    }
`;

/**
 * Structural shape of TfXrNavigation this script depends on, kept local so it does not have to
 * import the navigation script. `enabled` is optional because a disabled script (e.g. while edit
 * mode is on) stops receiving postUpdate and would otherwise latch a stale clampDistance.
 */
type BoundaryWallNavigation = { clampDistance: number; enabled?: boolean };

/**
 * Draws a Quest-guardian-style boundary wall: an upright cylinder on the bounds circle whose grid
 * fades in and shifts toward a warning colour as the head approaches, and goes to full intensity
 * while XR navigation is actively holding the user back.
 *
 * center / radius / groundPlane / baseY are set imperatively by the BoundaryWall component (see
 * BoundaryWall.tsx for why they are not reactive Script props), which calls `rebuild()` afterwards.
 * All of them are world-space: this entity is deliberately mounted outside `content-root`, which
 * carries the scene's scaleFactor.
 */
export class BoundaryWallScript extends Script {
  static scriptName = 'boundaryWall';

  center = new Vec3();
  radius = 0;
  groundPlane: Vec3[] = [];
  baseY = 0;
  height = 2.5;
  segments = 96;
  gridSpacing = 0.5;
  /** Head distance, in world metres, at which the wall starts to appear. */
  fadeDistance = 1.5;
  /** Multiplier applied to fadeDistance while movement is being clamped. */
  blockedFadeScale = 2.5;
  calmColor = new Color(0.35, 0.7, 1);
  warnColor = new Color(1, 0.45, 0.2);

  private _material?: ShaderMaterial;
  private _mesh?: Mesh;
  private _camera: Entity | null = null;
  private _navigation: BoundaryWallNavigation | null = null;
  private _headParam = new Float32Array(3);

  initialize() {
    this._material = new ShaderMaterial({
      uniqueName: 'boundary-wall',
      vertexGLSL: wallVertexGLSL,
      fragmentGLSL: wallFragmentGLSL,
      attributes: { vertex_position: SEMANTIC_POSITION, aUv0: SEMANTIC_TEXCOORD0 },
    });
    this._material.blendType = BLEND_NORMAL;
    this._material.cull = CULLFACE_NONE;
    this._material.depthWrite = false;
    this._material.update();

    this._resolveDependencies();
    this.rebuild();

    this.once('destroy', () => {
      this._clearMesh();
      this._material?.destroy();
      this._material = undefined;
      this._camera = null;
      this._navigation = null;
    });
  }

  /**
   * The camera and the navigation script both live on entities this one does not own. They are
   * resolved lazily rather than once, because script initialize order across sibling entities is not
   * guaranteed and this entity mounts when an XR session starts.
   */
  private _resolveDependencies() {
    if (!this._camera) {
      this._camera = this.app.root.findByName('camera') as Entity | null;
    }
    if (!this._navigation) {
      const rig = this.app.root.findByName('camera-root');
      // @ts-expect-error - scripts are added dynamically to the entity
      this._navigation = (rig?.script?.tfXrNavigation as BoundaryWallNavigation | undefined) ?? null;
    }
  }

  rebuild() {
    this._clearMesh();

    const geometry = boundaryWallMesh({
      center: this.center,
      radius: this.radius,
      groundPlane: this.groundPlane,
      baseY: this.baseY,
      height: this.height,
      gridSpacing: this.gridSpacing,
      segments: this.segments,
    });
    if (geometry.positions.length === 0 || !this._material) {
      return;
    }

    this._material.setParameter('uFadeDistance', this.fadeDistance);
    this._material.setParameter('uBlockedFadeScale', this.blockedFadeScale);
    this._material.setParameter('uRows', geometry.rows);
    this._material.setParameter('uCalmColor', [this.calmColor.r, this.calmColor.g, this.calmColor.b]);
    this._material.setParameter('uWarnColor', [this.warnColor.r, this.warnColor.g, this.warnColor.b]);
    this._material.setParameter('uBlocked', 0);
    this._material.setParameter('uHeadPos', [0, 0, 0]);

    const mesh = new Mesh(this.app.graphicsDevice);
    mesh.setPositions(geometry.positions);
    mesh.setUvs(0, geometry.uvs);
    mesh.setIndices(geometry.indices);
    mesh.update();
    this._mesh = mesh;

    const meshInstance = new MeshInstance(mesh, this._material);
    if (this.entity.render) {
      this.entity.render.meshInstances = [meshInstance];
    } else {
      // Immediate layer, drawn after the World layer where the splats render, so the wall is not
      // composited behind them - same reason BoundaryRingScript uses it.
      this.entity.addComponent('render', { meshInstances: [meshInstance], layers: [LAYERID_IMMEDIATE] });
    }
  }

  update() {
    this._resolveDependencies();

    const material = this._material;
    const camera = this._camera;
    if (!material || !camera || !this.entity.render) {
      return;
    }

    const navigation = this._navigation;
    // A disabled navigation script (e.g. edit mode) stops receiving postUpdate, so its
    // clampDistance would otherwise latch whatever value it last held.
    const blocked = navigation?.enabled !== false && (navigation?.clampDistance ?? 0) > 0 ? 1 : 0;
    const reveal = this.fadeDistance * (blocked ? this.blockedFadeScale : 1);
    const head = camera.getPosition();

    // Skip the transparent draw entirely while the head is deeper inside than the widest reveal
    // radius - every fragment would discard anyway. Toggling render.enabled rather than
    // entity.enabled keeps this update running so the wall can come back.
    const edgeDistance = distanceToCircleEdge(head.x, head.z, this.center.x, this.center.z, this.radius);
    this.entity.render.enabled = this.radius > 0 && edgeDistance > -reveal;
    if (!this.entity.render.enabled) {
      return;
    }

    this._headParam[0] = head.x;
    this._headParam[1] = head.y;
    this._headParam[2] = head.z;
    material.setParameter('uHeadPos', this._headParam);
    material.setParameter('uBlocked', blocked);
  }

  private _clearMesh() {
    if (this.entity.render) {
      this.entity.render.meshInstances = [];
    }
    if (this._mesh) {
      this._mesh.destroy();
      this._mesh = undefined;
    }
  }
}
