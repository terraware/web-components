/** Sweep starts at 12 o'clock. */
const PIE_START_ANGLE = -Math.PI / 2;

/**
 * Draws a circular progress pie into the `size` x `size` region at the context origin: a faint
 * full-circle track under a wedge that sweeps clockwise as `progress` goes 0 -> 1. Neither clears the
 * context nor uploads a texture, so callers can composite it between their own layers.
 */
export const drawProgressPie = (ctx: CanvasRenderingContext2D, size: number, progress: number) => {
  const c = size / 2;
  const r = c * 0.92;

  ctx.beginPath();
  ctx.arc(c, c, r, 0, Math.PI * 2);
  ctx.fillStyle = 'rgba(255, 255, 255, 0.18)';
  ctx.fill();

  if (progress <= 0) {
    return;
  }

  ctx.beginPath();
  ctx.moveTo(c, c);
  ctx.arc(c, c, r, PIE_START_ANGLE, PIE_START_ANGLE + progress * Math.PI * 2);
  ctx.closePath();
  ctx.fillStyle = 'rgba(64, 200, 255, 0.85)';
  ctx.fill();
};
