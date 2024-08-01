export function descendingComparator<T>(a: T, b: T, orderBy: keyof T, order: SortOrder): number {
  // first attempt to parse into a numeric value and compare
  const numCompare = descendingNumComparator(a, b, orderBy);
  if (numCompare !== null) {
    if (numCompare === 0) {
      return numCompare;
    } else {
      return order === 'desc' ? numCompare * -1 : numCompare;
    }
  }

  // if non-numeric, compare using the javascript built-in compare for this type
  const bValue = b[orderBy] ?? '';
  const aValue = a[orderBy] ?? '';

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

function descendingNumComparator<T>(a: T, b: T, orderBy: keyof T): number | null {
  const aNumValue = Number((a[orderBy] ?? '0.0') as string);
  const bNumValue = Number((b[orderBy] ?? '0.0') as string);

  if (!isNaN(aNumValue) && !isNaN(bNumValue)) {
    return bNumValue - aNumValue;
  }

  return null;
}

export type SortOrder = 'asc' | 'desc';

export function getComparator<Key extends keyof any>(
  order: SortOrder,
  orderBy: Key,
  sorting: (a: any, b: any, orderBy: any, order: SortOrder) => number
): (a: { [key in Key]?: string | number | [] }, b: { [key in Key]?: string | number | [] }) => number {
  return (a, b) => sorting(a, b, orderBy, order);
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
