export type EditableTableCellContext<TData extends object> = {
  cell: { getValue: () => unknown };
  row: { original: TData };
  column: { id: string };
};

export type EditableTableEditContext<TData extends object> = EditableTableCellContext<TData> & {
  save: (value: unknown) => Promise<void>;
  cancel: () => void;
  isSaving: boolean;
};
