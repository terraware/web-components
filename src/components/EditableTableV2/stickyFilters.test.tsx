import React from 'react';

import { fireEvent, render, screen } from '@testing-library/react';

import EditableTableV2 from '.';

test.each([
  ['missing', null, ['Alpha']],
  ['invalid JSON', '{', ['Alpha']],
  ['invalid shape', '{}', ['Alpha']],
  ['invalid entries', '[null]', ['Alpha']],
  ['missing value', '[{"id":"name"}]', ['Alpha']],
  ['saved empty', '[]', ['Alpha', 'Beta']],
  ['saved filter', '[{"id":"name","value":"Beta"}]', ['Beta']],
  ['unreadable', null, ['Alpha']],
] as const)('loads sticky defaults only when storage is missing or invalid: %s', (scenario, saved, expected) => {
  localStorage.clear();
  if (saved !== null) {
    localStorage.setItem('sticky-defaults_columnFilters', saved);
  }
  const getItem = Storage.prototype.getItem;
  const storage = rstest.spyOn(Storage.prototype, 'getItem').mockImplementation(function (this: Storage, key) {
    if (scenario === 'unreadable' && key === 'sticky-defaults_columnFilters') {
      throw new Error('Storage unavailable');
    }
    return getItem.call(this, key);
  });
  try {
    const table = (storageKey = 'sticky-defaults') => (
      <EditableTableV2
        columns={[{ id: 'name', accessorKey: 'name', header: 'Name', filterVariant: 'text' }]}
        data={[{ name: 'Alpha' }, { name: 'Beta' }]}
        clearAllFiltersLabel='Clear all'
        enableColumnFilters
        stickyFilters
        storageKey={storageKey}
        tableOptions={{ initialState: { columnFilters: [{ id: 'name', value: 'Alpha' }] } }}
        renderToolbarInternalActions={({ table }) => (
          <button onClick={() => table.getColumn('name')?.setFilterValue('Beta')}>Filter Beta</button>
        )}
      />
    );
    const rows = () => screen.getAllByRole('cell').map((cell) => cell.textContent);
    const view = render(table());
    expect(rows()).toEqual(expected);
    if (scenario === 'missing') {
      fireEvent.click(screen.getByRole('button', { name: 'Filter Beta' }));
      view.rerender(table());
      expect(rows()).toEqual(['Beta']);
      fireEvent.click(screen.getByRole('button', { name: 'Clear all' }));
      expect(localStorage.getItem('sticky-defaults_columnFilters')).toBe('[]');
      view.rerender(table('other-sticky-defaults'));
      expect(rows()).toEqual(['Alpha']);
      view.unmount();
      render(table());
      expect(rows()).toEqual(['Alpha', 'Beta']);
    }
  } finally {
    storage.mockRestore();
    localStorage.clear();
  }
});
