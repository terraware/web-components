import React, { StrictMode, useState } from 'react';

import { act, fireEvent, render, screen, waitFor, within } from '@testing-library/react';
import userEvent from '@testing-library/user-event';

import EditableTableV2, { EditableTableColumnPinningV2, EditableTableColumnV2, EditableTableInstanceV2 } from '.';
import { WithTopToolbar as WithTopToolbarLegacy } from '../../stories/EditableTable.stories';
import {
  Editable,
  WithClearAllFilters,
  WithColumnDragging,
  WithFilters,
  WithMrtProps,
  WithOccupationFilter,
  WithPinnedColumns,
  WithTopToolbar,
} from '../../stories/EditableTableV2.stories';
import { getStrings, setLocale } from '../../strings';

type Item = { id: string; name: string; count: number };
test('renders main table story configurations without React key warnings', () => {
  const errors = rs.spyOn(console, 'error').mockImplementation(() => {});
  try {
    for (const Story of [WithTopToolbar, WithColumnDragging, WithFilters, WithPinnedColumns, WithMrtProps, Editable]) {
      const { unmount } = render(<Story />);
      unmount();
    }
    expect(errors.mock.calls.filter((args) => args.some((arg) => /unique.*key/i.test(String(arg))))).toEqual([]);
  } finally {
    errors.mockRestore();
  }
});

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

test.each(['left', 'right'] as const)(
  'places custom toolbar actions and the %s search in MRT order',
  (positionGlobalFilter) => {
    const custom = rs.fn(({ table }) => <button>Rows: {table.getRowModel().rows.length}</button>);
    render(
      <EditableTableV2
        columns={columns}
        data={data}
        clearAllFiltersLabel='Clear'
        enableGlobalFilter
        positionGlobalFilter={positionGlobalFilter}
        renderTopToolbarCustomActions={custom}
        renderToolbarInternalActions={() => <button>Internal</button>}
      />
    );
    const search = screen.getByRole('textbox', { name: 'Search' });
    const actions = screen.getByRole('button', { name: 'Rows: 2' });
    expect(!!(search.compareDocumentPosition(actions) & Node.DOCUMENT_POSITION_FOLLOWING)).toBe(
      positionGlobalFilter === 'left'
    );
    expect(
      actions.compareDocumentPosition(screen.getByRole('button', { name: 'Internal' })) &
        Node.DOCUMENT_POSITION_FOLLOWING
    ).toBeTruthy();
    expect(custom).toHaveBeenCalled();
  }
);

test('removes only the per-column show-all action and avoids a trailing divider', () => {
  render(
    <EditableTableV2
      columns={columns}
      data={data}
      clearAllFiltersLabel='Clear'
      enableShowAllColumnsMenuItem={false}
      showColumnsButton
    />
  );
  fireEvent.click(screen.getByLabelText('Column actions: Name'));
  expect(screen.queryByText('Show all columns')).not.toBeInTheDocument();
  const items = within(screen.getByRole('menu')).getAllByRole('menuitem');
  expect(items.at(-1)).not.toHaveClass('MuiMenuItem-divider');
  fireEvent.keyDown(screen.getByRole('menu'), { key: 'Escape' });
  fireEvent.click(screen.getByLabelText('Columns'));
  expect(screen.getByRole('button', { name: 'Show all' })).toBeInTheDocument();
  expect(screen.getByRole('button', { name: 'Hide all' })).toBeInTheDocument();
});

