import React from 'react';

import { render, screen, waitFor, within } from '@testing-library/react';
import userEvent from '@testing-library/user-event';

import EditableTableV2 from '.';

test('Escape cancels a keyboard manager drag before closing the menu', async () => {
  const user = userEvent.setup();
  render(
    <EditableTableV2
      clearAllFiltersLabel='Clear'
      showColumnsButton
      enableColumnOrdering
      columns={[
        { id: 'name', header: 'Name', accessorKey: 'name' },
        { id: 'count', header: 'Count', accessorKey: 'count' },
      ]}
      data={[{ name: 'Alpha', count: 1 }]}
    />
  );
  await user.click(screen.getByRole('button', { name: 'Columns' }));
  const menu = screen.getByRole('menu');
  within(menu)
    .getAllByRole('menuitem')
    .forEach((item) => {
      item.scrollIntoView = rs.fn();
    });
  const handle = within(menu).getByLabelText('Drag column: Name');
  handle.focus();
  await user.keyboard('[Space]');
  expect(screen.getByTestId('column-drag-overlay')).toBeInTheDocument();
  await user.keyboard('[Escape]');
  await waitFor(() => expect(screen.queryByTestId('column-drag-overlay')).not.toBeInTheDocument());
  expect(menu).toBeVisible();
  expect(handle).not.toHaveAttribute('aria-pressed', 'true');
  expect(screen.getAllByRole('columnheader', { hidden: true })[0]).toHaveTextContent('Name');
  await user.keyboard('[Escape]');
  await waitFor(() => expect(screen.queryByRole('menu')).not.toBeInTheDocument());
  await user.click(screen.getByRole('button', { name: 'Columns' }));
  within(screen.getByRole('menu'))
    .getAllByRole('menuitem')
    .forEach((item) => {
      item.scrollIntoView = rs.fn();
    });
  within(screen.getByRole('menu')).getByLabelText('Drag column: Name').focus();
  await user.keyboard('[Space]');
  expect(screen.getByTestId('column-drag-overlay')).toBeInTheDocument();
  await user.keyboard('[Escape]');
  expect(screen.queryByTestId('column-drag-overlay')).not.toBeInTheDocument();
});
