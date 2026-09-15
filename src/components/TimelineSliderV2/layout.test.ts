import { normalizePositions, toColorWeights } from './layout';

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
