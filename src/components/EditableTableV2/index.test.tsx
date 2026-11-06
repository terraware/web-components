import { StrictMode } from 'react';

import { act, fireEvent, render, screen, waitFor, within } from '@testing-library/react';
import userEvent from '@testing-library/user-event';

import EditableTableV2, { EditableTableColumnV2 } from '.';
import { WithClearAllFilters, WithFilters, WithOccupationFilter } from '../../stories/EditableTableV2.stories';
import { getStrings, setLocale } from '../../strings';

type Item = { id: string; name: string; count: number };
const data: Item[] = [
  { id: 'a', name: 'Zebra', count: 3 },
  { id: 'b', name: 'Acacia', count: 1 },
];
const columns: EditableTableColumnV2<Item>[] = [
  { id: 'name', header: 'Name', accessorKey: 'name', filterVariant: 'text' },
  { id: 'count', header: 'Count', accessorKey: 'count', enableEditing: false },
];
const rowNames = () =>
  screen
    .getAllByRole('row')
    .slice(1)
    .map((row) => within(row).getAllByRole('cell')[0].textContent);

test('only shows the occupation filter in the occupation-only story', () => {
  render(<WithOccupationFilter />);
  expect(screen.getByRole('combobox', { name: 'Filter: Occupation' })).toBeInTheDocument();
  expect(screen.queryByLabelText('Filter: Name')).not.toBeInTheDocument();
  expect(screen.queryByLabelText('Filter: Available')).not.toBeInTheDocument();
  expect(screen.queryByLabelText('Columns')).not.toBeInTheDocument();
});

test.each([{ rows: data }, { rows: [] }])(
  'matches the original divider above pagination, including an empty table',
  ({ rows }) => {
    render(<EditableTableV2 columns={columns} data={rows} clearAllFiltersLabel='Clear' />);
    const footer = screen.getByLabelText('Last page').closest('.MuiTablePagination-root')!;
    expect(getComputedStyle(footer).boxShadow).toMatch(/^0 1px 2px -1px .+ inset$/);
  }
);

test.each([WithFilters, WithClearAllFilters, WithOccupationFilter])(
  'renders a filter story in every bundled locale: %s',
  (Story) => {
    try {
      for (const locale of ['en', 'es', 'fr', 'gx']) {
        setLocale(locale);
        const strings = getStrings();
        const view = render(<Story />);
        expect(screen.getByRole('combobox', { name: `${strings.TABLE_FILTER}: Occupation` })).toBeInTheDocument();
        view.unmount();
      }
    } finally {
      setLocale('en');
    }
  }
);

test('sorts and filters rows, and clears global and column filters', () => {
  render(
    <EditableTableV2
      columns={columns}
      data={data}
      clearAllFiltersLabel='Clear'
      enableGlobalFilter
      enableColumnFilters
      enablePagination={false}
    />
  );
  fireEvent.click(screen.getByText('Name'));
  expect(rowNames()).toEqual(['Acacia', 'Zebra']);
  fireEvent.change(screen.getByLabelText('Filter: Name'), { target: { value: 'Zeb' } });
  expect(rowNames()).toEqual(['Zebra']);
  fireEvent.change(screen.getByLabelText('Search'), { target: { value: 'missing' } });
  expect(screen.getByText('No records to display')).toBeInTheDocument();
  fireEvent.click(screen.getByText('Clear'));
  expect(rowNames()).toHaveLength(2);
});

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