test.each([false, true])('merges cell props and preserves table interactions (function form: %s)', (functionForm) => {
  const onClick = rs.fn();
  const onDoubleClick = rs.fn();
  const onKeyDown = rs.fn();
  const onRowClick = rs.fn();
  const headProps = { title: 'Custom head', sx: { padding: '3px' }, onClick };
  const bodyProps = { title: 'Custom body', sx: [{ padding: '5px' }], onClick, onDoubleClick, onKeyDown };
  const head = rs.fn(({ column, table }) => {
    expect(table.getColumn(column.id)).toBe(column);
    return headProps;
  });
  const body = rs.fn(({ cell, column, row, table }) => {
    expect(cell.column).toBe(column);
    expect(cell.row).toBe(row);
    expect(table.getRowModel().rows).toContain(row);
    return bodyProps;
  });
  render(
    <EditableTableV2
      columns={columns}
      data={data}
      clearAllFiltersLabel='Clear'
      enableEditing
      enableColumnPinning
      onRowClick={onRowClick}
      muiTableHeadCellProps={functionForm ? head : headProps}
      muiTableBodyCellProps={functionForm ? body : bodyProps}
      tableOptions={{ initialState: { columnPinning: { left: ['name'], right: [] } } }}
    />
  );
  const headers = screen.getAllByRole('columnheader');
  expect(headers[0]).toHaveAttribute('data-pinned', 'true');
  expect(headers[1]).not.toHaveAttribute('data-pinned');
  expect(headers[0].querySelector('.Mui-TableHeadCell-Content-Wrapper')).toHaveTextContent('Name');
  expect(headers[0]).toHaveStyle({ padding: '3px' });
  fireEvent.click(within(headers[0]).getByRole('button', { name: 'Name' }));
  expect(onClick).toHaveBeenCalled();
  expect(rowNames()).toEqual(['Acacia', 'Zebra']);
  let cells = within(screen.getAllByRole('row')[1]).getAllByRole('cell');
  expect(cells[0]).toHaveAttribute('data-pinned', 'true');
  expect(cells[0]).toHaveAttribute('title', 'Custom body');
  expect(cells[0]).toHaveStyle({ padding: '5px' });
  fireEvent.click(cells[1]);
  expect(onRowClick).toHaveBeenCalledTimes(1);
  fireEvent.click(cells[0]);
  expect(onRowClick).toHaveBeenCalledTimes(1);
  fireEvent.doubleClick(cells[0]);
  expect(onDoubleClick).toHaveBeenCalledTimes(1);
  expect(screen.getByRole('textbox', { name: 'Name' })).toBeInTheDocument();
  fireEvent.keyDown(screen.getByRole('textbox', { name: 'Name' }), { key: 'Escape' });
  cells = within(screen.getAllByRole('row')[1]).getAllByRole('cell');
  fireEvent.keyDown(cells[0], { key: 'F2' });
  expect(onKeyDown).toHaveBeenCalledTimes(1);
  expect(screen.getByRole('textbox', { name: 'Name' })).toBeInTheDocument();
  if (functionForm) {
    expect(head).toHaveBeenCalled();
    expect(body).toHaveBeenCalled();
  } else {
    expect(head).not.toHaveBeenCalled();
    expect(body).not.toHaveBeenCalled();
  }
});

test('matches the MRT handle icon, tooltip, and header action placement', async () => {
  const user = userEvent.setup();
  render(
    <EditableTableV2 columns={columns} data={[]} clearAllFiltersLabel='Clear' enableColumnOrdering showColumnsButton />
  );
  const header = screen.getAllByRole('columnheader')[0];
  const handle = within(header).getByLabelText('Drag column: Name');
  expect(within(handle).getByTestId('DragHandleIcon')).toBeInTheDocument();
  const buttons = within(header).getAllByRole('button');
  expect(buttons.map((button) => button.getAttribute('aria-label'))).toEqual([
    null,
    'Drag column: Name',
    'Column actions: Name',
  ]);
  await user.hover(handle);
  expect(await screen.findByRole('tooltip')).toHaveTextContent('Move');
  await user.unhover(handle);
  fireEvent.click(screen.getByRole('button', { name: 'Columns' }));
  const item = within(screen.getByRole('menu')).getByLabelText('Drag column: Name').closest('li')!;
  expect(within(item).getAllByRole('button')[0]).toHaveAttribute('aria-label', 'Drag column: Name');
  expect(within(item).getByTestId('DragHandleIcon')).toBeInTheDocument();
});

