import { buildClusters, normalizePositions, toColorWeights, toConicGradient } from './layout';

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
