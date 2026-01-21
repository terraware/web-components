import { CSSProperties, type JSX, ReactNode } from 'react';

import { SxProps, TooltipProps } from '@mui/material';

import { TextAlignment } from '.';

export interface TableColumnType {
  key: string;
  name: string | JSX.Element;
  type: 'string' | 'number' | 'date' | 'notes' | 'edit' | 'boolean';
  className?: string;
  tooltipTitle?: TooltipProps['title'];
  alignment?: TextAlignment;
  sx?: SxProps;
}

export interface RendererProps<T> {
  index: number;
  row: T;
  column: TableColumnType;
  value?: string | number | unknown[] | ReactNode;
  onRowClick?: (newValue?: string) => void;
  reloadData?: () => void;
  className?: string;
  style?: CSSProperties;
  booleanFalseText: string;
  booleanTrueText: string;
  editText: string;
  sx?: SxProps;
  title?: string;
  component?: 'span' | 'p' | 'div';
}

export type EnhancedTableDetailsRow = {
  [x: string]: string | number | [] | undefined;
};

export type TableDensityType = 'comfortable' | 'compact' | 'roomy';

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
