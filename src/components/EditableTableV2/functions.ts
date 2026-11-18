import { rankItem, rankings } from '@tanstack/match-sorter-utils';
import { constructFilterFn, filterFns, sortFns } from '@tanstack/react-table';

export const namedFilterFns = {
  ...filterFns,
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
