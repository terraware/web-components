import React from 'react';

import { fireEvent, render, screen, within } from '@testing-library/react';

import EditableTableV2, { EditableTableColumnV2 } from '.';

const data = [{ name: 'Acacia koa', count: 12 }];
const columns: EditableTableColumnV2<(typeof data)[number]>[] = [
  { id: 'name', header: 'Name', accessorKey: 'name', editConfig: { onSave: async () => {} } },
  { id: 'count', header: 'Count', accessorKey: 'count' },
];

test('highlights global matches without changing values or the editor, and clears highlights with the query', () => {
  render(
    <EditableTableV2 columns={columns} data={data} clearAllFiltersLabel='Clear' enableGlobalFilter enableEditing />
  );
  expect(screen.queryByRole('note')).not.toBeInTheDocument();
  fireEvent.change(screen.getByLabelText('Search'), { target: { value: 'ACA' } });
  const match = screen.getByRole('note', { name: 'Acacia koa' });
  expect(match).toHaveTextContent('Acacia koa');
  expect(within(match).getByText('Aca')).toHaveStyle({ padding: '2px 1px', borderRadius: '2px' });
  fireEvent.doubleClick(match.closest('td')!);
  expect(screen.getByRole('textbox', { name: 'Name' })).toHaveValue('Acacia koa');
  expect(screen.queryByRole('note')).not.toBeInTheDocument();
  fireEvent.keyDown(screen.getByRole('textbox', { name: 'Name' }), { key: 'Escape' });
  fireEvent.change(screen.getByLabelText('Search'), { target: { value: '12' } });
  expect(screen.getByRole('note', { name: '12' })).toHaveTextContent('12');
  fireEvent.click(screen.getByLabelText('Clear search'));
  expect(screen.queryByRole('note')).not.toBeInTheDocument();
  fireEvent.change(screen.getByLabelText('Search'), { target: { value: 'missing' } });
  expect(screen.queryByRole('note')).not.toBeInTheDocument();
});

test('lets custom renderers opt into renderedCellValue and respects highlighting opt-outs', () => {
  const customColumns: typeof columns = [
    { ...columns[0], Cell: ({ renderedCellValue }) => <a href='/tree'>{renderedCellValue}</a> },
    { ...columns[0], id: 'raw', Cell: ({ cell }) => <button>{String(cell.getValue())}</button> },
    { ...columns[0], id: 'disabled', enableFilterMatchHighlighting: false },
  ];
  const props = { columns: customColumns, data, clearAllFiltersLabel: 'Clear', enableGlobalFilter: true };
  const { rerender } = render(<EditableTableV2 {...props} />);
  fireEvent.change(screen.getByLabelText('Search'), { target: { value: 'aca' } });
  expect(within(screen.getByRole('link')).getByRole('note')).toHaveAccessibleName('Acacia koa');
  expect(within(screen.getByRole('button', { name: 'Acacia koa' })).queryByRole('note')).not.toBeInTheDocument();
  expect(screen.getAllByRole('note')).toHaveLength(1);
  rerender(<EditableTableV2 {...props} enableFilterMatchHighlighting={false} />);
  expect(screen.queryByRole('note')).not.toBeInTheDocument();
});
