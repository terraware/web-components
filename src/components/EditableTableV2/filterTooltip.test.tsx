import React from 'react';

import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';

import EditableTableV2, { EditableTableColumnV2 } from '.';
import { getStrings } from '../../strings';
import { filterTooltip } from './filterTooltip';

test.each([
  [{ filterVariant: 'text' }, 'Acacia', 'Fuzzy "Acacia"'],
  [{ filterVariant: 'select' }, 'Artist', 'Equals "Artist"'],
  [{ filterVariant: 'multi-select' }, ['Artist', 'Designer'], 'Includes "Artist" or "Designer"'],
  [{ filterVariant: 'range' }, ['2', '5'], 'Between Inclusive "2" and "5"'],
  [{ filterVariant: 'range', filterFn: 'between' }, ['', '5'], 'Between "" and "5"'],
  [{ filterVariant: 'date-range' }, ['2025-01-01', ''], 'Between Inclusive "2025-01-01" and ""'],
  [{ filterVariant: 'text', filterFn: () => true }, 'Acacia', ' "Acacia"'],
] as const)('describes legacy filter modes and values: %j', (config, value, description) => {
  expect(filterTooltip({ id: 'name', header: 'Name', ...config }, value, getStrings())).toBe(
    `Filtering by Name - ${description}`
  );
});

test('shows the legacy tooltip only while a filter is active and updates it with the filter value', async () => {
  const user = userEvent.setup();
  const column: EditableTableColumnV2<{ name: string }> = {
    id: 'name',
    header: 'Name',
    accessorKey: 'name',
    filterVariant: 'text',
  };
  render(
    <EditableTableV2
      columns={[column]}
      data={[{ name: 'Acacia koa' }]}
      clearAllFiltersLabel='Clear'
      enableColumnFilters
      showColumnFiltersButton
    />
  );
  await user.click(screen.getByRole('button', { name: 'Show/Hide filters' }));
  expect(screen.queryByLabelText('Filtered: Name')).not.toBeInTheDocument();
  await user.type(screen.getByLabelText('Filter: Name'), 'aca');
  await user.hover(screen.getByLabelText('Filtered: Name'));
  expect(await screen.findByRole('tooltip')).toHaveTextContent('Filtering by Name - Fuzzy "aca"');
  await user.unhover(screen.getByLabelText('Filtered: Name'));
  await user.clear(screen.getByLabelText('Filter: Name'));
  expect(screen.queryByLabelText('Filtered: Name')).not.toBeInTheDocument();
});
