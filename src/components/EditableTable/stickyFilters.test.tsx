import React from 'react';

import { fireEvent, render, screen, waitFor } from '@testing-library/react';

import EditableTable from '.';

test.each([
  ['missing', null, ['Alpha']],
  ['invalid JSON', '{', ['Alpha']],
  ['invalid shape', '{}', ['Alpha']],
  ['invalid entries', '[null]', ['Alpha']],
  ['missing value', '[{"id":"name"}]', ['Alpha']],
  ['saved empty', '[]', ['Alpha', 'Beta']],
  ['saved filter', '[{"id":"name","value":"Beta"}]', ['Beta']],
  ['unreadable', null, ['Alpha']],
] as const)('loads sticky defaults only when storage is missing or invalid: %s', async (scenario, saved, expected) => {
  localStorage.clear();
  if (saved !== null) {
    localStorage.setItem('sticky-defaults_columnFilters', saved);
  }
  const error = rstest.spyOn(console, 'error').mockImplementation(() => undefined);
  const getItem = Storage.prototype.getItem;
  const storage = rstest.spyOn(Storage.prototype, 'getItem').mockImplementation(function (this: Storage, key) {
    if (scenario === 'unreadable' && key === 'sticky-defaults_columnFilters') {
      throw new Error('Storage unavailable');
    }
    return getItem.call(this, key);
  });
  try {
    const table = (
      <EditableTable
        columns={[{ id: 'name', accessorKey: 'name', header: 'Name', filterVariant: 'text' }]}
        data={[{ name: 'Alpha' }, { name: 'Beta' }]}
        clearAllFiltersLabel='Clear all'
        enableColumnFilters
        stickyFilters
        storageKey='sticky-defaults'
        tableOptions={{ initialState: { columnFilters: [{ id: 'name', value: 'Alpha' }] } }}
      />
    );
    const { unmount } = render(table);
    expect(screen.getAllByRole('cell').map((cell) => cell.textContent)).toEqual(expected);
    if (scenario === 'missing') {
      fireEvent.click(screen.getByRole('button', { name: 'Clear all' }));
      await waitFor(() => expect(localStorage.getItem('sticky-defaults_columnFilters')).toBe('[]'));
      unmount();
      render(table);
      expect(screen.getAllByRole('cell').map((cell) => cell.textContent)).toEqual(['Alpha', 'Beta']);
    }
  } finally {
    storage.mockRestore();
    error.mockRestore();
    localStorage.clear();
  }
});
