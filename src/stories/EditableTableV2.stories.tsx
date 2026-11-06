import React, { useMemo, useState } from 'react';

import EditableTableV2, { EditableTableColumnV2 } from '../components/EditableTableV2';

export default { title: 'Editable Table V2', component: EditableTableV2 };

type Item = { id: string; name: string; status: string; target: number };

export const Editable = () => {
  const [data, setData] = useState<Item[]>(
    Array.from({ length: 30 }, (_, index) => ({
      id: String(index),
      name: `Indicator ${index}`,
      status: 'Active',
      target: index,
    }))
  );
  const columns = useMemo<EditableTableColumnV2<Item>[]>(() => {
    const onSave = (row: Item, value: unknown, id: string) =>
      setData((previous) =>
        previous.map((item) => (item.id === row.id ? { ...item, [id]: id === 'target' ? Number(value) : value } : item))
      );
    return [
      { id: 'name', header: 'Indicator', accessorKey: 'name', filterVariant: 'text', editConfig: { onSave } },
      {
        id: 'status',
        header: 'Status',
        accessorKey: 'status',
        filterVariant: 'select',
        filterSelectOptions: ['Active', 'Complete'],
        editConfig: {
          onSave,
          editVariant: 'select',
          selectOptions: [
            { label: 'Active', value: 'Active' },
            { label: 'Complete', value: 'Complete' },
          ],
        },
      },
      {
        id: 'target',
        header: 'Target',
        accessorKey: 'target',
        filterVariant: 'range',
        Cell: ({ cell }) => <strong>{cell.getValue<number>().toFixed(2)}</strong>,
        editConfig: { onSave },
      },
    ];
  }, []);
  return (
    <EditableTableV2
      columns={columns}
      data={data}
      clearAllFiltersLabel='Clear all filters'
      enableEditing
      enableGlobalFilter
      enableColumnFilters
      enableColumnOrdering
      enableColumnPinning
      stickyFilters
      storageKey='editable-table-v2-story'
      tableOptions={{
        getRowId: (row) => row.id,
        initialState: { columnPinning: { start: ['name'], end: ['target'] } },
      }}
    />
  );
};
