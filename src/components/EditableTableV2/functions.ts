import { rankItem, rankings } from '@tanstack/match-sorter-utils';
import {
  constructFilterFn,
  filterFn_greaterThanOrEqualTo,
  filterFn_lessThan,
  filterFn_lessThanOrEqualTo,
  filterFns,
  sortFns,
} from '@tanstack/react-table';

type ComparisonValue = string | number | null | undefined;

const compare = (value: ComparisonValue, bound: ComparisonValue) => {
  const numericValue = Number(value);
  const numericBound = Number(bound);
  const [left, right] =
    !Number.isNaN(numericValue) && !Number.isNaN(numericBound)
      ? [numericValue, numericBound]
      : [
          String(value ?? '')
            .toLowerCase()
            .trim(),
          String(bound ?? '')
            .toLowerCase()
            .trim(),
        ];

  return left > right ? 1 : left < right ? -1 : 0;
};

const isOpen = (bound: unknown) => bound === '' || bound === undefined || bound === null;

const between = (value: ComparisonValue, bounds: unknown, inclusive: boolean) => {
  const [min, max] = Array.isArray(bounds) ? bounds : [];
  const reversed = !isOpen(min) && !isOpen(max) && Number(min) > Number(max);

  return (
    (isOpen(min) || (inclusive ? compare(value, min) >= 0 : compare(value, min) > 0)) &&
    (isOpen(max) || reversed || (inclusive ? compare(value, max) <= 0 : compare(value, max) < 0))
  );
};

export const namedFilterFns = {
  ...filterFns,
  between: constructFilterFn({
    ...filterFns.between,
    filter: (value, bounds) => between(value, bounds, false),
  }),
  betweenInclusive: constructFilterFn({
    ...filterFns.betweenInclusive,
    filter: (value, bounds) => between(value, bounds, true),
  }),
  greaterThanOrEqualTo: constructFilterFn({
    ...filterFn_greaterThanOrEqualTo,
    filter: (value, bound) => compare(value, bound) >= 0,
  }),
  lessThan: constructFilterFn({
    ...filterFn_lessThan,
    filter: (value, bound) => compare(value, bound) < 0,
  }),
  lessThanOrEqualTo: constructFilterFn({
    ...filterFn_lessThanOrEqualTo,
    filter: (value, bound) => compare(value, bound) <= 0,
  }),
  fuzzy: constructFilterFn({
    filter: (value, filterValue, _row, _columnId, addMeta) => {
      const rank = rankItem(value, String(filterValue), { threshold: rankings.MATCHES });
      addMeta?.(rank);

      return rank.passed;
    },
    autoRemove: (value) => !value,
  }),
};

export const namedSortFns = sortFns;
