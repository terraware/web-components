import { fireEvent, render, screen, waitFor, within } from '@testing-library/react';

import EditableTableV2, { EditableTableColumnV2 } from '.';

type Item = { id: string; name: string; count: number };
const data: Item[] = [
  { id: 'a', name: 'Zebra', count: 3 },
  { id: 'b', name: 'Acacia', count: 1 },
];
const columns: EditableTableColumnV2<Item>[] = [
  { id: 'name', header: 'Name', accessorKey: 'name' },
  { id: 'count', header: 'Count', accessorKey: 'count', enableEditing: false },
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

test('saves text once on Enter and cancels on Escape', async () => {
  const onSave = rstest.fn();
  render(
    <EditableTableV2
      columns={[{ ...columns[0], editConfig: { onSave } }, columns[1]]}
      data={data}
      clearAllFiltersLabel='Clear'
      enableEditing
    />
  );
  fireEvent.doubleClick(screen.getByText('Zebra'));
  const input = screen.getByLabelText('Name');
  fireEvent.change(input, { target: { value: 'Oak' } });
  fireEvent.keyDown(input, { key: 'Enter' });
  await waitFor(() => expect(onSave).toHaveBeenCalledTimes(1));
  expect(onSave).toHaveBeenCalledWith(data[0], 'Oak', 'name');
  await waitFor(() => expect(screen.queryByLabelText('Name')).not.toBeInTheDocument());
  fireEvent.doubleClick(screen.getByText('Zebra'));
  fireEvent.keyDown(screen.getByLabelText('Name'), { key: 'Escape' });
  expect(onSave).toHaveBeenCalledTimes(1);
  fireEvent.doubleClick(screen.getByText('3'));
  expect(screen.queryByLabelText('Count')).not.toBeInTheDocument();
});

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

test('supports custom renderers, custom editors and row clicks', async () => {
  const onSave = rstest.fn();
  const onRowClick = rstest.fn();
  render(
    <EditableTableV2
      columns={[
        {
          ...columns[0],
          Cell: ({ cell }) => <strong>{cell.getValue<string>()}!</strong>,
          editConfig: {
            onSave,
            editVariant: 'custom',
            customEditComponent: ({ save }) => <button onClick={() => void save('Oak')}>Save custom</button>,
          },
        },
      ]}
      data={data}
      clearAllFiltersLabel='Clear'
      enableEditing
      onRowClick={onRowClick}
    />
  );
  fireEvent.click(screen.getByText('Zebra!'));
  expect(onRowClick).toHaveBeenCalledWith(data[0]);
  fireEvent.doubleClick(screen.getByText('Zebra!'));
  fireEvent.click(screen.getByText('Save custom'));
  await waitFor(() => expect(onSave).toHaveBeenCalledWith(data[0], 'Oak', 'name'));
  expect(onRowClick).toHaveBeenCalledTimes(1);
});

test('shows a rejected save and permits retrying', async () => {
  const onSave = rstest.fn().mockRejectedValueOnce(new Error('failed')).mockResolvedValue(undefined);
  render(
    <EditableTableV2
      columns={[{ ...columns[0], editConfig: { onSave } }]}
      data={data}
      clearAllFiltersLabel='Clear'
      enableEditing
    />
  );
  fireEvent.doubleClick(screen.getByText('Zebra'));
  fireEvent.change(screen.getByLabelText('Name'), { target: { value: 'Oak' } });
  fireEvent.blur(screen.getByLabelText('Name'));
  expect(await screen.findByRole('alert')).toHaveTextContent('Unable to save changes');
  fireEvent.keyDown(screen.getByLabelText('Name'), { key: 'Enter' });
  await waitFor(() => expect(screen.queryByLabelText('Name')).not.toBeInTheDocument());
  expect(onSave).toHaveBeenCalledTimes(2);
});

test('edits select values and saves on blur', async () => {
  const onSave = rstest.fn();
  render(
    <EditableTableV2
      columns={[
        {
          ...columns[0],
          editConfig: {
            onSave,
            editVariant: 'select',
            selectOptions: [
              { label: 'Zebra', value: 'Zebra' },
              { label: 'Oak', value: 'Oak' },
            ],
          },
        },
      ]}
      data={data}
      clearAllFiltersLabel='Clear'
      enableEditing
    />
  );
  fireEvent.doubleClick(screen.getByText('Zebra'));
  fireEvent.mouseDown(screen.getByRole('combobox', { name: 'Name' }));
  fireEvent.click(screen.getByRole('option', { name: 'Oak' }));
  fireEvent.blur(screen.getByRole('combobox', { name: 'Name' }));
  await waitFor(() => expect(onSave).toHaveBeenCalledWith(data[0], 'Oak', 'name'));
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
