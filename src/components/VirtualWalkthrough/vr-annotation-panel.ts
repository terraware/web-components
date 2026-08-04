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
} from 'playcanvas';

import { wrapText } from './vr-annotation-panel-layout';

const CANVAS_WIDTH = 1024;
const CANVAS_HEIGHT = 768;

/** Panel width in world meters; height derived from the canvas aspect ratio. */
const PANEL_WIDTH = 0.5;
const PANEL_HEIGHT = (PANEL_WIDTH * CANVAS_HEIGHT) / CANVAS_WIDTH;

/** World-space offset from the anchored hotspot: raise the panel above it. */
const PANEL_OFFSET = new Vec3(0, 0.25, 0);

const PAD_X = 48;

export class VrAnnotationPanel extends Script {
  static scriptName = 'vrAnnotationPanel';

  // Props assigned by the React wrapper.
  title = '';
  label?: string;
  bodyText?: string;
  imageUrls?: string[];
  annotationIndex = -1;

  private _material?: StandardMaterial;
  private _texture?: Texture;
  private _mesh?: Mesh;
  private _canvas?: HTMLCanvasElement;
  private _drawnSignature: string | null = null;

  private _headRotation = new Quat();
  private _anchor = new Vec3();

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

  private _drawContent(image?: HTMLImageElement) {
    const ctx = this._canvas?.getContext('2d');
    if (!ctx) {
      return;
    }
    ctx.clearRect(0, 0, CANVAS_WIDTH, CANVAS_HEIGHT);

    ctx.fillStyle = 'rgba(20, 20, 20, 0.92)';
    this._roundRect(ctx, 0, 0, CANVAS_WIDTH, CANVAS_HEIGHT, 32);
    ctx.fill();

    let y = 40;
    const contentWidth = CANVAS_WIDTH - PAD_X * 2;

    if (image) {
      const imgH = 360;
      const scale = Math.max(contentWidth / image.width, imgH / image.height);
      const dw = image.width * scale;
      const dh = image.height * scale;
      ctx.save();
      this._roundRect(ctx, PAD_X, y, contentWidth, imgH, 16);
      ctx.clip();
      ctx.drawImage(image, PAD_X + (contentWidth - dw) / 2, y + (imgH - dh) / 2, dw, dh);
      ctx.restore();
      y += imgH + 32;
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
    ctx.fillStyle = '#ffffff';
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
      ctx.fillStyle = 'rgba(255, 255, 255, 0.85)';
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

  private _loadFirstImage() {
    const url = this.imageUrls?.[0];
    if (!url) {
      return;
    }
    const img = new Image();
    img.crossOrigin = 'anonymous';
    img.onload = () => this._drawContent(img);
    // onerror (e.g. a host without CORS headers): keep the text-only panel already drawn.
    img.src = url;
  }

  update() {
    if (this.app.xr?.active !== true) {
      return;
    }

    const signature = `${this.title}|${this.label ?? ''}|${this.bodyText ?? ''}|${(this.imageUrls ?? []).join(',')}`;
    if (signature !== this._drawnSignature) {
      this._drawnSignature = signature;
      this._drawContent();
      this._loadFirstImage();
    }

    this._trackHead();

    const anchor = this.app.root.findByName(`annotation-${this.annotationIndex}`);
    if (!anchor) {
      return;
    }
    this._anchor.copy(anchor.getPosition());
    this.entity.setPosition(
      this._anchor.x + PANEL_OFFSET.x,
      this._anchor.y + PANEL_OFFSET.y,
      this._anchor.z + PANEL_OFFSET.z
    );
    this.entity.setRotation(this._headRotation);
  }

  private _trackHead() {
    const views = this.app.xr?.views?.list;
    if (!views || views.length === 0) {
      return;
    }
    this._headRotation.setFromMat4(views[0].viewInvOffMat);
  }

  destroy() {
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
