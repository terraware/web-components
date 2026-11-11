import React, { useState } from 'react';
import { StrictMode } from 'react';

import { act, fireEvent, render, screen, waitFor, within } from '@testing-library/react';
import userEvent from '@testing-library/user-event';

import EditableTableV2, { EditableTableColumnPinningV2, EditableTableColumnV2, EditableTableInstanceV2 } from '.';
import { WithClearAllFilters, WithFilters } from '../../stories/EditableTableV2.stories';

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

test('uses switches and bulk visibility controls while respecting non-hideable columns', () => {
  render(
    <EditableTableV2
      columns={[{ ...columns[0], enableHiding: false }, columns[1]]}
      data={data}
      clearAllFiltersLabel='Clear'
      showColumnsButton
    />
  );
  fireEvent.click(screen.getByRole('button', { name: 'Columns' }));
  expect(screen.getByRole('switch', { name: 'Name' })).toBeDisabled();
  expect(screen.getByRole('switch', { name: 'Count' }).closest('.MuiSwitch-root')).toBeInTheDocument();
  expect(screen.getByRole('button', { name: 'Show all' })).toBeDisabled();
  fireEvent.click(screen.getByRole('button', { name: 'Hide all' }));
  expect(screen.getByRole('switch', { name: 'Name' })).toBeChecked();
  expect(screen.getByRole('switch', { name: 'Count' })).not.toBeChecked();
  expect(screen.getByRole('button', { name: 'Hide all' })).toBeDisabled();
  fireEvent.click(screen.getByRole('button', { name: 'Show all' }));
  expect(screen.getByRole('switch', { name: 'Count' })).toBeChecked();
});

test('can hide and restore all columns from the toolbar manager', () => {
  render(<EditableTableV2 columns={columns} data={data} clearAllFiltersLabel='Clear' showColumnsButton />);
  fireEvent.click(screen.getByRole('button', { name: 'Columns' }));
  fireEvent.click(screen.getByRole('button', { name: 'Hide all' }));
  expect(screen.queryByRole('columnheader', { hidden: true })).not.toBeInTheDocument();
  fireEvent.keyDown(screen.getByRole('menu'), { key: 'Escape' });
  fireEvent.click(screen.getByRole('button', { name: 'Columns' }));
  fireEvent.click(screen.getByRole('button', { name: 'Show all' }));
  expect(screen.getAllByRole('columnheader', { hidden: true })).toHaveLength(2);
});

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

