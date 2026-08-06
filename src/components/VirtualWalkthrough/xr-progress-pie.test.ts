import { drawProgressPie } from './xr-progress-pie';

const TRACK_FILL = 'rgba(255, 255, 255, 0.18)';
const WEDGE_FILL = 'rgba(64, 200, 255, 0.85)';

/** Minimal 2D-context stand-in that records the arcs drawn and the fill colour used for each. */
const stubContext = () => {
  const arcs: { radius: number; start: number; end: number }[] = [];
  const fills: string[] = [];
  const ctx = {
    fillStyle: '',
    save: () => undefined,
    restore: () => undefined,
    beginPath: () => undefined,
    moveTo: () => undefined,
    closePath: () => undefined,
    arc: (_x: number, _y: number, radius: number, start: number, end: number) => {
      arcs.push({ radius, start, end });
    },
    fill: () => {
      fills.push(ctx.fillStyle);
    },
  };

  return { ctx: ctx as unknown as CanvasRenderingContext2D, arcs, fills };
};

describe('drawProgressPie', () => {
  it('draws only the full-circle track at zero progress', () => {
    const { ctx, arcs, fills } = stubContext();
    drawProgressPie(ctx, 128, 0);

    expect(arcs).toHaveLength(1);
    expect(arcs[0].end - arcs[0].start).toBeCloseTo(Math.PI * 2);
    expect(fills).toEqual([TRACK_FILL]);
  });

  it('sweeps a quarter turn clockwise from the top at quarter progress', () => {
    const { ctx, arcs } = stubContext();
    drawProgressPie(ctx, 128, 0.25);

    expect(arcs).toHaveLength(2);
    expect(arcs[1].start).toBeCloseTo(-Math.PI / 2);
    expect(arcs[1].end).toBeCloseTo(0);
  });

  it('sweeps a full turn at full progress', () => {
    const { ctx, arcs } = stubContext();
    drawProgressPie(ctx, 128, 1);

    expect(arcs[1].end - arcs[1].start).toBeCloseTo(Math.PI * 2);
  });

  it('fills the wedge over the track', () => {
    const { ctx, fills } = stubContext();
    drawProgressPie(ctx, 128, 0.5);

    expect(fills).toEqual([TRACK_FILL, WEDGE_FILL]);
  });

  it('scales the radius to the drawn size', () => {
    const { ctx, arcs } = stubContext();
    drawProgressPie(ctx, 256, 0);

    expect(arcs[0].radius).toBeCloseTo(128 * 0.92);
  });
});
