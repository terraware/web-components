import React, { useState } from 'react';

import { fireEvent, render, screen, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';

import EditableTableV2 from '.';

test('keeps stable-ID custom editors mounted when parent drafts rebuild nested row data', async () => {
  const onSave = rs.fn();
  const user = userEvent.setup();
  const Example = () => {
    const [draft, setDraft] = useState('');
    return (
      <EditableTableV2
        clearAllFiltersLabel='Clear'
        enableEditing
        data={[{ id: 'stable', name: 'Alpha', nested: { draft } }]}
        tableOptions={{ getRowId: (row) => row.id }}
        columns={[
          {
            id: 'name',
            header: 'Name',
            accessorKey: 'name',
            editConfig: {
              editVariant: 'custom',
              onSave,
              customEditComponent: ({ save }) => (
                <>
                  <input aria-label='Draft' value={draft} onChange={(event) => setDraft(event.target.value)} />
                  <button onClick={() => void save(draft)}>Save draft</button>
                </>
              ),
            },
          },
        ]}
      />
    );
  };
  render(<Example />);
  fireEvent.doubleClick(screen.getByText('Alpha'));
  const input = screen.getByRole('textbox', { name: 'Draft' });
  await user.type(input, 'Beta');
  expect(screen.getByRole('textbox', { name: 'Draft' })).toBe(input);
  expect(input).toHaveFocus();
  await user.type(input, ' tree');
  expect(input).toHaveValue('Beta tree');
  expect(screen.getByRole('textbox', { name: 'Draft' })).toBe(input);
  await user.click(screen.getByRole('button', { name: 'Save draft' }));
  await waitFor(() =>
    expect(onSave).toHaveBeenCalledWith(
      { id: 'stable', name: 'Alpha', nested: { draft: 'Beta tree' } },
      'Beta tree',
      'name'
    )
  );
});

test('keeps custom editor inputs mounted and saves values equal to the display value', async () => {
  const onSave = rs.fn().mockRejectedValueOnce(new Error('failed')).mockResolvedValue(undefined);
  const Example = () => {
    const [value, setValue] = useState('');
    return (
      <EditableTableV2
        clearAllFiltersLabel='Clear'
        enableEditing
        data={[{ name: 'Alpha' }]}
        columns={[
          {
            id: 'name',
            header: 'Name',
            accessorKey: 'name',
            editConfig: {
              editVariant: 'custom',
              onSave,
              customEditComponent: ({ save, isSaving }) => (
                <>
                  <input aria-label='Edit' value={value} onChange={(event) => setValue(event.target.value)} />
                  <button disabled={isSaving} onClick={() => void save(value)}>
                    Save
                  </button>
                </>
              ),
            },
          },
        ]}
      />
    );
  };
  render(<Example />);
  fireEvent.doubleClick(screen.getByText('Alpha'));
  const input = screen.getByRole('textbox', { name: 'Edit' });
  await userEvent.click(input);
  await userEvent.type(input, 'Alpha');
  expect(screen.getByRole('textbox', { name: 'Edit' })).toBe(input);
  expect(input).toHaveFocus();
  expect(input).toHaveValue('Alpha');
  fireEvent.click(screen.getByRole('button', { name: 'Save' }));
  await waitFor(() => expect(screen.getByRole('button', { name: 'Save' })).toBeEnabled());
  expect(input).toHaveValue('Alpha');
  fireEvent.click(screen.getByRole('button', { name: 'Save' }));
  await waitFor(() => expect(screen.queryByRole('textbox', { name: 'Edit' })).not.toBeInTheDocument());
  expect(onSave).toHaveBeenCalledTimes(2);
  expect(onSave).toHaveBeenLastCalledWith({ name: 'Alpha' }, 'Alpha', 'name');
});
