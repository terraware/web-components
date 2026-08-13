/** Sweep starts at 12 o'clock. */
const PIE_START_ANGLE = -Math.PI / 2;

/**
 * Progress to hand the pie shader, where 0 draws nothing at all: an untouched target wears no faint
 * track, and a completed one has already opened its annotation or ended the session.
 *
 * Visibility rides on this value so the quad can stay enabled for the whole session. A mesh
 * instance compiles its shader variant the first time it is drawn, and that compile has to land
 * somewhere other than the frame a pie first appears.
 */
export const pieShaderProgress = (progress: number): number => (progress > 0 && progress < 1 ? progress : 0);

/**
 * Draws a circular progress pie into the `size` x `size` region at the context origin: a faint
 * full-circle track under a wedge that sweeps clockwise as `progress` goes 0 -> 1. A `progress`
 * above 1 simply sweeps a full circle. Neither clears the context nor uploads a texture, so callers
 * can composite it between their own layers. Saves and restores the drawing state it touches and
 * leaves the path clean on exit, so callers can stroke or fill right after without an explicit
 * `beginPath()` of their own.
 */
export const drawProgressPie = (ctx: CanvasRenderingContext2D, size: number, progress: number) => {
  const c = size / 2;
  const r = c * 0.92;

  ctx.save();

  ctx.beginPath();
  ctx.arc(c, c, r, 0, Math.PI * 2);
  ctx.fillStyle = 'rgba(255, 255, 255, 0.18)';
  ctx.fill();

  if (progress > 0) {
    ctx.beginPath();
    ctx.moveTo(c, c);
    ctx.arc(c, c, r, PIE_START_ANGLE, PIE_START_ANGLE + progress * Math.PI * 2);
    ctx.closePath();
    ctx.fillStyle = 'rgba(64, 200, 255, 0.85)';
    ctx.fill();
  }

  ctx.restore();
  ctx.beginPath();
};
