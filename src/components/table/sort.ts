export function descendingComparator<T>(
  a: T,
  b: T,
  orderBy: keyof T | string,
  order: SortOrder,
  splitDots?: boolean
): number {
  const getValue = (obj: any, path: string) => {
    if (splitDots) {
      const parts = path.split('.');
      return parts.reduce((acc, part) => acc && acc[part], obj);
    }
    return obj[path];
  };

  const aValue = getValue(a, orderBy as string) ?? '';
  const bValue = getValue(b, orderBy as string) ?? '';

  const numCompareResult = descendingNumComparator(aValue, bValue);
  if (numCompareResult !== null) {
    return order === 'desc' ? numCompareResult : -numCompareResult;
  }

  // blank values at the end always (any order)
  if (isEmptyValue(aValue.toString()) && isEmptyValue(bValue.toString())) {
    return 0;
  }

  if (isEmptyValue(aValue.toString())) {
    return 1;
  }

  if (isEmptyValue(bValue.toString())) {
    return -1;
  }

  if (bValue < aValue) {
    return order === 'desc' ? -1 : 1;
  }
  if (bValue > aValue) {
    return order === 'desc' ? 1 : -1;
  }

  return 0;
}

function isEmptyValue(value?: string): boolean {
  if (value === '' || value === null || value?.toString().trim() === '' || value === undefined) {
    return true;
  } else {
    return false;
  }
}

function descendingNumComparator<T>(a: T, b: T): number | null {
  const aNumValue = Number(a);
  const bNumValue = Number(b);

  if (!isNaN(aNumValue) && !isNaN(bNumValue)) {
    return bNumValue - aNumValue;
  }

  return null;
}

export type SortOrder = 'asc' | 'desc';

export function getComparator<Key extends keyof any>(
  order: SortOrder,
  orderBy: Key,
  splitDots: boolean,
  sorting: (a: any, b: any, orderBy: any, order: SortOrder, splitDots?: boolean) => number
): (a: { [key in Key]?: string | number | [] }, b: { [key in Key]?: string | number | [] }) => number {
  return (a, b) => sorting(a, b, orderBy, order, splitDots);
}

export function stableSort<T>(array: T[], comparator: (a: T, b: T) => number): T[] {
  const stabilizedThis = array.map((el, index) => [el, index] as [T, number]);
  stabilizedThis.sort((a, b) => {
    const order = comparator(a[0], b[0]);
    if (order !== 0) {
      return order;
    }

    return a[1] - b[1];
  });

  return stabilizedThis.map((el) => el[0]);
}
