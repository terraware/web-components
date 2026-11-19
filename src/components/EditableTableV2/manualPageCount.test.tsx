import React from 'react';

import { ThemeProvider, createTheme } from '@mui/material/styles';
import { fireEvent, render, screen } from '@testing-library/react';

import EditableTableV2 from '.';

test.each([
  ['ltr', 5],
  ['rtl', 5],
  ['ltr', -1],
  ['rtl', -1],
] as const)('navigates %s manual pageCount %s without claiming a total', (direction, pageCount) => {
  const rows = Array.from({ length: 10 }, (_, name) => ({ name }));
  const props = {
    clearAllFiltersLabel: 'Clear',
    columns: [{ id: 'name', header: 'Name', accessorKey: 'name' as const }],
    tableOptions: {
      manualPagination: true,
      pageCount,
      initialState: { pagination: { pageIndex: 0, pageSize: 10 } },
    },
  };
  const theme = createTheme({ direction });
  const table = (data: typeof rows) => (
    <ThemeProvider theme={theme}>
      <EditableTableV2 {...props} data={data} />
    </ThemeProvider>
  );
  const { rerender } = render(table(rows));
  expect(screen.getByRole('button', { name: 'Next page' })).toBeEnabled();
  if (pageCount === -1) {
    expect(screen.getByRole('button', { name: 'Last page' })).toBeDisabled();
  } else {
    expect(screen.getByRole('button', { name: 'Last page' })).toBeEnabled();
  }
  fireEvent.click(screen.getByRole('button', { name: 'Next page' }));
  expect(screen.getByText('11–20')).toBeInTheDocument();
  if (pageCount === -1) {
    expect(screen.getByRole('button', { name: 'Next page' })).toBeEnabled();
    expect(screen.getByRole('button', { name: 'Last page' })).toBeDisabled();
    return;
  }
  fireEvent.click(screen.getByRole('button', { name: 'Last page' }));
  rerender(table(rows.slice(0, 3)));
  expect(screen.getByText('41–43')).toBeInTheDocument();
  expect(screen.getByRole('button', { name: 'Next page' })).toBeDisabled();
  expect(screen.getByRole('button', { name: 'Last page' })).toBeDisabled();
  fireEvent.click(screen.getByRole('button', { name: 'First page' }));
  expect(screen.getByRole('button', { name: 'Previous page' })).toBeDisabled();
  expect(screen.getByRole('button', { name: 'Next page' })).toBeEnabled();
});
