import {
  ADDRESS_CLAMP_TO_EDGE,
  BLEND_NORMAL,
  CULLFACE_NONE,
  Color,
  FILTER_LINEAR,
  LAYERID_IMMEDIATE,
  Mesh,
  MeshInstance,
  Quat,
  Script,
  StandardMaterial,
  Texture,
  Vec3,
  XrInputSource,
} from 'playcanvas';

import { wrapText } from './vr-annotation-panel-layout';
import { rayQuadHit } from './xr-ray-quad';

const CANVAS_WIDTH = 1024;
const CANVAS_HEIGHT = 768;

/** Panel width in world meters; height derived from the canvas aspect ratio. */
const PANEL_WIDTH = 0.5;
const PANEL_HEIGHT = (PANEL_WIDTH * CANVAS_HEIGHT) / CANVAS_WIDTH;

/** World-space offset from the anchored hotspot: raise the panel above it so the
 * (tall) panel clears the hotspot rather than covering it. */
const PANEL_OFFSET = new Vec3(0, PANEL_HEIGHT / 2 + 0.05, 0);

const PAD_X = 48;

/** Local +z (the quad's front face) — used to derive the panel's yaw toward the viewer. */
const FORWARD_Z = new Vec3(0, 0, 1);
/** Quad in-plane axes in local space, transformed to world for ray hit-testing. */
const RIGHT_AXIS = new Vec3(1, 0, 0);
const UP_AXIS = new Vec3(0, 1, 0);

const RAD_TO_DEG = 180 / Math.PI;

/** Fixed image band (canvas px) so arrows/dots keep a stable position while images load. */
const IMAGE_Y = 40;
const IMAGE_H = 360;

/** Width (canvas px) of the left/right arrow hit + draw zones over the image band. */
const ARROW_ZONE_W = 170;

export class VrAnnotationPanel extends Script {
  static scriptName = 'vrAnnotationPanel';

  // Props assigned by the React wrapper.
  title = '';
  label?: string;
  bodyText?: string;
  imageUrls?: string[];
  annotationIndex = -1;
  scaleFactor = 1;

  private _material?: StandardMaterial;
  private _texture?: Texture;
  private _mesh?: Mesh;
  private _canvas?: HTMLCanvasElement;
  private _drawnSignature: string | null = null;
  private _currentImage = 0;
  private _loadToken = 0;

  private _headRotation = new Quat();
  private _anchor = new Vec3();
  private _scratchDir = new Vec3();
  private _yawQuat = new Quat();
  private _axisRight = new Vec3();
  private _axisUp = new Vec3();
  private _scratchScale = new Vec3();

  private _onSelect = (inputSource: XrInputSource) => {
    if (this.app.xr?.active !== true) {
      return;
    }
    const images = this.imageUrls ?? [];
    if (images.length <= 1) {
      return;
    }
    const hit = this._rayQuadHit(inputSource.getOrigin(), inputSource.getDirection());
    if (!hit) {
      return;
    }
    const cx = ((hit.u + 1) / 2) * CANVAS_WIDTH;
    const cy = ((1 - hit.v) / 2) * CANVAS_HEIGHT;
    if (cy < IMAGE_Y || cy > IMAGE_Y + IMAGE_H) {
      return;
    }
    if (cx <= ARROW_ZONE_W) {
      this._setImage((this._currentImage - 1 + images.length) % images.length);
    } else if (cx >= CANVAS_WIDTH - ARROW_ZONE_W) {
      this._setImage((this._currentImage + 1) % images.length);
    }
  };

  initialize() {
    this._canvas = document.createElement('canvas');
    this._canvas.width = CANVAS_WIDTH;
    this._canvas.height = CANVAS_HEIGHT;

    this._texture = new Texture(this.app.graphicsDevice, {
      name: 'vr-annotation-panel',
      width: CANVAS_WIDTH,
      height: CANVAS_HEIGHT,
      addressU: ADDRESS_CLAMP_TO_EDGE,
      addressV: ADDRESS_CLAMP_TO_EDGE,
      minFilter: FILTER_LINEAR,
      magFilter: FILTER_LINEAR,
      mipmaps: true,
    });
    this._texture.setSource(this._canvas);

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
    this.entity.addComponent('render', { meshInstances: [meshInstance], layers: [LAYERID_IMMEDIATE] });

    this.app.xr?.input?.on('select', this._onSelect);
    // Script removal fires a 'destroy' event rather than calling a destroy() method, so the
    // teardown has to be registered as a listener or the handler and GPU resources outlive us.
    this.once('destroy', () => this._teardown());
  }

