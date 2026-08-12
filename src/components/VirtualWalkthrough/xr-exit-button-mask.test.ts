import { drawExitButtonMask } from './xr-exit-button-mask';

/** Minimal 2D-context stand-in recording the draw calls and the state each was made under. */
const stubContext = () => {
  const fills: { style: string; composite: string }[] = [];
  const rects: { width: number; height: number; style: string }[] = [];
  const arcs: { radius: number; style: string }[] = [];
  const strokes: { style: string; width: number; composite: string }[] = [];
  const lines: { x: number; y: number }[] = [];

  const ctx = {
    fillStyle: '',
    strokeStyle: '',
    lineWidth: 0,
    lineCap: '',
    globalCompositeOperation: 'source-over',
    save: () => undefined,
    restore: () => undefined,
    beginPath: () => undefined,
    closePath: () => undefined,
    moveTo: (x: number, y: number) => {
      lines.push({ x, y });
    },
    lineTo: (x: number, y: number) => {
      lines.push({ x, y });
    },
    fillRect: (_x: number, _y: number, width: number, height: number) => {
      rects.push({ width, height, style: ctx.fillStyle });
    },
    arc: (_x: number, _y: number, radius: number) => {
      arcs.push({ radius, style: ctx.fillStyle });
    },
    fill: () => {
      fills.push({ style: ctx.fillStyle, composite: ctx.globalCompositeOperation });
    },
    stroke: () => {
      strokes.push({ style: ctx.strokeStyle, width: ctx.lineWidth, composite: ctx.globalCompositeOperation });
    },
  };

  return { ctx: ctx as unknown as CanvasRenderingContext2D, fills, rects, arcs, strokes, lines };
};

describe('drawExitButtonMask', () => {
  it('lays an opaque base over the whole canvas so every texel carries full alpha', () => {
    const { ctx, rects } = stubContext();
    drawExitButtonMask(ctx, 256);

    expect(rects).toHaveLength(1);
    expect(rects[0]).toMatchObject({ width: 256, height: 256, style: '#000000' });
  });

  it('masks the backing disc into the red channel', () => {
    const { ctx, arcs } = stubContext();
    drawExitButtonMask(ctx, 256);

    expect(arcs).toHaveLength(1);
    expect(arcs[0].style).toBe('#ff0000');
    expect(arcs[0].radius).toBeCloseTo(128 * 0.92);
  });

  it('masks the glyph into the green channel', () => {
    const { ctx, strokes } = stubContext();
    drawExitButtonMask(ctx, 256);

    expect(strokes).toHaveLength(1);
    expect(strokes[0].style).toBe('#00ff00');
  });

  it('draws both masks additively so the glyph does not erase the disc where they overlap', () => {
    const { ctx, fills, strokes } = stubContext();
    drawExitButtonMask(ctx, 256);

    expect(fills.at(-1)?.composite).toBe('lighter');
    expect(strokes[0].composite).toBe('lighter');
  });

  it('scales the glyph arms and stroke width to the drawn size', () => {
    const { ctx, strokes, lines } = stubContext();
    drawExitButtonMask(ctx, 256);

    expect(strokes[0].width).toBeCloseTo(256 * 0.09);
    expect(lines).toHaveLength(4);
    expect(lines[0]).toEqual({ x: 128 - 256 * 0.24, y: 128 - 256 * 0.24 });
  });
});
