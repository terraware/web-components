import {
  BAND_PADDING_PX,
  buildClusters,
  buildLayout,
  CLUSTER_DOT_SIZE_PX,
  DOT_SIZE_PX,
  EXPANDED_SPACING_PX,
  MAX_BAND_RATIO,
  normalizePositions,
  SQUEEZE_GAP_PX,
  toColorWeights,
  toConicGradient,
} from './layout';

describe('normalizePositions', () => {
  it('maps the value range across the container width', () => {
    const result = normalizePositions(
      [
        { color: '#f00', id: 'a', value: 0 },
        { color: '#0f0', id: 'b', value: 50 },
        { color: '#00f', id: 'c', value: 100 },
      ],
      200
    );

    expect(result).toEqual([
      { color: '#f00', id: 'a', positionPx: 0 },
      { color: '#0f0', id: 'b', positionPx: 100 },
      { color: '#00f', id: 'c', positionPx: 200 },
    ]);
  });

  it('sorts marks by position regardless of input order', () => {
    const result = normalizePositions(
      [
        { color: '#00f', id: 'c', value: 100 },
        { color: '#f00', id: 'a', value: 0 },
      ],
      100
    );

    expect(result.map((mark) => mark.id)).toEqual(['a', 'c']);
  });

  it('places every mark at the right edge when all values are identical', () => {
    const result = normalizePositions(
      [
        { color: '#f00', id: 'a', value: 7 },
        { color: '#0f0', id: 'b', value: 7 },
      ],
      300
    );

    expect(result.map((mark) => mark.positionPx)).toEqual([300, 300]);
  });

  it('places a lone mark at the right edge', () => {
    expect(normalizePositions([{ color: '#f00', id: 'only', value: 42 }], 250)).toEqual([
      { color: '#f00', id: 'only', positionPx: 250 },
    ]);
  });

  it('returns an empty array for no marks', () => {
    expect(normalizePositions([], 100)).toEqual([]);
  });
});

describe('toColorWeights', () => {
  it('groups repeated colors and sums their weights', () => {
    expect(toColorWeights(['#0f0', '#f90', '#0f0', '#0f0'])).toEqual([
      { color: '#0f0', weight: 3 },
      { color: '#f90', weight: 1 },
    ]);
  });

  it('preserves first-seen order', () => {
    expect(toColorWeights(['#f90', '#0f0'])).toEqual([
      { color: '#f90', weight: 1 },
      { color: '#0f0', weight: 1 },
    ]);
  });
});

describe('buildClusters', () => {
  const marks = [
    { color: '#f00', id: 'a', value: 0 },
    { color: '#0f0', id: 'b', value: 1 },
    { color: '#00f', id: 'c', value: 100 },
  ];

  it('merges marks closer together than the threshold', () => {
    const clusters = buildClusters(marks, 1000, 16);

    expect(clusters).toHaveLength(2);
    expect(clusters[0].members.map((member) => member.id)).toEqual(['a', 'b']);
    expect(clusters[1].members.map((member) => member.id)).toEqual(['c']);
  });

  const pair = [
    { color: '#f00', id: 'a', value: 0 },
    { color: '#0f0', id: 'b', value: 1 },
  ];

  it('keeps marks separate at exactly the threshold gap', () => {
    expect(buildClusters(pair, 16, 16)).toHaveLength(2);
  });

  it('merges marks just under the threshold gap', () => {
    expect(buildClusters(pair, 15, 16)).toHaveLength(1);
  });

  it('chains marks that are each close to the previous one', () => {
    const clusters = buildClusters(
      [
        { color: '#f00', id: 'a', value: 0 },
        { color: '#0f0', id: 'b', value: 10 },
        { color: '#00f', id: 'c', value: 20 },
      ],
      30,
      16
    );

    expect(clusters).toHaveLength(1);
    expect(clusters[0].members).toHaveLength(3);
  });

  it('anchors a cluster at the mean of its member positions', () => {
    const clusters = buildClusters(
      [
        { color: '#f00', id: 'a', value: 0 },
        { color: '#0f0', id: 'b', value: 10 },
      ],
      10,
      16
    );

    expect(clusters[0].anchorPx).toBe(5);
  });

  it('derives a stable id from the first member', () => {
    expect(buildClusters(marks, 1000, 16)[0].id).toBe('cluster-a');
  });

  it('returns no clusters for no marks', () => {
    expect(buildClusters([], 100, 16)).toEqual([]);
  });
});

