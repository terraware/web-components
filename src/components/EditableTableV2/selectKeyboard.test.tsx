import React from 'react';

import { fireEvent, render, screen, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';

import EditableTableV2 from '.';

test('opens a select with Enter, chooses with the keyboard, and saves the chosen value on blur', async () => {
  const user = userEvent.setup();
  const onSave = rs.fn().mockResolvedValue(undefined);
  render(
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
            editVariant: 'select',
            onSave,
            selectOptions: [
              { label: 'Alpha', value: 'Alpha' },
              { label: 'Oak', value: 'Oak' },
            ],
          },
        },
      ]}
    />
  );
  fireEvent.doubleClick(screen.getByText('Alpha'));
  const select = screen.getByRole('combobox', { name: 'Name' });
  expect(select).toHaveFocus();
  await user.keyboard('{Enter}');
  expect(await screen.findByRole('listbox')).toBeInTheDocument();
  expect(onSave).not.toHaveBeenCalled();
  await user.keyboard('{ArrowDown}{Enter}');
  await waitFor(() => expect(screen.queryByRole('listbox')).not.toBeInTheDocument());
  expect(select).toHaveTextContent('Oak');
  expect(onSave).not.toHaveBeenCalled();
  await user.tab();
  await waitFor(() => expect(onSave).toHaveBeenCalledWith({ name: 'Alpha' }, 'Oak', 'name'));
  expect(onSave).toHaveBeenCalledTimes(1);
  await waitFor(() => expect(screen.queryByRole('combobox', { name: 'Name' })).not.toBeInTheDocument());
});
