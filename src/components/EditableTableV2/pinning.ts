import { Column, ColumnPinningState, Updater, functionalUpdate } from '@tanstack/react-table';

import { EditableTableColumnPinningV2, EditableTableInstanceV2, editableTableFeatures } from './types';

export const toInternalPinning = (pinning: EditableTableColumnPinningV2): ColumnPinningState => ({
  start: pinning.left ?? [],
  end: pinning.right ?? [],
});

export const toPublicPinning = (pinning: ColumnPinningState): EditableTableColumnPinningV2 => ({
  left: pinning.start,
  right: pinning.end,
});

export const getColumnPinningV2 = <TData extends object>(
  table: EditableTableInstanceV2<TData>
): EditableTableColumnPinningV2 => toPublicPinning(table.store.get().columnPinning);

export const setColumnPinningV2 = <TData extends object>(
  table: EditableTableInstanceV2<TData>,
  updater: Updater<EditableTableColumnPinningV2>
): void =>
  table.setColumnPinning((previous) => toInternalPinning(functionalUpdate(updater, toPublicPinning(previous))));

export const getColumnPinPositionV2 = <TData extends object>(
  column: Column<typeof editableTableFeatures, TData>
): 'left' | 'right' | false => {
  const position = column.getIsPinned();

  return position === 'start' ? 'left' : position === 'end' ? 'right' : false;
};