describe('toConicGradient', () => {
  it('returns the bare color for a single weight', () => {
    expect(toConicGradient([{ color: '#0f0', weight: 1 }])).toBe('#0f0');
  });

  it('splits two equal weights into half turns each', () => {
    expect(
      toConicGradient([
        { color: '#0f0', weight: 1 },
        { color: '#f90', weight: 1 },
      ])
    ).toBe('conic-gradient(#0f0 0deg 180deg, #f90 180deg 360deg)');
  });

  it('sizes wedges proportionally to weight', () => {
    expect(
      toConicGradient([
        { color: '#0f0', weight: 3 },
        { color: '#f90', weight: 1 },
      ])
    ).toBe('conic-gradient(#0f0 0deg 270deg, #f90 270deg 360deg)');
  });
});

describe('buildLayout collapsed', () => {
  const marks = [
    { color: '#f00', id: 'a', value: 0 },
    { color: '#0f0', id: 'b', value: 1 },
    { color: '#00f', id: 'c', value: 100 },
  ];

  it('renders one node per cluster', () => {
    const layout = buildLayout({ containerWidth: 1000, marks, thresholdPx: 16 });

    expect(layout.nodes).toHaveLength(2);
    expect(layout.band).toBeUndefined();
  });

  it('sizes a multi-member node as a cluster dot and a lone node as a plain dot', () => {
    const layout = buildLayout({ containerWidth: 1000, marks, thresholdPx: 16 });

    expect(layout.nodes[0].sizePx).toBe(CLUSTER_DOT_SIZE_PX);
    expect(layout.nodes[1].sizePx).toBe(DOT_SIZE_PX);
  });

  it('exposes every member id on a cluster node', () => {
    const layout = buildLayout({ containerWidth: 1000, marks, thresholdPx: 16 });

    expect(layout.nodes[0].markIds).toEqual(['a', 'b']);
  });

  it('dims nothing when no cluster is expanded', () => {
    const layout = buildLayout({ containerWidth: 1000, marks, thresholdPx: 16 });

    expect(layout.nodes.every((node) => !node.dimmed)).toBe(true);
  });

  it('returns nothing for an unmeasured container', () => {
    expect(buildLayout({ containerWidth: 0, marks, thresholdPx: 16 })).toEqual({ nodes: [] });
  });

  it('returns nothing for no marks', () => {
    expect(buildLayout({ containerWidth: 500, marks: [], thresholdPx: 16 })).toEqual({ nodes: [] });
  });

  it('ignores an expanded id that matches no cluster', () => {
    const layout = buildLayout({ containerWidth: 1000, expandedClusterId: 'cluster-zzz', marks, thresholdPx: 16 });

    expect(layout.band).toBeUndefined();
  });

  it('ignores an expanded id that resolves to a single-member cluster', () => {
    const layout = buildLayout({ containerWidth: 1000, expandedClusterId: 'cluster-c', marks, thresholdPx: 16 });

    expect(layout.band).toBeUndefined();
  });

  it('falls back to the default threshold', () => {
    expect(buildLayout({ containerWidth: 1000, marks }).nodes).toHaveLength(2);
  });
});

