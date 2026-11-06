import { fireEvent, render, screen, within } from '@testing-library/react';

import EditableTableV2, { EditableTableColumnV2 } from '.';

type Item = { id: string; name: string; count: number };
const data: Item[] = [
  { id: 'a', name: 'Zebra', count: 3 },
  { id: 'b', name: 'Acacia', count: 1 },
];
const columns: EditableTableColumnV2<Item>[] = [
  { id: 'name', header: 'Name', accessorKey: 'name' },
  { id: 'count', header: 'Count', accessorKey: 'count' },
];
const rowNames = () =>
  screen
    .getAllByRole('row')
    .slice(1)
    .map((row) => within(row).getAllByRole('cell')[0].textContent);

test.each([{ rows: data }, { rows: [] }])(
  'matches the original divider above pagination, including an empty table',
  ({ rows }) => {
    render(<EditableTableV2 columns={columns} data={rows} clearAllFiltersLabel='Clear' />);
    const footer = screen.getByLabelText('Last page').closest('.MuiTablePagination-root')!;
    expect(getComputedStyle(footer).boxShadow).toMatch(/^0 1px 2px -1px .+ inset$/);
  }
);

test('paginates with first, last, next and previous controls', () => {
  render(
    <EditableTableV2
      columns={columns}
      data={data}
      clearAllFiltersLabel='Clear'
      tableOptions={{
        initialState: { pagination: { pageSize: 1, pageIndex: 0 } },
      }}
    />
  );
  expect(rowNames()).toEqual(['Zebra']);
  expect(screen.getByLabelText('First page')).toBeDisabled();
  expect(screen.getByLabelText('Last page')).toBeEnabled();
  fireEvent.click(screen.getByLabelText('Last page'));
  expect(rowNames()).toEqual(['Acacia']);
  expect(screen.getByLabelText('Last page')).toBeDisabled();
  expect(screen.getByLabelText('First page')).toBeEnabled();
  fireEvent.click(screen.getByLabelText('First page'));
  expect(rowNames()).toEqual(['Zebra']);
  fireEvent.click(screen.getByLabelText('Next page'));
  expect(rowNames()).toEqual(['Acacia']);
});

test('shows unsorted indicators and cycles numeric sorting ascending first', () => {
  render(<EditableTableV2 columns={columns} data={data} clearAllFiltersLabel='Clear' />);
  expect(screen.getAllByTestId('SyncAltIcon')).toHaveLength(2);
  const header = screen.getByRole('columnheader', { name: /Count/ });
  expect(header).not.toHaveAttribute('aria-sort');
  fireEvent.click(screen.getByText('Count'));
  expect(header).toHaveAttribute('aria-sort', 'ascending');
  expect(rowNames()).toEqual(['Acacia', 'Zebra']);
  expect(screen.getAllByTestId('SyncAltIcon')).toHaveLength(1);
  fireEvent.click(screen.getByText('Count'));
  expect(header).toHaveAttribute('aria-sort', 'descending');
  expect(rowNames()).toEqual(['Zebra', 'Acacia']);
  fireEvent.click(screen.getByText('Count'));
  expect(header).not.toHaveAttribute('aria-sort');
});

test('automatically selects alphanumeric sorting with fewer than ten rows', () => {
  render(
    <EditableTableV2
      columns={[{ id: 'name', header: 'Name', accessorKey: 'name' }]}
      data={['15372', '1467', '20', '113', '13770'].map((name) => ({ name }))}
      clearAllFiltersLabel='Clear'
    />
  );
  fireEvent.click(screen.getByText('Name'));
  expect(rowNames()).toEqual(['20', '113', '1467', '13770', '15372']);
});