  private _createMesh(): Mesh {
    const hw = PANEL_WIDTH / 2;
    const hh = PANEL_HEIGHT / 2;
    const mesh = new Mesh(this.app.graphicsDevice);
    mesh.setPositions([-hw, -hh, 0, hw, -hh, 0, hw, hh, 0, -hw, hh, 0]);
    mesh.setNormals([0, 0, 1, 0, 0, 1, 0, 0, 1, 0, 0, 1]);
    mesh.setUvs(0, [0, 1, 1, 1, 1, 0, 0, 0]);
    mesh.setIndices([0, 1, 2, 0, 2, 3]);
    mesh.update();

    return mesh;
  }

  private _roundRect(ctx: CanvasRenderingContext2D, x: number, y: number, w: number, h: number, r: number) {
    ctx.beginPath();
    ctx.moveTo(x + r, y);
    ctx.arcTo(x + w, y, x + w, y + h, r);
    ctx.arcTo(x + w, y + h, x, y + h, r);
    ctx.arcTo(x, y + h, x, y, r);
    ctx.arcTo(x, y, x + w, y, r);
    ctx.closePath();
  }

  private _drawArrow(ctx: CanvasRenderingContext2D, cx: number, cy: number, pointsLeft: boolean) {
    ctx.beginPath();
    ctx.arc(cx, cy, 40, 0, Math.PI * 2);
    ctx.fillStyle = 'rgba(0, 0, 0, 0.45)';
    ctx.fill();

    const s = 16;
    const tip = pointsLeft ? cx - s * 0.6 : cx + s * 0.6;
    const base = pointsLeft ? cx + s * 0.6 : cx - s * 0.6;
    ctx.beginPath();
    ctx.moveTo(base, cy - s);
    ctx.lineTo(tip, cy);
    ctx.lineTo(base, cy + s);
    ctx.closePath();
    ctx.fillStyle = '#ffffff';
    ctx.fill();
  }

  private _drawDots(ctx: CanvasRenderingContext2D, count: number, dotY: number) {
    const gap = 26;
    const startX = CANVAS_WIDTH / 2 - ((count - 1) * gap) / 2;
    for (let i = 0; i < count; i++) {
      ctx.beginPath();
      ctx.arc(startX + i * gap, dotY, 7, 0, Math.PI * 2);
      ctx.fillStyle = i === this._currentImage ? 'rgba(0, 0, 0, 0.85)' : 'rgba(0, 0, 0, 0.25)';
      ctx.fill();
    }
  }

  private _drawContent(image?: HTMLImageElement) {
    const ctx = this._canvas?.getContext('2d');
    if (!ctx) {
      return;
    }
    ctx.clearRect(0, 0, CANVAS_WIDTH, CANVAS_HEIGHT);

    ctx.fillStyle = 'rgba(255, 255, 255, 0.96)';
    this._roundRect(ctx, 0, 0, CANVAS_WIDTH, CANVAS_HEIGHT, 32);
    ctx.fill();

    let y = IMAGE_Y;
    const contentWidth = CANVAS_WIDTH - PAD_X * 2;
    const images = this.imageUrls ?? [];

    if (images.length > 0) {
      ctx.save();
      this._roundRect(ctx, PAD_X, IMAGE_Y, contentWidth, IMAGE_H, 16);
      ctx.clip();
      if (image) {
        const scale = Math.max(contentWidth / image.width, IMAGE_H / image.height);
        const dw = image.width * scale;
        const dh = image.height * scale;
        ctx.drawImage(image, PAD_X + (contentWidth - dw) / 2, IMAGE_Y + (IMAGE_H - dh) / 2, dw, dh);
      } else {
        ctx.fillStyle = 'rgba(0, 0, 0, 0.06)';
        ctx.fillRect(PAD_X, IMAGE_Y, contentWidth, IMAGE_H);
      }
      ctx.restore();

      y = IMAGE_Y + IMAGE_H + 16;

      if (images.length > 1) {
        const bandCenterY = IMAGE_Y + IMAGE_H / 2;
        this._drawArrow(ctx, ARROW_ZONE_W / 2, bandCenterY, true);
        this._drawArrow(ctx, CANVAS_WIDTH - ARROW_ZONE_W / 2, bandCenterY, false);
        this._drawDots(ctx, images.length, y + 4);
        y += 32;
      }

      y += 16;
    }

    if (this.label) {
      ctx.font = '600 28px sans-serif';
      ctx.textBaseline = 'middle';
      const chipW = ctx.measureText(this.label).width + 32;
      const chipH = 44;
      ctx.fillStyle = 'rgba(44, 134, 88, 0.95)';
      this._roundRect(ctx, PAD_X, y, chipW, chipH, 12);
      ctx.fill();
      ctx.fillStyle = '#ffffff';
      ctx.fillText(this.label, PAD_X + 16, y + chipH / 2);
      y += chipH + 24;
    }

    ctx.textBaseline = 'top';
    ctx.fillStyle = '#000000';
    ctx.font = '700 48px sans-serif';
    const titleLines = wrapText(this.title, contentWidth, (s) => ctx.measureText(s).width);
    for (const line of titleLines) {
      if (y > CANVAS_HEIGHT - 40) {
        break;
      }
      ctx.fillText(line, PAD_X, y);
      y += 56;
    }
    y += 16;

    if (this.bodyText) {
      ctx.font = '400 32px sans-serif';
      ctx.fillStyle = 'rgba(0, 0, 0, 0.85)';
      const lines = wrapText(this.bodyText, contentWidth, (s) => ctx.measureText(s).width);
      for (const line of lines) {
        if (y > CANVAS_HEIGHT - 40) {
          break;
        }
        ctx.fillText(line, PAD_X, y);
        y += 40;
      }
    }

    this._texture?.upload();
  }

