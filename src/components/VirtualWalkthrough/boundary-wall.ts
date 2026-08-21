import {
  BLEND_NORMAL,
  CULLFACE_NONE,
  CameraComponent,
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
  /** Absolute world Y of the wall's top edge, giving a flat top ring however the ground below tilts. */
  topY: number;
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
 * (two triangles) spanning from the ground up to `topY`; the base is sampled on the ground plane so
 * the wall meets the dashed BoundaryRing exactly, while the top is a flat ring at `topY` — the user
 * stands on the rig floor, not on the splat's ground plane, so the top is positioned relative to the
 * former and only the base follows the latter.
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
  topY,
  gridSpacing,
  segments = 96,
}: BoundaryWallGeometryParams): BoundaryWallGeometry => {
  if (radius <= 0 || segments <= 0 || gridSpacing <= 0) {
    return { positions: [], uvs: [], indices: [], columns: 0, rows: 0 };
  }

  const plane = computeGroundPlane(groundPlane);
  const step = (Math.PI * 2) / segments;

  // First pass: the bottom of every column, which the row count and the extent guard both need
  // before any vertex can be emitted.
  const bottoms = Array.from({ length: segments }, (_, index) => {
    const angle = index * step;
    const x = center.x + radius * Math.cos(angle);
    const z = center.z + radius * Math.sin(angle);

    return { x, z, y: plane ? yOnPlane(x, z, plane.normal, plane.point, baseY) : baseY };
  });

  if (bottoms.some((bottom) => bottom.y >= topY)) {
    return { positions: [], uvs: [], indices: [], columns: 0, rows: 0 };
  }

  // Every column has its own world height once the ground tilts, but v still runs 0..rows uniformly
  // for all of them, so a single row count has to stand for the whole wall. Deriving it from the
  // average bottom is exact for a flat ground plane (the common case) and keeps the cells square on
  // average when the plane is tilted.
  const averageBottomY = bottoms.reduce((total, bottom) => total + bottom.y, 0) / bottoms.length;
  const columns = Math.max(1, Math.round((Math.PI * 2 * radius) / gridSpacing));
  const rows = Math.max(1, Math.round((topY - averageBottomY) / gridSpacing));

  const positions: number[] = [];
  const uvs: number[] = [];
  const indices: number[] = [];

  const pushColumn = (index: number) => {
    // The closing column (index === segments) reuses column 0's position so the loop shuts exactly,
    // while u keeps counting up to `columns` to place the seam.
    const { x, z, y } = bottoms[index % segments];
    const u = (index / segments) * columns;

    positions.push(x, y, z, x, topY, z);
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
    uniform float uLineHalfWidth;

    varying vec2 uv0;
    varying vec3 vWorld;

    // Antialiased line mask: 1 at whole-number coordinates, 0 between them.
    //
    // The line has a solid core uLineHalfWidth cells wide either side of the coordinate, so its
    // thickness is fixed in world space and holds up close to the wall. The smoothstep then feathers
    // it over exactly one pixel (fwidth), which both antialiases the edge and keeps distant lines
    // from aliasing into moire: once a cell shrinks below a pixel the feather swallows the core and
    // the grid fades out instead of shimmering.
    float gridLine(float coord) {
        float w = fwidth(coord);
        float d = abs(fract(coord + 0.5) - 0.5);
        return 1.0 - smoothstep(uLineHalfWidth, uLineHalfWidth + w, d);
    }

    void main(void) {
        // gridLine takes derivatives, which are undefined in non-uniform control flow, so it has to
        // run before any discard.
        float grid = max(gridLine(uv0.x), gridLine(uv0.y));

        // Distance from this fragment to the head, so only the arc of wall near the user lights up.
        float fade = uFadeDistance * mix(1.0, uBlockedFadeScale, uBlocked);
        float proximity = 1.0 - clamp(distance(vWorld.xz, uHeadPos.xz) / fade, 0.0, 1.0);
        if (proximity <= 0.0) discard;

        // Soften the open top edge so the wall does not end in a hard rim.
        float topFade = 1.0 - smoothstep(0.6, 1.0, uv0.y / uRows);

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
 */
export class BoundaryWallScript extends Script {
  static scriptName = 'boundaryWall';

  center = new Vec3();
  radius = 0;
  groundPlane: Vec3[] = [];
  /** Flat bottom height used when no usable ground plane is supplied. */
  baseY = 0;
  /**
   * Absolute world Y of the wall's top edge. The default puts it 2.5 m above a rig floor at y = 0,
   * which is where the user actually stands - the splat's ground plane can be well below that.
   */
  topY = 2.5;
  segments = 96;
  gridSpacing = 0.5;
  /** Grid line thickness in world metres. */
  lineWidth = 0.025;
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
      // The head is wherever the camera component is, which is not necessarily an entity named
      // `camera`: a host scene the walkthrough is mounted into may own the only camera there is.
      this._camera = (this.app.root.findComponent('camera') as CameraComponent | null)?.entity ?? null;
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
      topY: this.topY,
      gridSpacing: this.gridSpacing,
      segments: this.segments,
    });
    if (geometry.positions.length === 0 || !this._material) {
      return;
    }

    // The shader measures distance in grid cells, so convert. A cell is gridSpacing across only
    // approximately - columns and rows are rounded to whole numbers - but that error is well under
    // a line width, so it is not worth carrying the exact cell size through as a second uniform.
    this._material.setParameter('uLineHalfWidth', (this.lineWidth / this.gridSpacing) * 0.5);
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
