import React from 'react';

import { render, screen } from '@testing-library/react';

import EditableTableV2 from '.';

test.each(['range', 'date-range'] as const)('round-trips open %s endpoints through storage', (filterVariant) => {
  const date = filterVariant === 'date-range';
  const values = date ? ['2025-01-01', '2025-01-02', '2025-01-03'] : [1, 2, 3];
  const data = values.map((value, index) => ({ value, name: ['Before', 'At', 'After'][index] }));
  const columns = [
    { id: 'value', header: 'Value', accessorKey: 'value' as const, filterVariant },
    { id: 'name', header: 'Name', accessorKey: 'name' as const },
  ];
  const props = {
    clearAllFiltersLabel: 'Clear',
    columns,
    data,
    enableColumnFilters: true,
    stickyFilters: true,
    storageKey: 'open-range',
  };
  localStorage.setItem('open-range_columnFilters', JSON.stringify([{ id: 'value', value: [values[1], undefined] }]));
  const view = render(<EditableTableV2 {...props} />);
  expect(screen.getByText('At')).toBeInTheDocument();
  expect(screen.getByText('After')).toBeInTheDocument();
  expect(screen.queryByText('Before')).not.toBeInTheDocument();
  view.unmount();
  localStorage.setItem('open-range_columnFilters', JSON.stringify([{ id: 'value', value: [undefined, values[1]] }]));
  render(<EditableTableV2 {...props} />);
  expect(screen.getByText('Before')).toBeInTheDocument();
  expect(screen.getByText('At')).toBeInTheDocument();
  expect(screen.queryByText('After')).not.toBeInTheDocument();
  localStorage.removeItem('open-range_columnFilters');
});
