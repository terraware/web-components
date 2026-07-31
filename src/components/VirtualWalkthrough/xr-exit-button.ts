import {
  ADDRESS_CLAMP_TO_EDGE,
  BLEND_NORMAL,
  CULLFACE_NONE,
  Color,
  FILTER_LINEAR,
  LAYERID_IMMEDIATE,
  Mesh,
  MeshInstance,
  Script,
  StandardMaterial,
  Texture,
  Vec3,
} from 'playcanvas';

/**
 * Boolean ray-sphere hit test. Treats the ray as a half-line (t >= 0) and returns true when it
 * intersects the sphere or starts inside it. `direction` is normalized internally.
 */
export const raySphereIntersect = (origin: Vec3, direction: Vec3, center: Vec3, radius: number): boolean => {
  const dir = direction.clone().normalize();
  const m = new Vec3().sub2(origin, center);
  const b = m.dot(dir);
  const c = m.dot(m) - radius * radius;
  if (c > 0 && b > 0) {
    return false;
  }

  return b * b - c >= 0;
};

const TEXTURE_SIZE = 256;

export class XrExitButton extends Script {
  static scriptName = 'xrExitButton';

  /** Local offset from the camera: right, up, and forward (-z) into the upper-right of the view. */
  offset = new Vec3(0.45, 0.35, -1.2);

  /** Half-extent of the square button quad, in world units at the offset distance. */
  halfSize = 0.12;

  /** World-space radius of the hover/hit sphere. Slightly larger than halfSize for easier targeting. */
  hitRadius = 0.15;

  private _material?: StandardMaterial;
  private _texture?: Texture;
  private _mesh?: Mesh;
  private _hovered = false;

  private _onXrStart = () => {
    this.entity.enabled = true;
  };

  private _onXrEnd = () => {
    this.entity.enabled = false;
    this._hovered = false;
  };

  private _createTexture(): Texture {
    const canvas = document.createElement('canvas');
    canvas.width = TEXTURE_SIZE;
    canvas.height = TEXTURE_SIZE;
    const ctx = canvas.getContext('2d');
    const c = TEXTURE_SIZE / 2;

    if (ctx) {
      ctx.clearRect(0, 0, TEXTURE_SIZE, TEXTURE_SIZE);
      ctx.fillStyle = 'rgba(20, 20, 20, 0.75)';
      ctx.beginPath();
      ctx.arc(c, c, c * 0.92, 0, Math.PI * 2);
      ctx.fill();

      const arm = TEXTURE_SIZE * 0.24;
      ctx.strokeStyle = '#ffffff';
      ctx.lineWidth = TEXTURE_SIZE * 0.09;
      ctx.lineCap = 'round';
      ctx.beginPath();
      ctx.moveTo(c - arm, c - arm);
      ctx.lineTo(c + arm, c + arm);
      ctx.moveTo(c + arm, c - arm);
      ctx.lineTo(c - arm, c + arm);
      ctx.stroke();
    }

    const texture = new Texture(this.app.graphicsDevice, {
      name: 'xr-exit-button',
      width: TEXTURE_SIZE,
      height: TEXTURE_SIZE,
      addressU: ADDRESS_CLAMP_TO_EDGE,
      addressV: ADDRESS_CLAMP_TO_EDGE,
      minFilter: FILTER_LINEAR,
      magFilter: FILTER_LINEAR,
      mipmaps: true,
    });
    texture.setSource(canvas);

    return texture;
  }

  private _createMesh(): Mesh {
    const h = this.halfSize;
    const mesh = new Mesh(this.app.graphicsDevice);
    mesh.setPositions([-h, -h, 0, h, -h, 0, h, h, 0, -h, h, 0]);
    mesh.setNormals([0, 0, 1, 0, 0, 1, 0, 0, 1, 0, 0, 1]);
    mesh.setUvs(0, [0, 1, 1, 1, 1, 0, 0, 0]);
    mesh.setIndices([0, 1, 2, 0, 2, 3]);
    mesh.update();

    return mesh;
  }

  initialize() {
    this._texture = this._createTexture();

    const material = new StandardMaterial();
    material.useLighting = false;
    material.emissive = new Color(1, 1, 1);
    material.emissiveMap = this._texture;
    material.opacityMap = this._texture;
    material.opacityMapChannel = 'a';
    material.blendType = BLEND_NORMAL;
    material.depthTest = false;
    material.depthWrite = false;
    material.cull = CULLFACE_NONE;
    material.update();
    this._material = material;

    this._mesh = this._createMesh();
    const meshInstance = new MeshInstance(this._mesh, material);

    // Immediate layer draws after the World layer (where the splats render) so the button is never
    // composited behind them; depthTest:false keeps it on top within the layer.
    this.entity.addComponent('render', { meshInstances: [meshInstance], layers: [LAYERID_IMMEDIATE] });
    this.entity.setLocalPosition(this.offset.x, this.offset.y, this.offset.z);

    this.entity.enabled = !!this.app.xr?.active;
    this.app.xr?.on('start', this._onXrStart);
    this.app.xr?.on('end', this._onXrEnd);
  }

  destroy() {
    this.app.xr?.off('start', this._onXrStart);
    this.app.xr?.off('end', this._onXrEnd);
    if (this.entity.render) {
      this.entity.render.meshInstances = [];
    }
    this._mesh?.destroy();
    this._material?.destroy();
    this._texture?.destroy();
    this._mesh = undefined;
    this._material = undefined;
    this._texture = undefined;
  }
}
