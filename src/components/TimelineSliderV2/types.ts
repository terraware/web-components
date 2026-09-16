export type TimelineSliderV2Mark = {
  ariaLabel?: string;
  color: string;
  id: string;
  label?: string;
  value: number;
};

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

export type TimelineCluster = {
  anchorPx: number;
  id: string;
  members: PositionedMark[];
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
