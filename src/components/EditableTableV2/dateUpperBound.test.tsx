import React from 'react';

import { render, screen } from '@testing-library/react';

import EditableTableV2 from '.';

test.each(['2025-01-02', '2025-01-02T12:00:00Z'])('applies the date upper bound %s precisely', (max) => {
  render(
    <EditableTableV2
      clearAllFiltersLabel='Clear'
      enableColumnFilters
      columns={[
        { id: 'name', header: 'Name', accessorKey: 'name' },
        { id: 'date', header: 'Date', accessorKey: 'date', filterVariant: 'date-range' },
      ]}
      data={[
        { name: 'Start', date: '2025-01-02T00:00:00Z' },
        { name: 'Noon', date: '2025-01-02T12:00:00Z' },
        { name: 'Late', date: '2025-01-02T23:59:59.999Z' },
        { name: 'Next', date: '2025-01-03T00:00:00Z' },
      ]}
      tableOptions={{ initialState: { columnFilters: [{ id: 'date', value: [undefined, max] }] } }}
    />
  );
  expect(screen.getByText('Start')).toBeInTheDocument();
  expect(screen.getByText('Noon')).toBeInTheDocument();
  if (max === '2025-01-02') {
    expect(screen.getByText('Late')).toBeInTheDocument();
  } else {
    expect(screen.queryByText('Late')).not.toBeInTheDocument();
  }
  expect(screen.queryByText('Next')).not.toBeInTheDocument();
});
