import React from 'react';

import { fireEvent, render, screen } from '@testing-library/react';

import EditableTableV2 from '.';
import { getTableSettings } from '../EditableTable/tableSettings';

test('auto-removes empty named filters through column.setFilterValue', () => {
  render(
    <EditableTableV2
      clearAllFiltersLabel='Clear'
      enableColumnFilters
      columns={[
        { id: 'name', header: 'Name', accessorKey: 'name' },
        {
          id: 'tags',
          header: 'Tags',
          accessorKey: 'tags',
          filterVariant: 'multi-select',
          filterFn: 'arrIncludesSome',
          filterSelectOptions: ['a', 'b'],
        },
      ]}
      data={[
        { name: 'Alpha', tags: ['a'] },
        { name: 'Beta', tags: ['b'] },
      ]}
      tableOptions={{ initialState: { columnFilters: [{ id: 'tags', value: ['a'] }] } }}
      renderToolbarInternalActions={({ table }) => (
        <>
          <button onClick={() => table.getColumn('tags')?.setFilterValue([])}>Empty filter</button>
          <output data-testid='filters'>{JSON.stringify(getTableSettings(table).columnFilters)}</output>
        </>
      )}
    />
  );
  expect(screen.queryByText('Beta')).not.toBeInTheDocument();
  fireEvent.click(screen.getByRole('button', { name: 'Empty filter' }));
  expect(screen.getByText('Alpha')).toBeInTheDocument();
  expect(screen.getByText('Beta')).toBeInTheDocument();
  expect(screen.getByTestId('filters')).toHaveTextContent('[]');
});
