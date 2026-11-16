import { useEffect, useRef, useState } from 'react';

import { MRT_Cell, MRT_TableInstance } from 'material-react-table';

import type { ColumnEditConfig } from '.';

type Props<TData extends Record<string, any>> = {
  cell: MRT_Cell<TData>;
  table: MRT_TableInstance<TData>;
  config: ColumnEditConfig<TData>;
};

const CustomCellEditor = <TData extends Record<string, any>>({ cell, table, config }: Props<TData>) => {
  const [isSaving, setIsSaving] = useState(false);
  const finished = useRef(false);
  const mounted = useRef(true);
  useEffect(() => {
    mounted.current = true;
    return () => {
      mounted.current = false;
    };
  }, []);

  const isCurrent = () => mounted.current && table.getState().editingCell?.id === cell.id;
  const cancel = () => {
    if (!finished.current && isCurrent()) {
      finished.current = true;
      table.setEditingCell(null);
    }
  };
  const save = async (value: unknown) => {
    if (finished.current || !isCurrent()) {
      return;
    }
    finished.current = true;
    setIsSaving(true);
    try {
      await config.onSave?.(cell.row.original, value, cell.column.id);
      if (isCurrent()) {
        table.setEditingCell(null);
      }
    } catch {
      finished.current = false;
    } finally {
      if (mounted.current) {
        setIsSaving(false);
      }
    }
  };

  return (
    config.customEditComponent?.({
      cell,
      row: cell.row,
      column: cell.column,
      table,
      save,
      cancel,
      isSaving,
    }) ?? null
  );
};

export default CustomCellEditor;
