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

import {
  BODY_LINE_HEIGHT,
  PANEL_CANVAS_WIDTH,
  PANEL_FONTS,
  PANEL_MAX_HEIGHT,
  PANEL_PAD_X,
  type PanelLayout,
  TITLE_LINE_HEIGHT,
  layoutPanel,
} from './vr-annotation-panel-layout';
import { nextScrollY, readScrollAxis } from './vr-annotation-scroll';
import { rayQuadHit } from './xr-ray-quad';

const PANEL_WIDTH = 7.5;

/** Gap (m) between the top of the hotspot and the bottom edge of the panel. */
const PANEL_GAP = 0.75;

const PX_TO_M = PANEL_WIDTH / PANEL_CANVAS_WIDTH;

/** Local +z faces the viewer, so the overlay quads sit just in front of the chrome quad. Their
 * draw order would otherwise depend on how the transparent sort breaks a tie between coplanar
 * quads, all of which have depth testing off. */
const TEXT_Z = 0.001;
const THUMB_Z = 0.002;

const SCROLLBAR_WIDTH = 10;
const SCROLLBAR_INSET = 18;
const SCROLLBAR_MIN_HEIGHT = 48;

/** Local +z (the quad's front face) — used to derive the panel's yaw toward the viewer. */
const FORWARD_Z = new Vec3(0, 0, 1);
/** Quad in-plane axes in local space, transformed to world for ray hit-testing. */
const RIGHT_AXIS = new Vec3(1, 0, 0);
const UP_AXIS = new Vec3(0, 1, 0);

