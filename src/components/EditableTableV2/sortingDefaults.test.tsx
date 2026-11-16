import React from 'react';

import { render, screen } from '@testing-library/react';

import EditableTableV2 from '.';

test('inherits default sorting permissions while preserving explicit column overrides', () => {
  const columns = [
    { id: 'name', header: 'Name', accessorKey: 'name' as const },
    { id: 'value', header: 'Value', accessorKey: 'value' as const, enableSorting: true },
    { id: 'fixed', header: 'Fixed', accessorKey: 'fixed' as const, enableSorting: false },
  ];
  const data = [{ name: 'Alpha', value: 1, fixed: 'Fixed' }];
  const table = (enabled: boolean) => (
    <EditableTableV2
      clearAllFiltersLabel='Clear'
      columns={columns}
      data={data}
      tableOptions={{ defaultColumn: { enableSorting: enabled } }}
    />
  );
  const { rerender } = render(table(false));
  expect(screen.queryByRole('button', { name: 'Name' })).not.toBeInTheDocument();
  expect(screen.getByRole('button', { name: 'Value' })).toBeInTheDocument();
  expect(screen.queryByRole('button', { name: 'Fixed' })).not.toBeInTheDocument();

  rerender(table(true));
  expect(screen.getByRole('button', { name: 'Name' })).toBeInTheDocument();
  expect(screen.getByRole('button', { name: 'Value' })).toBeInTheDocument();
  expect(screen.queryByRole('button', { name: 'Fixed' })).not.toBeInTheDocument();
});
