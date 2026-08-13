/** Backing disc radius as a fraction of the button's half-size. Matches the shader's pie radius. */
const DISC_RADIUS = 0.92;

/** Glyph arm reach and stroke width, as fractions of the drawn size. */
const GLYPH_ARM = 0.24;
const GLYPH_WIDTH = 0.09;

/**
 * Bakes the exit button's static artwork into a two-channel mask: red covers the backing disc, green
 * the X glyph. The shader composites the progress sweep between the two, which is what keeps the
 * glyph legible over the fill.
 *
 * The channels have to stay independent, so the glyph is drawn additively rather than over the disc,
 * and an opaque base goes down first. Uniform full alpha means the mask survives the texture upload
 * whether or not alpha ends up premultiplied, and antialiased edges keep their coverage.
 */
export const drawExitButtonMask = (ctx: CanvasRenderingContext2D, size: number) => {
  const c = size / 2;

  ctx.save();

  ctx.globalCompositeOperation = 'source-over';
  ctx.fillStyle = '#000000';
  ctx.fillRect(0, 0, size, size);

  ctx.globalCompositeOperation = 'lighter';

  ctx.fillStyle = '#ff0000';
  ctx.beginPath();
  ctx.arc(c, c, c * DISC_RADIUS, 0, Math.PI * 2);
  ctx.fill();

  const arm = size * GLYPH_ARM;
  ctx.strokeStyle = '#00ff00';
  ctx.lineWidth = size * GLYPH_WIDTH;
  ctx.lineCap = 'round';
  ctx.beginPath();
  ctx.moveTo(c - arm, c - arm);
  ctx.lineTo(c + arm, c + arm);
  ctx.moveTo(c + arm, c - arm);
  ctx.lineTo(c - arm, c + arm);
  ctx.stroke();

  ctx.restore();
};
