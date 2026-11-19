import React from 'react';

import { fireEvent, render, screen } from '@testing-library/react';

import EditableTableV2 from '.';

test('navigates a manual page count without claiming a total and labels a partial last page', () => {
  const rows = Array.from({ length: 10 }, (_, name) => ({ name }));
  const props = {
    clearAllFiltersLabel: 'Clear',
    columns: [{ id: 'name', header: 'Name', accessorKey: 'name' as const }],
    tableOptions: {
      manualPagination: true,
      pageCount: 5,
      initialState: { pagination: { pageIndex: 0, pageSize: 10 } },
    },
  };
  const { rerender } = render(<EditableTableV2 {...props} data={rows} />);
  expect(screen.getByRole('button', { name: 'Next page' })).toBeEnabled();
  expect(screen.getByRole('button', { name: 'Last page' })).toBeEnabled();
  fireEvent.click(screen.getByRole('button', { name: 'Next page' }));
  expect(screen.getByText('11–20')).toBeInTheDocument();
  fireEvent.click(screen.getByRole('button', { name: 'Last page' }));
  rerender(<EditableTableV2 {...props} data={rows.slice(0, 3)} />);
  expect(screen.getByText('41–43')).toBeInTheDocument();
  expect(screen.getByRole('button', { name: 'Next page' })).toBeDisabled();
  expect(screen.getByRole('button', { name: 'Last page' })).toBeDisabled();
  fireEvent.click(screen.getByRole('button', { name: 'First page' }));
  expect(screen.getByRole('button', { name: 'Previous page' })).toBeDisabled();
  expect(screen.getByRole('button', { name: 'Next page' })).toBeEnabled();
});
