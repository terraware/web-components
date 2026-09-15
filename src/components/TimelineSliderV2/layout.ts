export const DOT_SIZE_PX = 12;
export const CLUSTER_DOT_SIZE_PX = 18;
export const EXPANDED_SPACING_PX = 20;
export const MIN_EXPANDED_SPACING_PX = DOT_SIZE_PX + 2;
export const BAND_PADDING_PX = 8;
export const SQUEEZE_GAP_PX = 12;
export const MAX_BAND_RATIO = 0.8;
export const DEFAULT_CLUSTER_THRESHOLD_PX = 16;
export const DIMMED_OPACITY = 0.35;

export type LayoutMark = {
  color: string;
  id: string;
  value: number;
};

export type ColorWeight = {
  color: string;
  weight: number;
};

export type PositionedMark = {
  color: string;
  id: string;
  positionPx: number;
};

export const normalizePositions = (marks: LayoutMark[], containerWidth: number): PositionedMark[] => {
  if (marks.length === 0) {
    return [];
  }

  const values = marks.map((mark) => mark.value);
  const minValue = Math.min(...values);
  const maxValue = Math.max(...values);
  const range = maxValue - minValue;

  // Mirrors TimelineSlider's behavior: when every mark shares one value, they all land at the right edge.
  return marks
    .map((mark) => ({
      color: mark.color,
      id: mark.id,
      positionPx: (range === 0 ? 1 : (mark.value - minValue) / range) * containerWidth,
    }))
    .sort((a, b) => a.positionPx - b.positionPx);
};

export const toColorWeights = (colors: string[]): ColorWeight[] => {
  const weights = new Map<string, number>();

  colors.forEach((color) => {
    weights.set(color, (weights.get(color) ?? 0) + 1);
  });

  return [...weights.entries()].map(([color, weight]) => ({ color, weight }));
};
