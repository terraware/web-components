import { filterFns } from '@tanstack/react-table';

import { namedFilterFns } from './functions';

test('compares numeric column values with string range endpoints', () => {
  const row = (value: unknown) => ({ getValue: () => value }) as unknown as Parameters<typeof namedFilterFns.between>[0];
  const values = [2, 3, 5];
  expect(values.filter((value) => namedFilterFns.between(row(value), 'count', ['2', '5']))).toEqual([3]);
  expect(values.filter((value) => namedFilterFns.betweenInclusive(row(value), 'count', ['2', '5']))).toEqual(values);

  for (const name of ['between', 'betweenInclusive'] as const) {
    expect(namedFilterFns[name](row(3), 'count', [null, '5'])).toBe(true);
    expect(namedFilterFns[name](row(3), 'count', ['2', undefined])).toBe(true);
    expect(namedFilterFns[name](row(3), 'count', ['', null])).toBe(true);
    expect(namedFilterFns[name](row(6), 'count', ['5', '2'])).toBe(true);
    expect(namedFilterFns[name](row(' Bee '), 'count', ['ant', 'cat'])).toBe(true);
    expect(namedFilterFns[name].autoRemove).toBe(filterFns[name].autoRemove);
  }
  expect(namedFilterFns.greaterThanOrEqualTo(row(5), 'count', '5')).toBe(true);
  expect(namedFilterFns.lessThan(row(5), 'count', '5')).toBe(false);
  expect(namedFilterFns.lessThanOrEqualTo(row(5), 'count', '5')).toBe(true);
});