describe('buildLayout expanded', () => {
  const dense = [
    { color: '#f00', id: 'a', value: 0 },
    { color: '#0f0', id: 'b', value: 500 },
    { color: '#00f', id: 'c', value: 505 },
    { color: '#ff0', id: 'd', value: 1000 },
  ];

  const expand = () =>
    buildLayout({ containerWidth: 1000, expandedClusterId: 'cluster-b', marks: dense, thresholdPx: 16 });

  it('replaces the cluster node with one node per member', () => {
    const layout = expand();
    const ids = layout.nodes.flatMap((node) => node.markIds);

    expect(ids).toEqual(['a', 'b', 'c', 'd']);
    expect(layout.nodes.filter((node) => node.markIds.length > 1)).toHaveLength(0);
  });

  it('reports the member count on the band', () => {
    expect(expand().band?.memberCount).toBe(2);
  });

  it('sizes the band from spacing, dot size, and padding', () => {
    expect(expand().band?.widthPx).toBe(EXPANDED_SPACING_PX + DOT_SIZE_PX + 2 * BAND_PADDING_PX);
  });

  it('keeps the band inside the container', () => {
    const layout = expand();

    expect(layout.band!.leftPx).toBeGreaterThanOrEqual(0);
    expect(layout.band!.leftPx + layout.band!.widthPx).toBeLessThanOrEqual(1000);
  });

  it('spaces members evenly inside the band', () => {
    const layout = expand();
    const members = layout.nodes.filter((node) => ['b', 'c'].includes(node.markIds[0]));

    expect(members[1].leftPx - members[0].leftPx).toBe(EXPANDED_SPACING_PX);
    expect(members[0].leftPx).toBe(layout.band!.leftPx + BAND_PADDING_PX + DOT_SIZE_PX / 2);
  });

  it('dims non-members and leaves members undimmed', () => {
    const layout = expand();

    expect(layout.nodes.filter((node) => node.dimmed).flatMap((node) => node.markIds)).toEqual(['a', 'd']);
  });

  it('pushes non-members clear of the band', () => {
    const layout = expand();
    const left = layout.nodes.find((node) => node.markIds[0] === 'a')!;
    const right = layout.nodes.find((node) => node.markIds[0] === 'd')!;

    expect(left.leftPx).toBeLessThanOrEqual(layout.band!.leftPx - SQUEEZE_GAP_PX);
    expect(right.leftPx).toBeGreaterThanOrEqual(layout.band!.leftPx + layout.band!.widthPx + SQUEEZE_GAP_PX);
  });

  it('preserves left-to-right order after squeezing', () => {
    const many = [
      { color: '#f00', id: 'a', value: 0 },
      { color: '#f00', id: 'a2', value: 200 },
      { color: '#0f0', id: 'b', value: 500 },
      { color: '#00f', id: 'c', value: 505 },
      { color: '#ff0', id: 'd', value: 800 },
      { color: '#ff0', id: 'd2', value: 1000 },
    ];
    const layout = buildLayout({
      containerWidth: 1000,
      expandedClusterId: 'cluster-b',
      marks: many,
      thresholdPx: 16,
    });
    const positions = layout.nodes.map((node) => node.leftPx);

    expect([...positions].sort((x, y) => x - y)).toEqual(positions);
  });

  it('rescales interior non-members proportionally into the remaining space', () => {
    const many = [
      { color: '#f00', id: 'a', value: 0 },
      { color: '#f00', id: 'a2', value: 200 },
      { color: '#0f0', id: 'b', value: 500 },
      { color: '#00f', id: 'c', value: 505 },
      { color: '#ff0', id: 'd', value: 800 },
      { color: '#ff0', id: 'd2', value: 1000 },
    ];
    const layout = buildLayout({
      containerWidth: 1000,
      expandedClusterId: 'cluster-b',
      marks: many,
      thresholdPx: 16,
    });
    const at = (markId: string) => layout.nodes.find((node) => node.markIds[0] === markId)!.leftPx;

    expect(at('a')).toBe(0);
    expect(at('a2')).toBeCloseTo(185.67, 1);
    expect(at('d')).toBeCloseTo(814.43, 1);
    expect(at('d2')).toBe(1000);
  });

  it('shrinks spacing so a large cluster still fits', () => {
    const crowded = [
      ...Array.from({ length: 15 }, (_, index) => ({ color: '#0f0', id: `m${index}`, value: 500 + index })),
      { color: '#00f', id: 'far', value: 5000 },
    ];
    const layout = buildLayout({
      containerWidth: 300,
      expandedClusterId: 'cluster-m0',
      marks: crowded,
      thresholdPx: 16,
    });
    const members = layout.nodes.filter((node) => node.markIds[0].startsWith('m'));
    const spacing = members[1].leftPx - members[0].leftPx;

    expect(spacing).toBeCloseTo(212 / 14, 5);
    expect(layout.band!.widthPx).toBe(MAX_BAND_RATIO * 300);
  });
});