test.each([false, true])('keeps the current editor open when an older save resolves (reopen: %s)', async (reopen) => {
  let resolveSave!: () => void;
  const onSave = rstest.fn(
    () =>
      new Promise<void>((resolve) => {
        resolveSave = resolve;
      })
  );
  render(
    <StrictMode>
      <EditableTableV2
        columns={[{ ...columns[0], editConfig: { onSave } }]}
        data={data}
        clearAllFiltersLabel='Clear'
        enableEditing
      />
    </StrictMode>
  );
  fireEvent.doubleClick(screen.getByText('Zebra'));
  fireEvent.change(screen.getByLabelText('Name'), { target: { value: 'Oak' } });
  fireEvent.keyDown(screen.getByLabelText('Name'), { key: 'Enter' });
  expect(onSave).toHaveBeenCalledWith(data[0], 'Oak', 'name');
  expect(screen.getByLabelText('Name')).toBeDisabled();
  fireEvent.doubleClick(screen.getByText('Acacia'));
  if (reopen) {
    fireEvent.keyDown(screen.getByLabelText('Name'), { key: 'Escape' });
    fireEvent.doubleClick(screen.getByText('Zebra'));
  }
  const currentInput = screen.getByLabelText('Name');
  fireEvent.change(currentInput, { target: { value: 'Unsaved edit' } });
  await act(async () => resolveSave());
  expect(screen.getByLabelText('Name')).toBe(currentInput);
  expect(currentInput).toHaveValue('Unsaved edit');
  expect(onSave).toHaveBeenCalledTimes(1);
});

test('clears the edit session when saving removes the row from view', async () => {
  let resolveSave!: () => void;
  const onSave = rstest.fn(
    () =>
      new Promise<void>((resolve) => {
        resolveSave = resolve;
      })
  );
  const editableColumns = [{ ...columns[0], editConfig: { onSave } }];
  const table = (rows: Item[]) => (
    <EditableTableV2 columns={editableColumns} data={rows} clearAllFiltersLabel='Clear' enableEditing />
  );
  const { rerender } = render(table(data));
  fireEvent.doubleClick(screen.getByText('Zebra'));
  fireEvent.change(screen.getByLabelText('Name'), { target: { value: 'Oak' } });
  fireEvent.keyDown(screen.getByLabelText('Name'), { key: 'Enter' });
  expect(onSave).toHaveBeenCalledTimes(1);
  rerender(table([]));
  expect(screen.queryByLabelText('Name')).not.toBeInTheDocument();
  await act(async () => resolveSave());
  rerender(table(data));
  expect(screen.getByText('Zebra')).toBeInTheDocument();
  expect(screen.queryByLabelText('Name')).not.toBeInTheDocument();
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

test('persists filters and tolerates corrupt storage', () => {
  localStorage.setItem('table_columnFilters', 'invalid');
  const props = {
    columns,
    data,
    clearAllFiltersLabel: 'Clear',
    enableColumnFilters: true,
    stickyFilters: true,
    storageKey: 'table',
  };
  const view = render(<EditableTableV2 {...props} />);
  fireEvent.change(screen.getByLabelText('Filter: Name'), { target: { value: 'Zebra' } });
  expect(JSON.parse(localStorage.getItem('table_columnFilters')!)).toEqual([{ id: 'name', value: 'Zebra' }]);
  view.unmount();
  render(<EditableTableV2 {...props} />);
  expect(rowNames()).toEqual(['Zebra']);
  fireEvent.click(screen.getByText('Clear'));
  expect(localStorage.getItem('table_columnFilters')).toBeNull();
});

test('supports custom renderers, custom editors and row clicks', async () => {
  const user = userEvent.setup();
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
        columns[1],
      ]}
      data={data}
      clearAllFiltersLabel='Clear'
      enableEditing
      onRowClick={onRowClick}
    />
  );
  await user.click(screen.getByText('Zebra!'));
  expect(onRowClick).not.toHaveBeenCalled();
  await user.dblClick(screen.getByText('Zebra!'));
  expect(onRowClick).not.toHaveBeenCalled();
  await user.click(screen.getByText('Save custom'));
  await waitFor(() => expect(onSave).toHaveBeenCalledWith(data[0], 'Oak', 'name'));
  expect(onRowClick).not.toHaveBeenCalled();
  await user.click(screen.getByText('3'));
  expect(onRowClick).toHaveBeenCalledWith(data[0]);
  expect(onRowClick).toHaveBeenCalledTimes(1);
});