  private _setImage(index: number) {
    this._currentImage = index;
    this._drawContent();
    this._loadCurrentImage();
  }

  private _loadCurrentImage() {
    const url = this.imageUrls?.[this._currentImage];
    if (!url) {
      return;
    }
    const token = ++this._loadToken;
    const img = new Image();
    img.crossOrigin = 'anonymous';
    img.onload = () => {
      // Ignore a stale load that a newer navigation has superseded.
      if (token === this._loadToken) {
        this._drawContent(img);
      }
    };
    // onerror (e.g. a host without CORS headers): keep the placeholder + text already drawn.
    img.src = url;
  }

  private _rayQuadHit(origin: Vec3, direction: Vec3) {
    const rotation = this.entity.getRotation();
    rotation.transformVector(RIGHT_AXIS, this._axisRight);
    rotation.transformVector(UP_AXIS, this._axisUp);
    this.entity.getWorldTransform().getScale(this._scratchScale);
    const halfWidth = (PANEL_WIDTH / 2) * this._scratchScale.x;
    const halfHeight = (PANEL_HEIGHT / 2) * this._scratchScale.y;

    return rayQuadHit(
      origin,
      direction,
      this.entity.getPosition(),
      this._axisRight,
      this._axisUp,
      halfWidth,
      halfHeight
    );
  }

  /** True when the ray points at the panel quad (used to suppress the empty-select dismiss). */
  rayHitsPanel(origin: Vec3, direction: Vec3): boolean {
    return this._rayQuadHit(origin, direction) !== null;
  }

  update() {
    if (this.app.xr?.active !== true) {
      return;
    }

    const signature = `${this.title}|${this.label ?? ''}|${this.bodyText ?? ''}|${(this.imageUrls ?? []).join(',')}`;
    if (signature !== this._drawnSignature) {
      this._drawnSignature = signature;
      this._currentImage = 0;
      this._drawContent();
      this._loadCurrentImage();
    }

    this._trackHead();

    const anchor = this.app.root.findByName(`annotation-${this.annotationIndex}`);
    if (!anchor) {
      return;
    }
    this._anchor.copy(anchor.getPosition());
    // Panel size and its offset from the hotspot scale with the scene so the panel keeps its
    // proportions relative to the (content-root-scaled) annotations across scenes.
    this.entity.setLocalScale(this.scaleFactor, this.scaleFactor, this.scaleFactor);
    this.entity.setPosition(
      this._anchor.x + PANEL_OFFSET.x * this.scaleFactor,
      this._anchor.y + PANEL_OFFSET.y * this.scaleFactor,
      this._anchor.z + PANEL_OFFSET.z * this.scaleFactor
    );

    // Billboard on yaw only: face the viewer horizontally but stay upright and level, so
    // tilting/rolling the headset does not tilt the panel. Derived from the head's forward
    // heading, so it matches the level head-rotation orientation but with pitch/roll removed.
    this._headRotation.transformVector(FORWARD_Z, this._scratchDir);
    const yaw = Math.atan2(this._scratchDir.x, this._scratchDir.z) * RAD_TO_DEG;
    this._yawQuat.setFromEulerAngles(0, yaw, 0);
    this.entity.setRotation(this._yawQuat);
  }

  private _trackHead() {
    const views = this.app.xr?.views?.list;
    if (!views || views.length === 0) {
      return;
    }
    this._headRotation.setFromMat4(views[0].viewInvOffMat);
  }

  private _teardown() {
    this.app.xr?.input?.off('select', this._onSelect);
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
