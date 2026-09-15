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

export type TimelineCluster = {
  anchorPx: number;
  id: string;
  members: PositionedMark[];
};

export const buildClusters = (
  marks: LayoutMark[],
  containerWidth: number,
  thresholdPx: number
): TimelineCluster[] => {
  const positioned = normalizePositions(marks, containerWidth);
  const clusters: TimelineCluster[] = [];
  let current: PositionedMark[] = [];

  const flush = () => {
    if (current.length === 0) {
      return;
    }

    const total = current.reduce((sum, member) => sum + member.positionPx, 0);

    clusters.push({
      anchorPx: total / current.length,
      id: `cluster-${current[0].id}`,
      members: current,
    });

    current = [];
  };

  positioned.forEach((mark) => {
    const previous = current[current.length - 1];

    if (previous !== undefined && mark.positionPx - previous.positionPx >= thresholdPx) {
      flush();
    }

    current.push(mark);
  });

  flush();

  return clusters;
};

export const toConicGradient = (colorWeights: ColorWeight[]): string => {
  if (colorWeights.length === 1) {
    return colorWeights[0].color;
  }

  const total = colorWeights.reduce((sum, { weight }) => sum + weight, 0);
  let consumed = 0;

  const stops = colorWeights.map(({ color, weight }) => {
    const startDeg = (consumed / total) * 360;
    consumed += weight;
    const endDeg = (consumed / total) * 360;

    return `${color} ${startDeg}deg ${endDeg}deg`;
  });

  return `conic-gradient(${stops.join(', ')})`;
};

export type TimelineNode = {
  colorWeights: ColorWeight[];
  dimmed: boolean;
  id: string;
  leftPx: number;
  markIds: string[];
  sizePx: number;
};

export type ExpandedBand = {
  leftPx: number;
  memberCount: number;
  widthPx: number;
};

export type TimelineLayout = {
  band?: ExpandedBand;
  nodes: TimelineNode[];
};

export type BuildLayoutParams = {
  containerWidth: number;
  expandedClusterId?: string;
  marks: LayoutMark[];
  thresholdPx?: number;
};

const toCollapsedNode = (cluster: TimelineCluster, dimmed: boolean): TimelineNode => ({
  colorWeights: toColorWeights(cluster.members.map((member) => member.color)),
  dimmed,
  id: cluster.id,
  leftPx: cluster.anchorPx,
  markIds: cluster.members.map((member) => member.id),
  sizePx: cluster.members.length > 1 ? CLUSTER_DOT_SIZE_PX : DOT_SIZE_PX,
});

const clamp = (value: number, min: number, max: number): number => Math.min(Math.max(value, min), max);

const expandedSpacing = (memberCount: number, containerWidth: number): number => {
  if (memberCount <= 1) {
    return EXPANDED_SPACING_PX;
  }

  const available = containerWidth * MAX_BAND_RATIO - DOT_SIZE_PX - 2 * BAND_PADDING_PX;
  const fitted = available / (memberCount - 1);

  return Math.max(MIN_EXPANDED_SPACING_PX, Math.min(EXPANDED_SPACING_PX, fitted));
};

const rescale = (value: number, fromStart: number, fromEnd: number, toStart: number, toEnd: number): number => {
  const fromSpan = fromEnd - fromStart;

  if (fromSpan <= 0) {
    return toStart;
  }

  return toStart + ((value - fromStart) / fromSpan) * (toEnd - toStart);
};

export const buildLayout = ({
  containerWidth,
  expandedClusterId,
  marks,
  thresholdPx = DEFAULT_CLUSTER_THRESHOLD_PX,
}: BuildLayoutParams): TimelineLayout => {
  if (containerWidth <= 0 || marks.length === 0) {
    return { nodes: [] };
  }

  const clusters = buildClusters(marks, containerWidth, thresholdPx);
  const expanded = clusters.find((cluster) => cluster.id === expandedClusterId && cluster.members.length > 1);

  if (expanded === undefined) {
    return { nodes: clusters.map((cluster) => toCollapsedNode(cluster, false)) };
  }

  const spacing = expandedSpacing(expanded.members.length, containerWidth);
  const widthPx = (expanded.members.length - 1) * spacing + DOT_SIZE_PX + 2 * BAND_PADDING_PX;
  const leftPx = clamp(expanded.anchorPx - widthPx / 2, 0, Math.max(0, containerWidth - widthPx));
  const band = { leftPx, memberCount: expanded.members.length, widthPx };

  const leftLimit = Math.max(0, leftPx - SQUEEZE_GAP_PX);
  const rightLimit = Math.min(containerWidth, leftPx + widthPx + SQUEEZE_GAP_PX);

  const nodes = clusters.flatMap((cluster): TimelineNode[] => {
    if (cluster.id === expanded.id) {
      return cluster.members.map((member, index) => ({
        colorWeights: [{ color: member.color, weight: 1 }],
        dimmed: false,
        id: member.id,
        leftPx: leftPx + BAND_PADDING_PX + DOT_SIZE_PX / 2 + index * spacing,
        markIds: [member.id],
        sizePx: DOT_SIZE_PX,
      }));
    }

    const collapsed = toCollapsedNode(cluster, true);
    const squeezed =
      cluster.anchorPx < expanded.anchorPx
        ? rescale(cluster.anchorPx, 0, expanded.anchorPx, 0, leftLimit)
        : rescale(cluster.anchorPx, expanded.anchorPx, containerWidth, rightLimit, containerWidth);

    return [{ ...collapsed, leftPx: squeezed }];
  });

  return { band, nodes };
};
