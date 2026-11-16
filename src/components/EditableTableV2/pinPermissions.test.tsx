import React from 'react';

import { fireEvent, render, screen } from '@testing-library/react';

import EditableTableV2 from '.';

test('disables the column-manager pin selector when the column cannot pin', () => {
  render(
    <EditableTableV2
      clearAllFiltersLabel='Clear'
      columns={[{ id: 'name', header: 'Name', accessorKey: 'name' }]}
      data={[] as { name: string }[]}
      showColumnsButton
      enableColumnPinning
      tableOptions={{ defaultColumn: { enablePinning: false } }}
    />
  );
  fireEvent.click(screen.getByRole('button', { name: 'Columns' }));
  const selector = screen.getByRole('combobox', { name: 'Pin column' });
  expect(selector).toHaveAttribute('aria-disabled', 'true');
  fireEvent.mouseDown(selector);
  expect(screen.queryByRole('option', { name: 'Pin left' })).not.toBeInTheDocument();
});
