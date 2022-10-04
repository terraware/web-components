import { ReactNode } from 'react';

export interface TableColumnType {
  key: string;
  name: string | JSX.Element;
  type: 'string' | 'number' | 'date' | 'notes' | 'edit' | 'boolean';
  className?: string;
}

export interface RendererProps<T> {
  index: number;
  row: T;
  column: TableColumnType;
  value?: string | number | unknown[] | ReactNode;
  onRowClick?: () => void;
  reloadData?: () => void;
  className?: string;
}

export type EnhancedTableDetailsRow = {
  [x: string]: string | number | [] | undefined;
};

export interface DetailsRendererProps {
  index: number;
  row: EnhancedTableDetailsRow;
}
