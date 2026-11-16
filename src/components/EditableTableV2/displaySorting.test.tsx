import React from 'react';

import { fireEvent, render, screen } from '@testing-library/react';

import EditableTableV2 from '.';

test('keeps the real active sort when a display-only header is clicked', () => {
  render(
    <EditableTableV2
      clearAllFiltersLabel='Clear'
      data={[{ name: 'Zebra' }, { name: 'Alpha' }]}
      columns={[
        { id: 'name', header: 'Name', accessorKey: 'name' },
        { id: 'actions', header: 'Actions', Cell: () => <button>Action</button> },
      ]}
    />
  );
  fireEvent.click(screen.getByRole('button', { name: 'Name' }));
  expect(screen.getAllByRole('row')[1]).toHaveTextContent('Alpha');
  fireEvent.click(screen.getByText('Actions'));
  expect(screen.getByRole('columnheader', { name: 'Name' })).toHaveAttribute('aria-sort', 'ascending');
  expect(screen.getByRole('columnheader', { name: 'Actions' })).not.toHaveAttribute('aria-sort');
  expect(screen.getAllByRole('row')[1]).toHaveTextContent('Alpha');
});