test('requires a save handler for built-in editors but permits self-saving custom editors', async () => {
  const user = userEvent.setup();
  const Example = () => {
    const [rows, setRows] = useState(data);
    return (
      <EditableTableV2
        columns={[
          columns[0],
          {
            ...columns[1],
            enableEditing: true,
            editConfig: {
              editVariant: 'custom',
              customEditComponent: ({ row, cancel }) => (
                <button
                  onClick={() => {
                    setRows((current) =>
                      current.map((item) => (item.id === row.original.id ? { ...item, count: 4 } : item))
                    );
                    cancel();
                  }}
                >
                  Save count
                </button>
              ),
            },
          },
        ]}
        data={rows}
        clearAllFiltersLabel='Clear'
        enableEditing
      />
    );
  };
  render(<Example />);
  fireEvent.doubleClick(screen.getByText('Zebra'));
  fireEvent.keyDown(screen.getByText('Zebra').closest('td')!, { key: 'Enter' });
  expect(screen.queryByLabelText('Name')).not.toBeInTheDocument();
  await user.dblClick(screen.getByText('3'));
  await user.click(screen.getByRole('button', { name: 'Save count' }));
  expect(screen.getByText('4')).toBeInTheDocument();
  expect(screen.queryByRole('button', { name: 'Save count' })).not.toBeInTheDocument();
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

test('paginates and renders pinned columns with sticky offsets', () => {
  render(
    <EditableTableV2
      columns={columns}
      data={data}
      clearAllFiltersLabel='Clear'
      enableColumnPinning
      tableOptions={{
        initialState: {
          pagination: { pageSize: 1, pageIndex: 0 },
          columnPinning: { left: ['name'], right: ['count'] },
        },
      }}
    />
  );
  expect(rowNames()).toEqual(['Zebra']);
  expect(screen.getByLabelText('First page')).toBeDisabled();
  expect(screen.getByLabelText('Last page')).toBeEnabled();
  expect(screen.getByText('Zebra').style.position).toBe('');
  fireEvent.click(screen.getByLabelText('Last page'));
  expect(rowNames()).toEqual(['Acacia']);
  expect(screen.getByLabelText('Last page')).toBeDisabled();
  expect(screen.getByLabelText('First page')).toBeEnabled();
  expect(getComputedStyle(screen.getByText('Acacia')).position).toBe('sticky');
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

test('moves and hides columns using the column controls', () => {
  render(
    <EditableTableV2
      columns={columns}
      data={data}
      clearAllFiltersLabel='Clear'
      enableColumnOrdering
      showColumnsButton
    />
  );
  fireEvent.click(screen.getByLabelText('Columns'));
  fireEvent.click(screen.getByLabelText('Move column forward: Name'));
  expect(screen.getAllByRole('columnheader', { hidden: true }).map((header) => header.textContent)).toEqual([
    'Count',
    'Name',
  ]);
  fireEvent.click(screen.getByRole('switch', { name: 'Name' }));
  expect(screen.getAllByRole('columnheader', { hidden: true })).toHaveLength(1);
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

test('lets custom editor buttons handle Enter without restarting cell editing', async () => {
  const user = userEvent.setup();
  const onSave = rstest.fn();
  render(
    <EditableTableV2
      columns={[
        {
          ...columns[0],
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
    />
  );
  screen.getByText('Zebra').closest('td')!.focus();
  await user.keyboard('{Enter}');
  screen.getByRole('button', { name: 'Save custom' }).focus();
  await user.keyboard('{Enter}');
  await waitFor(() => expect(onSave).toHaveBeenCalledWith(data[0], 'Oak', 'name'));
  expect(screen.queryByRole('button', { name: 'Save custom' })).not.toBeInTheDocument();
});

test.each([false, true])(
  'only consumes clicks on cells that can be edited (enableEditing: %s)',
  async (enableEditing) => {
    const user = userEvent.setup();
    const onRowClick = rstest.fn();
    render(
      <EditableTableV2
        columns={[
          { ...columns[0], enableEditing: (row) => row.original.id === 'a', editConfig: { onSave: rstest.fn() } },
        ]}
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

test('offers per-column sorting and visibility actions without a top toolbar', () => {
  render(<EditableTableV2 columns={columns} data={data} clearAllFiltersLabel='Clear' enableTopToolbar={false} />);
  const actions = () => fireEvent.click(screen.getByLabelText('Column actions: Count'));
  actions();
  fireEvent.click(screen.getByRole('menuitem', { name: 'Sort by Count ascending' }));
  expect(rowNames()).toEqual(['Acacia', 'Zebra']);
  actions();
  fireEvent.click(screen.getByRole('menuitem', { name: 'Sort by Count descending' }));
  expect(rowNames()).toEqual(['Zebra', 'Acacia']);
  actions();
  fireEvent.click(screen.getByRole('menuitem', { name: 'Clear sorting' }));
  expect(screen.getByRole('columnheader', { name: /Count/ })).not.toHaveAttribute('aria-sort');
  actions();
  expect(screen.queryByRole('menuitem', { name: 'Columns' })).not.toBeInTheDocument();
  expect(screen.queryByRole('switch', { name: 'Name' })).not.toBeInTheDocument();
  fireEvent.click(screen.getByRole('menuitem', { name: 'Hide Count column' }));
  expect(screen.queryByRole('columnheader', { name: /Count/, hidden: true })).not.toBeInTheDocument();
  fireEvent.click(screen.getByLabelText('Column actions: Name'));
  expect(screen.getByRole('menuitem', { name: 'Hide Name column' })).toHaveAttribute('aria-disabled', 'true');
  fireEvent.click(screen.getByRole('menuitem', { name: 'Show all columns' }));
  expect(screen.getByRole('columnheader', { name: /Count/, hidden: true })).toBeInTheDocument();
});

test.each([{ left: ['name'], right: ['count'] }, { left: ['name'] }, { right: ['count'] }, {}])(
  'translates uncontrolled initial pinning %j',
  (columnPinning) => {
    let table: EditableTableInstanceV2<Item>;
    render(
      <EditableTableV2
        columns={columns}
        data={[]}
        clearAllFiltersLabel='Clear'
        renderToolbarInternalActions={({ table: instance }) => {
          table = instance;
          return null;
        }}
        tableOptions={{ initialState: { columnPinning } }}
      />
    );
    expect(table!.getColumn('name')!.getIsPinned()).toBe('left' in columnPinning ? 'start' : false);
    expect(table!.getColumn('count')!.getIsPinned()).toBe('right' in columnPinning ? 'end' : false);
    act(() => table!.getColumn('name')!.pin('end'));
    expect(table!.getColumn('name')!.getIsPinned()).toBe('end');
  }
);

test('exposes typed filter metadata on generated TanStack columns', () => {
  const variants = ['text', 'select', 'multi-select', 'range', 'date-range', undefined] as const;
  const filterSelectOptions = ['Zebra', 'Acacia'];
  const definitions: EditableTableColumnV2<Item>[] = variants.map((filterVariant, index) => ({
    id: String(index),
    header: `Column ${index}`,
    accessorKey: 'name',
    filterVariant,
    ...(filterVariant === 'select' || filterVariant === 'multi-select' ? { filterSelectOptions } : {}),
  }));
  const inspect = rs.fn(({ table }: { table: EditableTableInstanceV2<Item> }) => {
    table.getAllLeafColumns().forEach((column, index) => {
      const variant: EditableTableColumnV2<Item>['filterVariant'] = column.columnDef.meta?.filterVariant;
      const options: string[] | undefined = column.columnDef.meta?.filterSelectOptions;
      expect(variant).toBe(variants[index]);
      expect(options).toEqual(definitions[index].filterSelectOptions);
    });
    return null;
  });
  const { rerender } = render(
    <EditableTableV2
      columns={definitions}
      data={data}
      clearAllFiltersLabel='Clear'
      renderToolbarInternalActions={inspect}
    />
  );
  const callsBeforeEmptyData = inspect.mock.calls.length;
  rerender(
    <EditableTableV2
      columns={definitions}
      data={[]}
      clearAllFiltersLabel='Clear'
      renderToolbarInternalActions={inspect}
    />
  );
  expect(inspect.mock.calls.length).toBeGreaterThan(callsBeforeEmptyData);
});

test('round trips controlled left/right pinning through menus and raw TanStack updaters', () => {
  const initialPinning = { left: ['name'], right: [] };
  const onChange = rs.fn();
  let table: EditableTableInstanceV2<Item>;
  const Controlled = () => {
    const [columnPinning, setColumnPinning] = useState<EditableTableColumnPinningV2>(initialPinning);
    return (
      <EditableTableV2
        columns={columns}
        data={data}
        clearAllFiltersLabel='Clear'
        enableColumnPinning
        showColumnsButton
        renderToolbarInternalActions={({ table: instance }) => {
          table = instance;
          return <output aria-label='Pinning state'>{JSON.stringify(columnPinning)}</output>;
        }}
        tableOptions={{
          state: { columnPinning },
          onColumnPinningChange: (updater) => {
            onChange(updater);
            setColumnPinning(updater);
          },
        }}
      />
    );
  };
  render(<Controlled />);
  fireEvent.click(screen.getByLabelText('Column actions: Count'));
  fireEvent.click(screen.getByRole('menuitem', { name: 'Pin to right' }));
  expect(onChange.mock.calls[0][0](initialPinning)).toEqual({ left: ['name'], right: ['count'] });
  expect(screen.getByRole('status', { name: 'Pinning state' })).toHaveTextContent(
    '{"left":["name"],"right":["count"]}'
  );
  expect(table!.getColumn('name')!.getIsPinned()).toBe('start');
  expect(table!.getColumn('count')!.getIsPinned()).toBe('end');
  expect(getComputedStyle(screen.getByText('3')).insetInlineEnd).toBe('0px');
  act(() => table!.setColumnPinning({ start: [], end: ['name'] }));
  expect(screen.getByLabelText('Pinning state')).toHaveTextContent('{"left":[],"right":["name"]}');
  act(() => table!.setColumnPinning((previous) => ({ start: previous.end, end: [] })));
  expect(screen.getByRole('status', { name: 'Pinning state' })).toHaveTextContent('{"left":["name"],"right":[]}');
  fireEvent.click(screen.getByLabelText('Columns'));
  const selects = screen.getAllByRole('combobox', { name: 'Pin column' });
  fireEvent.mouseDown(selects[0]);
  fireEvent.click(screen.getByRole('option', { name: 'Pin to right' }));
  expect(screen.getByLabelText('Pinning state')).toHaveTextContent('{"left":[],"right":["name"]}');
});

test('pins columns and restores hidden columns directly from header action menus', () => {
  render(<EditableTableV2 columns={columns} data={data} clearAllFiltersLabel='Clear' enableColumnPinning />);
  fireEvent.click(screen.getByLabelText('Column actions: Count'));
  fireEvent.click(screen.getByRole('menuitem', { name: 'Pin to right' }));
  expect(getComputedStyle(screen.getByText('3')).position).toBe('sticky');
  expect(getComputedStyle(screen.getByText('3')).insetInlineEnd).toBe('0px');
  fireEvent.click(screen.getByLabelText('Column actions: Count'));
  fireEvent.click(screen.getByRole('menuitem', { name: 'Unpinned' }));
  expect(getComputedStyle(screen.getByText('3')).position).not.toBe('sticky');
  fireEvent.click(screen.getByLabelText('Column actions: Count'));
  fireEvent.click(screen.getByRole('menuitem', { name: 'Hide Count column' }));
  fireEvent.click(screen.getByLabelText('Column actions: Name'));
  fireEvent.click(screen.getByRole('menuitem', { name: 'Show all columns' }));
  expect(screen.getByRole('columnheader', { name: /Count/ })).toBeInTheDocument();
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
  fireEvent.click(screen.getByLabelText('Column actions: Name'));
  fireEvent.click(screen.getByRole('menuitem', { name: 'Clear filter' }));
  expect(screen.queryByLabelText('Filtered: Name')).not.toBeInTheDocument();
  expect(rowNames()).toHaveLength(2);
});

test.each(['select', 'multi-select'] as const)(
  'supports accessible %s filters and clears empty selections',
  async (filterVariant) => {
    const user = userEvent.setup();
    render(
      <EditableTableV2
        columns={[{ ...columns[0], filterVariant, filterSelectOptions: ['Zebra', 'Acacia'] }]}
        data={data}
        clearAllFiltersLabel='Clear'
        enableColumnFilters
      />
    );
    await user.click(screen.getByRole('combobox', { name: 'Filter: Name' }));
    await user.click(screen.getByRole('option', { name: 'Acacia' }));
    await user.keyboard('{Escape}');
    expect(rowNames()).toEqual(['Acacia']);
    expect(screen.getByLabelText('Filtered: Name')).toBeInTheDocument();
    if (filterVariant === 'multi-select') {
      await user.click(screen.getByRole('combobox', { name: 'Filter: Name' }));
      await user.click(screen.getByRole('option', { name: 'Acacia' }));
      await user.keyboard('{Escape}');
      expect(rowNames()).toEqual(['Zebra', 'Acacia']);
      expect(screen.queryByLabelText('Filtered: Name')).not.toBeInTheDocument();
      expect(screen.queryByText('Clear')).not.toBeInTheDocument();
    }
  }
);

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

test('can disable per-column action buttons', () => {
  render(<EditableTableV2 columns={columns} data={data} clearAllFiltersLabel='Clear' enableColumnActions={false} />);
  expect(screen.queryByLabelText('Column actions: Name')).not.toBeInTheDocument();
});
