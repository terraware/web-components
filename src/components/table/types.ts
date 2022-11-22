import { ReactNode } from 'react';
import { TooltipProps } from '@mui/material';

export interface TableColumnType {
  key: string;
  name: string | JSX.Element;
  type: 'string' | 'number' | 'date' | 'notes' | 'edit' | 'boolean';
  className?: string;
  tooltipTitle?: TooltipProps['title'];
}

export interface RendererProps<T> {
  index: number;
  row: T;
  column: TableColumnType;
  value?: string | number | unknown[] | ReactNode;
  onRowClick?: (newValue?: string) => void;
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
