import React from 'react';

import { fireEvent, render, screen, waitFor, within } from '@testing-library/react';

import EditableTableV2, { EditableTableColumnV2 } from '.';
import { WithTopToolbar as WithTopToolbarLegacy } from '../../stories/EditableTable.stories';
import {
  WithClearAllFilters,
  WithFilters,
  WithOccupationFilter,
  WithTopToolbar,
} from '../../stories/EditableTableV2.stories';
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

test.each([
  { name: 'MRT', Story: WithTopToolbarLegacy, columnsLabel: 'Show/Hide columns' },
  { name: 'V2', Story: WithTopToolbar, columnsLabel: 'Columns' },
])('shows search and column controls in the $name toolbar story', ({ Story, columnsLabel }) => {
  render(<Story />);
  expect(screen.getByPlaceholderText('Search')).toBeInTheDocument();
  fireEvent.click(screen.getByRole('button', { name: columnsLabel }));
  expect(screen.getByRole('menu')).toBeInTheDocument();
});

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

test('toggles search, column filters, density, and fullscreen in the full V2 toolbar story', () => {
  const view = render(<WithTopToolbar />);
  const wrapper = view.container.firstElementChild!;
  expect(getComputedStyle(wrapper).padding).toBe('16px');
  expect(screen.getByRole('button', { name: 'Export' })).toBeInTheDocument();
  const searchToggle = screen.getByRole('button', { name: 'Show/Hide search' });
  expect(within(searchToggle).getByTestId('SearchOffIcon')).toBeInTheDocument();
  fireEvent.click(screen.getByRole('button', { name: 'Show/Hide search' }));
  expect(screen.queryByPlaceholderText('Search')).not.toBeInTheDocument();
  expect(within(searchToggle).getByTestId('SearchIcon')).toBeInTheDocument();
  fireEvent.click(screen.getByRole('button', { name: 'Show/Hide search' }));
  expect(screen.getByPlaceholderText('Search')).toBeInTheDocument();
  expect(within(searchToggle).getByTestId('SearchOffIcon')).toBeInTheDocument();
  expect(screen.queryByLabelText('Filter: Name')).not.toBeInTheDocument();
  fireEvent.click(screen.getByRole('button', { name: 'Show/Hide filters' }));
  fireEvent.change(screen.getByLabelText('Filter: Name'), { target: { value: 'Carlos_3' } });
  expect(rowNames().every((name) => name?.startsWith('Carlos_3'))).toBe(true);
  fireEvent.click(screen.getByRole('button', { name: 'Show/Hide filters' }));
  expect(screen.queryByLabelText('Filter: Name')).not.toBeInTheDocument();
  const cell = screen.getByText('Carlos_3').closest('td')!;
  expect(getComputedStyle(cell).paddingTop).toBe('16px');
  fireEvent.click(screen.getByRole('button', { name: 'Toggle density' }));
  expect(getComputedStyle(cell).paddingTop).toBe('4px');
  fireEvent.click(screen.getByRole('button', { name: 'Toggle density' }));
  expect(getComputedStyle(cell).paddingTop).toBe('24px');
  fireEvent.click(screen.getByRole('button', { name: 'Toggle full screen' }));
  expect(screen.getByRole('button', { name: 'Toggle full screen' })).toHaveAttribute('aria-pressed', 'true');
  expect(document.body.style.overflow).toBe('hidden');
  expect(getComputedStyle(wrapper).padding).toBe('0px');
  expect(getComputedStyle(wrapper).margin).toBe('0px');
  expect(getComputedStyle(wrapper).position).toBe('fixed');
  fireEvent.keyDown(document, { key: 'Escape' });
  expect(screen.getByRole('button', { name: 'Toggle full screen' })).toHaveAttribute('aria-pressed', 'false');
  expect(document.body.style.overflow).not.toBe('hidden');
  expect(getComputedStyle(wrapper).padding).toBe('16px');
  fireEvent.click(screen.getByRole('button', { name: 'Toggle full screen' }));
  view.unmount();
  expect(document.body.style.overflow).not.toBe('hidden');
});