test.each([false, true])(
  'only consumes clicks on cells that can be edited (enableEditing: %s)',
  async (enableEditing) => {
    const user = userEvent.setup();
    const onRowClick = rstest.fn();
    render(
      <EditableTableV2
        columns={[{ ...columns[0], enableEditing: (row) => row.original.id === 'a' }]}
        data={data}
        clearAllFiltersLabel='Clear'
        enableEditing={enableEditing}
        onRowClick={onRowClick}
      />
    );
    await user.click(screen.getByText('Zebra'));
    expect(onRowClick).toHaveBeenCalledTimes(enableEditing ? 0 : 1);
    await user.click(screen.getByText('Acacia'));
    expect(onRowClick).toHaveBeenLastCalledWith(data[1]);
    expect(onRowClick).toHaveBeenCalledTimes(enableEditing ? 1 : 2);
    expect(screen.queryByLabelText('Name')).not.toBeInTheDocument();
  }
);

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

test('filters numeric ranges', () => {
  render(
    <EditableTableV2
      columns={[{ ...columns[1], filterVariant: 'range' }]}
      data={data}
      clearAllFiltersLabel='Clear'
      enableColumnFilters
    />
  );
  fireEvent.change(screen.getByLabelText('Filter: Count Minimum'), { target: { value: '2' } });
  expect(screen.queryByText('1')).not.toBeInTheDocument();
  expect(screen.getByText('3')).toBeInTheDocument();
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

test('marks filtered columns and clears search independently from column filters', () => {
  render(
    <EditableTableV2
      columns={columns}
      data={data}
      clearAllFiltersLabel='Clear'
      enableGlobalFilter
      enableColumnFilters
    />
  );
  expect(screen.queryByLabelText('Filtered: Name')).not.toBeInTheDocument();
  expect(screen.getByLabelText('Filter: Name')).toHaveAttribute('placeholder', 'Filter by Name');
  expect(screen.getByLabelText('Search')).toHaveAttribute('placeholder', 'Search');
  fireEvent.change(screen.getByLabelText('Filter: Name'), { target: { value: 'Zebra' } });
  const filterIcon = screen.getByLabelText('Filtered: Name');
  const header = screen.getByRole('columnheader', { name: /Name/ });
  const sortIcon = header.querySelector('.MuiTableSortLabel-icon')!;
  expect(filterIcon.compareDocumentPosition(sortIcon) & Node.DOCUMENT_POSITION_FOLLOWING).toBeTruthy();
  fireEvent.click(filterIcon);
  expect(header).not.toHaveAttribute('aria-sort');
  fireEvent.change(screen.getByLabelText('Search'), { target: { value: 'missing' } });
  fireEvent.click(screen.getByLabelText('Clear search'));
  expect(rowNames()).toEqual(['Zebra']);
  expect(screen.getByLabelText('Filtered: Name')).toBeInTheDocument();
  fireEvent.click(screen.getByText('Clear'));
  expect(screen.queryByLabelText('Filtered: Name')).not.toBeInTheDocument();
  expect(rowNames()).toHaveLength(2);
});

test('supports accessible standard select filters', () => {
  render(
    <EditableTableV2
      columns={[{ ...columns[0], filterVariant: 'select', filterSelectOptions: ['Zebra', 'Acacia'] }]}
      data={data}
      clearAllFiltersLabel='Clear'
      enableColumnFilters
    />
  );
  fireEvent.mouseDown(screen.getByRole('combobox', { name: 'Filter: Name' }));
  fireEvent.click(screen.getByRole('option', { name: 'Acacia' }));
  expect(rowNames()).toEqual(['Acacia']);
  expect(screen.getByLabelText('Filtered: Name')).toBeInTheDocument();
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
