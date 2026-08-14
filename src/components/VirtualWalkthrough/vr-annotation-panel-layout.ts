/**
 * Greedily wraps `text` into lines no wider than `maxWidth`, using `measure` to size
 * each candidate line. A single word wider than `maxWidth` still gets its own line.
 */
export const wrapText = (text: string, maxWidth: number, measure: (segment: string) => number): string[] => {
  const words = text.split(/\s+/).filter(Boolean);
  const lines: string[] = [];
  let current = '';

  words.forEach((word) => {
    const candidate = current ? `${current} ${word}` : word;
    if (!current || measure(candidate) <= maxWidth) {
      current = candidate;
    } else {
      lines.push(current);
      current = word;
    }
  });

  if (current) {
    lines.push(current);
  }

  return lines;
};

export const PANEL_CANVAS_WIDTH = 1024;
/** Tallest the panel can grow; also the canvas the content is painted into. */
export const PANEL_MAX_HEIGHT = 768;
/** Shortest the panel can shrink, so a bare title still reads as a panel rather than a sliver. */
export const PANEL_MIN_HEIGHT = 200;

export const PANEL_PAD_X = 48;
export const PANEL_PAD_Y = 40;

export const IMAGE_BAND_HEIGHT = 360;
const IMAGE_GAP = 16;
const DOTS_BLOCK_HEIGHT = 32;
const DOTS_CENTER_OFFSET = 4;

export const CHIP_HEIGHT = 44;
const CHIP_PAD_X = 16;
const CHIP_GAP = 24;

export const TITLE_LINE_HEIGHT = 56;
const TITLE_GAP = 16;
export const BODY_LINE_HEIGHT = 40;

export const PANEL_FONTS = {
  label: '600 28px sans-serif',
  title: '700 48px sans-serif',
  body: '400 32px sans-serif',
} as const;

export type PanelTextStyle = keyof typeof PANEL_FONTS;

export interface PanelLayoutInput {
  title: string;
  label?: string;
  bodyText?: string;
  imageCount: number;
  contentWidth: number;
  measure: (text: string, style: PanelTextStyle) => number;
}

export interface PanelLayout {
  /** Painted height of the panel, between the min and max bounds. */
  height: number;
  image: { y: number; height: number } | null;
  dotsY: number | null;
  chip: { y: number; width: number; height: number } | null;
  title: { y: number; lines: string[] };
  body: { y: number; lines: string[] };
}

/** Keeps the lines whose full line box fits above the bottom padding. */
const fitLines = (lines: string[], y: number, lineHeight: number): string[] => {
  const room = Math.max(0, Math.floor((PANEL_MAX_HEIGHT - PANEL_PAD_Y - y) / lineHeight));

  return lines.slice(0, room);
};

/**
 * Lays the panel's blocks out top-to-bottom and reports the height they need, so the quad
 * can be sized to the content instead of a fixed aspect. Content that cannot fit within
 * `PANEL_MAX_HEIGHT` is dropped and the panel is drawn at full height.
 */
export const layoutPanel = ({
  title,
  label,
  bodyText,
  imageCount,
  contentWidth,
  measure,
}: PanelLayoutInput): PanelLayout => {
  let y = PANEL_PAD_Y;

  const image = imageCount > 0 ? { y, height: IMAGE_BAND_HEIGHT } : null;
  let dotsY: number | null = null;
  if (image) {
    y += IMAGE_BAND_HEIGHT + IMAGE_GAP;
    if (imageCount > 1) {
      dotsY = y + DOTS_CENTER_OFFSET;
      y += DOTS_BLOCK_HEIGHT;
    }
    y += IMAGE_GAP;
  }

  const chip = label ? { y, width: measure(label, 'label') + CHIP_PAD_X * 2, height: CHIP_HEIGHT } : null;
  if (chip) {
    y += CHIP_HEIGHT + CHIP_GAP;
  }

  const titleLines = wrapText(title, contentWidth, (segment) => measure(segment, 'title'));
  const fittedTitle = fitLines(titleLines, y, TITLE_LINE_HEIGHT);
  const titleY = y;
  y += fittedTitle.length * TITLE_LINE_HEIGHT + TITLE_GAP;

  const bodyLines = bodyText ? wrapText(bodyText, contentWidth, (segment) => measure(segment, 'body')) : [];
  const fittedBody = fitLines(bodyLines, y, BODY_LINE_HEIGHT);
  const bodyY = y;
  y += fittedBody.length * BODY_LINE_HEIGHT;

  const truncated = fittedTitle.length < titleLines.length || fittedBody.length < bodyLines.length;
  const contentHeight = y + PANEL_PAD_Y;
  const height = truncated ? PANEL_MAX_HEIGHT : Math.max(PANEL_MIN_HEIGHT, Math.min(PANEL_MAX_HEIGHT, contentHeight));

  return {
    height,
    image,
    dotsY,
    chip,
    title: { y: titleY, lines: fittedTitle },
    body: { y: bodyY, lines: fittedBody },
  };
};
