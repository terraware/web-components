import React from 'react';

import { act, fireEvent, render, screen, waitFor } from '@testing-library/react';

import EditableTable, { EditableTableCellContext, EditableTableColumn, EditableTableEditContext } from '.';

type Data = { name: string };

const deferred = () => {
  let resolve!: () => void;
  let reject!: (error: Error) => void;
  const promise = new Promise<void>((yes, no) => {
    resolve = yes;
    reject = no;
  });
  return { promise, resolve, reject };
};

const setup = (onSave: (row: Data, value: unknown, columnId: string) => Promise<void>) => {
  const columns: EditableTableColumn<Data>[] = [
    {
      id: 'name',
      header: 'Name',
      accessorKey: 'name',
      Cell: ({ cell }: EditableTableCellContext<Data>) => String(cell.getValue()),
      editConfig: {
        editVariant: 'custom',
        onSave,
        customEditComponent: ({ row, save, cancel, isSaving }: EditableTableEditContext<Data>) => (
          <div>
            <span>{`Editing ${row.original.name}: ${isSaving ? 'saving' : 'ready'}`}</span>
            <button onClick={() => void save('Updated')}>Save</button>
            <button onClick={cancel}>Cancel</button>
          </div>
        ),
      },
    },
  ];
  render(
    <EditableTable
      clearAllFiltersLabel='Clear'
      enableEditing
      columns={columns}
      data={[{ name: 'Alpha' }, { name: 'Beta' }]}
    />
  );
};

test('awaits saves, prevents duplicate submission and keeps failed edits open for retry', async () => {
  const failed = deferred();
  const successful = deferred();
  const onSave = rstest.fn().mockReturnValueOnce(failed.promise).mockReturnValueOnce(successful.promise);
  setup(onSave);
  fireEvent.doubleClick(screen.getByText('Alpha'));
  fireEvent.click(screen.getByText('Save'));
  fireEvent.click(screen.getByText('Save'));
  fireEvent.click(screen.getByText('Cancel'));
  expect(onSave).toHaveBeenCalledTimes(1);
  expect(onSave).toHaveBeenCalledWith({ name: 'Alpha' }, 'Updated', 'name');
  expect(screen.getByText('Editing Alpha: saving')).toBeInTheDocument();
  await act(async () => failed.reject(new Error('Failed')));
  expect(screen.getByText('Editing Alpha: ready')).toBeInTheDocument();
  fireEvent.click(screen.getByText('Save'));
  expect(screen.getByText('Editing Alpha: saving')).toBeInTheDocument();
  await act(async () => successful.resolve());
  await waitFor(() => expect(screen.queryByText('Save')).not.toBeInTheDocument());
  expect(onSave).toHaveBeenCalledTimes(2);
});

test('a stale save cannot close another cell editor, and cancel closes without saving', async () => {
  const pending = deferred();
  const onSave = rstest.fn().mockReturnValue(pending.promise);
  setup(onSave);
  fireEvent.doubleClick(screen.getByText('Alpha'));
  fireEvent.click(screen.getByText('Save'));
  fireEvent.doubleClick(screen.getByText('Beta'));
  expect(screen.getByText('Editing Beta: ready')).toBeInTheDocument();
  await act(async () => pending.resolve());
  expect(screen.getByText('Editing Beta: ready')).toBeInTheDocument();
  fireEvent.click(screen.getByText('Cancel'));
  expect(screen.queryByText('Save')).not.toBeInTheDocument();
  expect(onSave).toHaveBeenCalledTimes(1);
});