const RAD_TO_DEG = 180 / Math.PI;

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

  private _chromeMaterial?: StandardMaterial;
  private _chromeTexture?: Texture;
  private _chromeMesh?: Mesh;
  private _chromeCanvas?: HTMLCanvasElement;

  private _textMaterial?: StandardMaterial;
  private _textTexture?: Texture;
  private _textMesh?: Mesh;
  private _textCanvas?: HTMLCanvasElement;
  private _textInstance?: MeshInstance;

  private _thumbMaterial?: StandardMaterial;
  private _thumbMesh?: Mesh;
  private _thumbInstance?: MeshInstance;

  private _drawnSignature: string | null = null;
  private _currentImage = 0;
  private _loadToken = 0;
  private _loadedImage?: HTMLImageElement;
  private _layout?: PanelLayout;
  private _scrollY = 0;
  private _maxScroll = 0;
  /** Height (canvas px) the chrome occupies; the rest of its canvas is unused. */
  private _canvasHeight = PANEL_MAX_HEIGHT;
  private _panelHeight = PANEL_MAX_HEIGHT * PX_TO_M;

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
    const band = this._layout?.image;
    if (images.length <= 1 || !band) {
      return;
    }
    const hit = this._rayQuadHit(inputSource.getOrigin(), inputSource.getDirection());
    if (!hit) {
      return;
    }
    const cx = ((hit.u + 1) / 2) * PANEL_CANVAS_WIDTH;
    // The image sits on the chrome quad, which doesn't scroll, so this needs no scroll offset.
    const cy = ((1 - hit.v) / 2) * this._canvasHeight;
    if (cy < band.y || cy > band.y + band.height) {
      return;
    }
    if (cx <= ARROW_ZONE_W) {
      this._setImage((this._currentImage - 1 + images.length) % images.length);
    } else if (cx >= PANEL_CANVAS_WIDTH - ARROW_ZONE_W) {
      this._setImage((this._currentImage + 1) % images.length);
    }
  };

  initialize() {
    this._chromeCanvas = document.createElement('canvas');
    this._chromeCanvas.width = PANEL_CANVAS_WIDTH;
    this._chromeCanvas.height = PANEL_MAX_HEIGHT;
    this._chromeTexture = this._createTexture('vr-annotation-panel', this._chromeCanvas);
    this._chromeMaterial = this._createTexturedMaterial(this._chromeTexture);
    this._chromeMesh = this._createQuadMesh();

    // Sized once the first layout runs; until then it has nothing to show.
    this._textMesh = this._createQuadMesh();
    this._textMaterial = new StandardMaterial();
    this._textInstance = new MeshInstance(this._textMesh, this._textMaterial);
    this._textInstance.visible = false;

    this._thumbMaterial = new StandardMaterial();
    this._thumbMaterial.useLighting = false;
    this._thumbMaterial.emissive = new Color(0, 0, 0);
    this._thumbMaterial.opacity = 0.3;
    this._thumbMaterial.blendType = BLEND_NORMAL;
    this._thumbMaterial.depthTest = false;
    this._thumbMaterial.depthWrite = false;
    this._thumbMaterial.cull = CULLFACE_NONE;
    this._thumbMaterial.update();
    this._thumbMesh = this._createQuadMesh();
    this._thumbInstance = new MeshInstance(this._thumbMesh, this._thumbMaterial);
    this._thumbInstance.visible = false;

    this.entity.addComponent('render', {
      meshInstances: [
        new MeshInstance(this._chromeMesh, this._chromeMaterial),
        this._textInstance,
        this._thumbInstance,
      ],
      layers: [LAYERID_IMMEDIATE],
    });

    this.app.xr?.input?.on('select', this._onSelect);
    // Script removal fires a 'destroy' event rather than calling a destroy() method, so the
    // teardown has to be registered as a listener or the handler and GPU resources outlive us.
    this.once('destroy', () => this._teardown());
  }

  private _createTexture(name: string, source: HTMLCanvasElement): Texture {
    const texture = new Texture(this.app.graphicsDevice, {
      name,
      width: source.width,
      height: source.height,
      addressU: ADDRESS_CLAMP_TO_EDGE,
      addressV: ADDRESS_CLAMP_TO_EDGE,
      minFilter: FILTER_LINEAR,
      magFilter: FILTER_LINEAR,
      mipmaps: true,
    });
    texture.setSource(source);

    return texture;
  }

  private _createTexturedMaterial(texture: Texture): StandardMaterial {
    const material = new StandardMaterial();
    material.useLighting = false;
    material.emissive = new Color(1, 1, 1);
    material.emissiveMap = texture;
    material.opacityMap = texture;
    material.opacityMapChannel = 'a';
    material.blendType = BLEND_NORMAL;
    material.depthTest = false;
    material.depthWrite = false;
    material.cull = CULLFACE_NONE;
    material.update();

    return material;
  }

  private _createQuadMesh(): Mesh {
    const mesh = new Mesh(this.app.graphicsDevice);
    mesh.setNormals([0, 0, 1, 0, 0, 1, 0, 0, 1, 0, 0, 1]);
    mesh.setIndices([0, 1, 2, 0, 2, 3]);
    this._writeQuad(mesh, -PANEL_WIDTH / 2, PANEL_WIDTH / 2, 0, 0, 0, 0, 1);

    return mesh;
  }

  /** Rewrites the quad's four corners and the slice of its texture they map to. */
  private _writeQuad(
    mesh: Mesh,
    left: number,
    right: number,
    top: number,
    bottom: number,
    z: number,
    vTop: number,
    vBottom: number
  ) {
    mesh.setPositions([left, bottom, z, right, bottom, z, right, top, z, left, top, z]);
    mesh.setUvs(0, [0, vBottom, 1, vBottom, 1, vTop, 0, vTop]);
    mesh.update();
  }

  /** Converts a y in panel canvas coordinates to the entity's local space. */
  private _localY(canvasY: number): number {
    return this._panelHeight / 2 - canvasY * PX_TO_M;
  }

  private _writeChromeQuad() {
    if (!this._chromeMesh) {
      return;
    }
    const hw = PANEL_WIDTH / 2;
    const hh = this._panelHeight / 2;
    this._writeQuad(this._chromeMesh, -hw, hw, hh, -hh, 0, 0, this._canvasHeight / PANEL_MAX_HEIGHT);
  }

  /** Maps the visible window of the (much taller) text texture onto the body quad. */
  private _writeTextQuad() {
    const body = this._layout?.body;
    if (!this._textMesh || !this._textInstance || !body || body.contentHeight === 0) {
      return;
    }
    this._writeQuad(
      this._textMesh,
      -PANEL_WIDTH / 2,
      PANEL_WIDTH / 2,
      this._localY(body.y),
      this._localY(body.y + body.viewportHeight),
      TEXT_Z,
      this._scrollY / body.contentHeight,
      (this._scrollY + body.viewportHeight) / body.contentHeight
    );
  }

  private _writeThumbQuad() {
    const body = this._layout?.body;
    if (!this._thumbMesh || !body?.scrollable) {
      return;
    }
    // The minimum keeps the thumb grabbable on very long text, but never past the track itself.
    const height = Math.min(
      body.viewportHeight,
      Math.max(SCROLLBAR_MIN_HEIGHT, (body.viewportHeight * body.viewportHeight) / body.contentHeight)
    );
    const travel = body.viewportHeight - height;
    const top = body.y + (this._maxScroll > 0 ? (this._scrollY / this._maxScroll) * travel : 0);
    const right = PANEL_CANVAS_WIDTH - SCROLLBAR_INSET;

    this._writeQuad(
      this._thumbMesh,
      (right - SCROLLBAR_WIDTH) * PX_TO_M - PANEL_WIDTH / 2,
      right * PX_TO_M - PANEL_WIDTH / 2,
      this._localY(top),
      this._localY(top + height),
      THUMB_Z,
      0,
      1
    );
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
    const startX = PANEL_CANVAS_WIDTH / 2 - ((count - 1) * gap) / 2;
    for (let i = 0; i < count; i++) {
      ctx.beginPath();
      ctx.arc(startX + i * gap, dotY, 7, 0, Math.PI * 2);
      ctx.fillStyle = i === this._currentImage ? 'rgba(0, 0, 0, 0.85)' : 'rgba(0, 0, 0, 0.25)';
      ctx.fill();
    }
  }

  /** Re-measures the content, resizes the panel, and repaints both canvases. */
  private _rebuild() {
    const ctx = this._chromeCanvas?.getContext('2d');
    if (!ctx) {
      return;
    }

    const images = this.imageUrls ?? [];
    this._layout = layoutPanel({
      title: this.title,
      label: this.label,
      bodyText: this.bodyText,
      imageCount: images.length,
      contentWidth: PANEL_CANVAS_WIDTH - PANEL_PAD_X * 2,
      measure: (text, style) => {
        ctx.font = PANEL_FONTS[style];

        return ctx.measureText(text).width;
      },
    });

    const { body } = this._layout;
    this._maxScroll = body.contentHeight - body.viewportHeight;
    this._canvasHeight = this._layout.height;
    this._panelHeight = this._layout.height * PX_TO_M;

    this._drawChrome();
    this._drawText();

    this._writeChromeQuad();
    this._writeTextQuad();
    this._writeThumbQuad();
    if (this._textInstance) {
      this._textInstance.visible = body.contentHeight > 0;
    }
    if (this._thumbInstance) {
      this._thumbInstance.visible = body.scrollable;
    }
  }

  private _drawChrome() {
    const ctx = this._chromeCanvas?.getContext('2d');
    const layout = this._layout;
    if (!ctx || !layout) {
      return;
    }

    const contentWidth = PANEL_CANVAS_WIDTH - PANEL_PAD_X * 2;
    const images = this.imageUrls ?? [];

    ctx.clearRect(0, 0, PANEL_CANVAS_WIDTH, PANEL_MAX_HEIGHT);

    ctx.fillStyle = 'rgba(255, 255, 255, 0.96)';
    this._roundRect(ctx, 0, 0, PANEL_CANVAS_WIDTH, layout.height, 32);
    ctx.fill();

    if (layout.image) {
      const { y: bandY, height: bandH } = layout.image;
      ctx.save();
      this._roundRect(ctx, PANEL_PAD_X, bandY, contentWidth, bandH, 16);
      ctx.clip();
      const image = this._loadedImage;
      if (image) {
        const scale = Math.max(contentWidth / image.width, bandH / image.height);
        const dw = image.width * scale;
        const dh = image.height * scale;
        ctx.drawImage(image, PANEL_PAD_X + (contentWidth - dw) / 2, bandY + (bandH - dh) / 2, dw, dh);
      } else {
        ctx.fillStyle = 'rgba(0, 0, 0, 0.06)';
        ctx.fillRect(PANEL_PAD_X, bandY, contentWidth, bandH);
      }
      ctx.restore();

      if (layout.dotsY !== null) {
        const bandCenterY = bandY + bandH / 2;
        this._drawArrow(ctx, ARROW_ZONE_W / 2, bandCenterY, true);
        this._drawArrow(ctx, PANEL_CANVAS_WIDTH - ARROW_ZONE_W / 2, bandCenterY, false);
        this._drawDots(ctx, images.length, layout.dotsY);
      }
    }

    if (layout.chip && this.label) {
      ctx.font = PANEL_FONTS.label;
      ctx.textBaseline = 'middle';
      ctx.fillStyle = 'rgba(44, 134, 88, 0.95)';
      this._roundRect(ctx, PANEL_PAD_X, layout.chip.y, layout.chip.width, layout.chip.height, 12);
      ctx.fill();
      ctx.fillStyle = '#ffffff';
      ctx.fillText(this.label, PANEL_PAD_X + 16, layout.chip.y + layout.chip.height / 2);
    }

    ctx.textBaseline = 'top';
    ctx.fillStyle = '#000000';
    ctx.font = PANEL_FONTS.title;
    layout.title.lines.forEach((line, index) => {
      ctx.fillText(line, PANEL_PAD_X, layout.title.y + index * TITLE_LINE_HEIGHT);
    });

    if (layout.body.scrollable) {
      ctx.fillStyle = 'rgba(0, 0, 0, 0.08)';
      const trackX = PANEL_CANVAS_WIDTH - SCROLLBAR_INSET - SCROLLBAR_WIDTH;
      this._roundRect(ctx, trackX, layout.body.y, SCROLLBAR_WIDTH, layout.body.viewportHeight, SCROLLBAR_WIDTH / 2);
      ctx.fill();
    }

    this._chromeTexture?.upload();
  }

  /**
   * Paints every body line onto its own canvas, tall enough to hold all of them. Scrolling then
   * only moves the quad's UV window over this texture, so no repaint or upload happens per frame.
   */
  private _drawText() {
    const body = this._layout?.body;
    if (!body) {
      return;
    }

    const height = Math.max(1, body.contentHeight);
    if (!this._textCanvas || this._textCanvas.height !== height) {
      this._textCanvas = document.createElement('canvas');
      this._textCanvas.width = PANEL_CANVAS_WIDTH;
      this._textCanvas.height = height;
      this._textTexture?.destroy();
      this._textTexture = this._createTexture('vr-annotation-panel-text', this._textCanvas);
      this._textMaterial?.destroy();
      this._textMaterial = this._createTexturedMaterial(this._textTexture);
      if (this._textInstance) {
        this._textInstance.material = this._textMaterial;
      }
    }

    const ctx = this._textCanvas.getContext('2d');
    if (!ctx) {
      return;
    }
    ctx.clearRect(0, 0, PANEL_CANVAS_WIDTH, height);
    ctx.textBaseline = 'top';
    ctx.font = PANEL_FONTS.body;
    ctx.fillStyle = 'rgba(0, 0, 0, 0.85)';
    body.lines.forEach((line, index) => {
      ctx.fillText(line, PANEL_PAD_X, index * BODY_LINE_HEIGHT);
    });

    this._textTexture?.upload();
  }

  private _setImage(index: number) {
    this._currentImage = index;
    this._loadedImage = undefined;
    this._drawChrome();
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
        this._loadedImage = img;
        this._drawChrome();
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
    const halfHeight = (this._panelHeight / 2) * this._scratchScale.y;

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

  update(dt: number) {
    if (this.app.xr?.active !== true) {
      return;
    }

    const signature = `${this.title}|${this.label ?? ''}|${this.bodyText ?? ''}|${(this.imageUrls ?? []).join(',')}`;
    if (signature !== this._drawnSignature) {
      this._drawnSignature = signature;
      this._currentImage = 0;
      this._scrollY = 0;
      this._loadedImage = undefined;
      this._rebuild();
      this._loadCurrentImage();
    }

    this._scroll(dt);
    this._trackHead();

    const anchor = this.app.root.findByName(`annotation-${this.annotationIndex}`);
    if (!anchor) {
      return;
    }
    this._anchor.copy(anchor.getPosition());
    this.entity.setPosition(this._anchor.x, this._anchor.y + this._panelHeight / 2 + PANEL_GAP, this._anchor.z);

    // Billboard on yaw only: face the viewer horizontally but stay upright and level, so
    // tilting/rolling the headset does not tilt the panel. Derived from the head's forward
    // heading, so it matches the level head-rotation orientation but with pitch/roll removed.
    this._headRotation.transformVector(FORWARD_Z, this._scratchDir);
    const yaw = Math.atan2(this._scratchDir.x, this._scratchDir.z) * RAD_TO_DEG;
    this._yawQuat.setFromEulerAngles(0, yaw, 0);
    this.entity.setRotation(this._yawQuat);
  }

  private _scroll(dt: number) {
    if (this._maxScroll <= 0) {
      return;
    }

    let axis = 0;
    for (const inputSource of this.app.xr?.input?.inputSources ?? []) {
      const sourceAxis = readScrollAxis(inputSource);
      if (Math.abs(sourceAxis) > Math.abs(axis)) {
        axis = sourceAxis;
      }
    }

    const scrollY = nextScrollY(this._scrollY, axis, dt, this._maxScroll);
    if (scrollY === this._scrollY) {
      return;
    }
    this._scrollY = scrollY;
    this._writeTextQuad();
    this._writeThumbQuad();
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
    this._chromeMesh?.destroy();
    this._textMesh?.destroy();
    this._thumbMesh?.destroy();
    this._chromeMaterial?.destroy();
    this._textMaterial?.destroy();
    this._thumbMaterial?.destroy();
    this._chromeTexture?.destroy();
    this._textTexture?.destroy();
    this._chromeMesh = undefined;
    this._textMesh = undefined;
    this._thumbMesh = undefined;
    this._chromeMaterial = undefined;
    this._textMaterial = undefined;
    this._thumbMaterial = undefined;
    this._chromeTexture = undefined;
    this._textTexture = undefined;
  }
}