test.each([
  { enableColumnDragging: false, enableColumnOrdering: false, handles: 0 },
  { enableColumnDragging: true, enableColumnOrdering: false, handles: 2 },
  { enableColumnDragging: false, enableColumnOrdering: true, handles: 2 },
])('gates header and manager dragging: %j', (props) => {
  render(<EditableTableV2 columns={columns} data={[]} clearAllFiltersLabel='Clear' showColumnsButton {...props} />);
  expect(screen.queryAllByLabelText(/^Drag column:/)).toHaveLength(props.handles);
  fireEvent.click(screen.getByRole('button', { name: 'Columns' }));
  expect(within(screen.getByRole('menu')).queryAllByLabelText(/^Drag column:/)).toHaveLength(
    props.enableColumnOrdering ? 2 : 0
  );
});

test.each([
  { start: [], reordered: true, controlled: false, cancel: false },
  { start: ['name', 'count'], reordered: true, controlled: false, cancel: false },
  { start: ['name'], reordered: false, controlled: false, cancel: false },
  { start: [], reordered: false, controlled: true, cancel: false },
  { start: [], reordered: false, controlled: false, cancel: true },
])('handles keyboard column drops: %j', async ({ start, reordered, controlled, cancel }) => {
  const user = userEvent.setup();
  const onColumnOrderChange = rs.fn((updater: string[] | ((previous: string[]) => string[])) =>
    typeof updater === 'function' ? updater(['name', 'count']) : updater
  );
  render(
    <EditableTableV2
      columns={columns}
      data={data}
      clearAllFiltersLabel='Clear'
      enableColumnDragging
      enableColumnPinning
      tableOptions={{
        initialState: { columnPinning: { left: start, right: [] } },
        ...(controlled && { state: { columnOrder: ['name', 'count'] }, onColumnOrderChange }),
      }}
    />
  );
  const headers = screen.getAllByRole('columnheader');
  headers.forEach((header, index) => {
    header.getBoundingClientRect = () => ({
      x: index * 200,
      y: 0,
      left: index * 200,
      right: (index + 1) * 200,
      top: 0,
      bottom: 50,
      width: 200,
      height: 50,
      toJSON: () => ({}),
    });
  });
  screen.getByLabelText('Drag column: Name').focus();
  await user.keyboard('[Space]');
  expect(screen.getByTestId('column-drag-overlay')).toHaveTextContent('Name');
  expect(headers[0]).toHaveStyle({ outline: '1px dashed #9e9e9e' });
  await user.keyboard('[ArrowRight]');
  await user.keyboard(cancel ? '[Escape]' : '[Space]');
  expect(screen.queryByTestId('column-drag-overlay')).not.toBeInTheDocument();
  await waitFor(() => expect(screen.getAllByRole('columnheader')[0]).toHaveTextContent(reordered ? 'Count' : 'Name'));
  expect(within(screen.getAllByRole('row')[1]).getAllByRole('cell')[0]).toHaveTextContent(reordered ? '3' : 'Zebra');
  if (controlled) {
    expect(onColumnOrderChange.mock.results[0].value).toEqual(['count', 'name']);
  }
});

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
    render(
      <EditableTableV2
        columns={columns}
        data={[]}
        clearAllFiltersLabel='Clear'
        enableColumnPinning
        tableOptions={{ initialState: { columnPinning } }}
      />
    );
    expect(screen.getByRole('columnheader', { name: /Name/ }).getAttribute('data-pinned')).toBe(
      'left' in columnPinning ? 'true' : null
    );
    expect(screen.getByRole('columnheader', { name: /Count/ }).getAttribute('data-pinned')).toBe(
      'right' in columnPinning ? 'true' : null
    );
    fireEvent.click(screen.getByLabelText('Column actions: Name'));
    fireEvent.click(screen.getByRole('menuitem', { name: 'Pin to right' }));
    expect(screen.getByRole('columnheader', { name: /Name/ })).toHaveAttribute('data-pinned', 'true');
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
      renderTopToolbarCustomActions={inspect}
    />
  );
  const callsBeforeEmptyData = inspect.mock.calls.length;
  rerender(
    <EditableTableV2
      columns={definitions}
      data={[]}
      clearAllFiltersLabel='Clear'
      renderTopToolbarCustomActions={inspect}
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
        renderTopToolbarCustomActions={({ table: instance }) => {
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