test('toggles and applies column filters in the original full toolbar story', async () => {
  render(<WithTopToolbarLegacy />);
  expect(screen.queryByRole('textbox', { name: 'Filter by Name' })).not.toBeInTheDocument();
  fireEvent.click(screen.getByRole('button', { name: 'Show/Hide filters' }));
  const nameFilter = await screen.findByRole('textbox', { name: 'Filter by Name' });
  expect(screen.getByRole('combobox', { name: 'Filter by Occupation' })).toBeVisible();
  expect(screen.getByRole('combobox', { name: 'Filter by Available' })).toBeVisible();
  fireEvent.change(nameFilter, { target: { value: 'Carlos_3' } });
  await waitFor(() => {
    expect(rowNames().length).toBeGreaterThan(0);
    expect(rowNames().every((name) => name?.startsWith('Carlos_3'))).toBe(true);
  });
  fireEvent.click(screen.getByRole('button', { name: 'Show/Hide filters' }));
  await waitFor(() => expect(screen.queryByRole('textbox', { name: 'Filter by Name' })).not.toBeInTheDocument());
  fireEvent.click(screen.getByRole('button', { name: 'Show/Hide filters' }));
  expect(await screen.findByRole('textbox', { name: 'Filter by Name' })).toHaveValue('Carlos_3');
});

test.each([WithFilters, WithClearAllFilters, WithOccupationFilter])(
  'renders a filter story in every bundled locale: %s',
  (Story) => {
    try {
      for (const locale of ['en', 'es', 'fr', 'gx']) {
        setLocale(locale);
        const strings = getStrings();
        const view = render(<Story />);
        expect(screen.getByRole('combobox', { name: `${strings.TABLE_FILTER}: Occupation` })).toBeInTheDocument();
        fireEvent.click(screen.getByLabelText(`${strings.TABLE_COLUMN_ACTIONS}: Name`));
        expect(
          screen.getByRole('menuitem', { name: strings.TABLE_SORT_ASCENDING.replace('{column}', 'Name') })
        ).toHaveTextContent(strings.TABLE_SORT_ASCENDING.replace('{column}', 'Name'));
        expect(screen.getByRole('menuitem', { name: strings.TABLE_CLEAR_SORTING })).toHaveAttribute(
          'aria-disabled',
          'true'
        );
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

test('paginates and renders pinned columns with sticky offsets', () => {
  render(
    <EditableTableV2
      columns={columns}
      data={data}
      clearAllFiltersLabel='Clear'
      enableColumnPinning
      tableOptions={{
        initialState: { pagination: { pageSize: 1, pageIndex: 0 }, columnPinning: { start: ['name'], end: ['count'] } },
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

test('pins columns and restores hidden columns directly from header action menus', () => {
  render(<EditableTableV2 columns={columns} data={data} clearAllFiltersLabel='Clear' enableColumnPinning />);
  fireEvent.click(screen.getByLabelText('Column actions: Count'));
  fireEvent.click(screen.getByRole('menuitem', { name: 'Pin to end' }));
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
  expect(screen.getByLabelText('Filtered: Name')).toBeInTheDocument();
  fireEvent.change(screen.getByLabelText('Search'), { target: { value: 'missing' } });
  fireEvent.click(screen.getByLabelText('Clear search'));
  expect(rowNames()).toEqual(['Zebra']);
  expect(screen.getByLabelText('Filtered: Name')).toBeInTheDocument();
  fireEvent.click(screen.getByLabelText('Column actions: Name'));
  fireEvent.click(screen.getByRole('menuitem', { name: 'Clear filter' }));
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

test('can disable per-column action buttons', () => {
  render(<EditableTableV2 columns={columns} data={data} clearAllFiltersLabel='Clear' enableColumnActions={false} />);
  expect(screen.queryByLabelText('Column actions: Name')).not.toBeInTheDocument();
});
