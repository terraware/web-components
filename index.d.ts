import { KeyboardEventHandler } from "react";

declare module "web-components";

export interface Autocomplete {
  id: string;
  label: string;
  values: string[];
  onChange: (id: string, value: string) => void;
  selected: string | undefined;
}

export interface CancelButton {
  onClick: () => void;
  label?: string;
}

export interface Checkbox {
  id: string;
  name: string;
  label: React.ReactNode;
  value?: boolean | null;
  onChange: (id: string, value: boolean) => void;
  disabled?: boolean;
}

export interface DatePicker {
  id: string;
  label: React.ReactNode;
  value?: string | null;
  onChange: (id: string, value?: string) => void;
  "aria-label": string;
  onKeyPress?: KeyboardEventHandler;
  maxDate?: string;
  error?: boolean;
  helperText?: string;
  disabled?: boolean;
}

export interface DialogCloseButton {
  onClick: () => void;
}

export interface Divisor {
  mt?: number;
}

export type DropdownItem = {
  label: string;
  value: string;
};

export interface Dropdown {
  id: string;
  label: string;
  values?: DropdownItem[];
  onChange: (id: string, value: string) => void;
  selected: string | undefined;
  disabled?: boolean;
}

export interface Note {
  children: string;
}

export interface RadioButton {
  id: string;
  name: string;
  label: React.ReactNode;
  value?: boolean | null;
  onChange: (id: string, value: boolean) => void;
}

export interface SummaryBox {
  id?: string;
  title: string;
  value: number | string;
  variant?: "default" | "available" | "zero" | "full";
  icon?: boolean;
  onIconClick?: () => void;
}

export interface TextArea {
  id: string;
  value: unknown | null;
  onChange: (id: string, value: unknown) => void;
  type?: React.InputHTMLAttributes<unknown>["type"];
  label: React.ReactNode;
  disabled?: boolean;
  endAdornment?: JSX.Element;
  onKeyPress?: KeyboardEventHandler;
  min?: number;
  error?: boolean;
  helperText?: string;
  placeholder?: string;
  required?: boolean;
}

export interface TextField {
  id: string;
  value: unknown | null;
  onChange: (id: string, value: unknown) => void;
  type?: React.InputHTMLAttributes<unknown>["type"];
  label: React.ReactNode;
  disabled?: boolean;
  endAdornment?: JSX.Element;
  onKeyPress?: KeyboardEventHandler;
  min?: number;
  error?: boolean;
  helperText?: string;
  placeholder?: string;
  required?: boolean;
}

export interface Table<T> {
  id?: string;
  orderBy: string;
  order?: Order;
  columns: TableColumnType[];
  rows: T[];
  Renderer?: (props: RendererProps<T>) => JSX.Element;
  onSelect?: (value: T) => void;
  DetailsRenderer?: (props: DetailsRendererProps) => JSX.Element;
  sortComparator?: (a: T, b: T, orderBy: keyof T) => 1 | -1 | 0;
  sortHandler?: (order: Order, orderBy: string) => void;
  isInactive?: (row: T) => boolean;
  onReorderEnd?: ({ oldIndex, newIndex }: any) => void;
  isClickable?: (row: T) => boolean;
}

export type Order = "asc" | "desc";

export interface TableColumnType {
  key: string;
  name: string;
  type: "string" | "number" | "date" | "notes" | "edit" | "boolean";
}

export interface RendererProps<T> {
  index: number;
  row: T;
  column: TableColumnType;
  value?: string | number | unknown[];
  onRowClick?: () => void;
}

export type EnhancedTableDetailsRow = {
  [x: string]: string | number | [] | undefined;
};

export interface DetailsProps<T> {
  accessionId: string;
  index: number;
  expandText: string;
  rowName: string;
  defaultSort: string;
  columns: TableColumnType[];
  onClick: (parentValue: EnhancedTableDetailsRow) => void;
  onSelect: (
    value: EnhancedTableDetailsRow,
    parentValue: EnhancedTableDetailsRow
  ) => void;
  Renderer: (props: RendererProps<T>) => JSX.Element;
  row: EnhancedTableDetailsRow;
}

export interface DetailsRendererProps {
  index: number;
  row: EnhancedTableDetailsRow;
}
