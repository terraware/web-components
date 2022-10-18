export function descendingComparator<T>(a: T, b: T, orderBy: keyof T): number {
  // first attempt to parse into a numeric value and compare
  const numCompare = descendingNumComparator(a, b, orderBy);
  if (numCompare !== null) {
    return numCompare;
  }

  // if non-numeric, compare using the javascript built-in compare for this type
  const bValue = b[orderBy] ?? '';
  const aValue = a[orderBy] ?? '';

  if (bValue < aValue) {
    return -1;
  }
  if (bValue > aValue) {
    return 1;
  }

  return 0;
}

function descendingNumComparator<T>(a: T, b: T, orderBy: keyof T): number | null {
  const aNumValue = parseFloat((a[orderBy] ?? '0.0') as string);
  const bNumValue = parseFloat((b[orderBy] ?? '0.0') as string);
  if (!isNaN(aNumValue) && !isNaN(bNumValue)) {
    return bNumValue - aNumValue;
  }

  return null;
}

export type SortOrder = 'asc' | 'desc';

export function getComparator<Key extends keyof any>(
  order: SortOrder,
  orderBy: Key,
  sorting: (a: any, b: any, orderBy: any) => number
): (a: { [key in Key]?: string | number | [] }, b: { [key in Key]?: string | number | [] }) => number {
  return order === 'desc' ? (a, b) => sorting(a, b, orderBy) : (a, b) => -sorting(a, b, orderBy);
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
