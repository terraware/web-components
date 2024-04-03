import { ReactNode } from 'react';
import { TooltipProps } from '@mui/material';

export interface TableColumnType {
  key: string;
  name: string | JSX.Element;
  type: 'string' | 'number' | 'date' | 'notes' | 'edit' | 'boolean';
  className?: string;
  tooltipTitle?: TooltipProps['title'];
  alignment?: 'right' | 'left';
}

export interface RendererProps<T> {
  index: number;
  row: T;
  column: TableColumnType;
  value?: string | number | unknown[] | ReactNode;
  onRowClick?: (newValue?: string) => void;
  reloadData?: () => void;
  className?: string;
  booleanFalseText: string;
  booleanTrueText: string;
  editText: string;
}

export type EnhancedTableDetailsRow = {
  [x: string]: string | number | [] | undefined;
};

export interface DetailsRendererProps {
  index: number;
  row: EnhancedTableDetailsRow;
}

export interface Option {
  label: string | null;
  value: string | null;
  disabled: boolean;
}

type DatabaseColumnFilterType =
  | 'multiple_selection'
  | 'single_selection'
  | 'search'
  | 'date_range'
  | 'number_range'
  | 'count_weight'
  | 'hidden';

export interface DatabaseColumn extends Omit<TableColumnType, 'key'> {
  key: string;
  additionalKeys?: string[];
  filter?: { type: DatabaseColumnFilterType; options?: Option[] };
  searchType?: 'Exact' | 'ExactOrFuzzy' | 'Fuzzy';
  operation?: 'or' | 'and' | 'field' | 'not';
}
