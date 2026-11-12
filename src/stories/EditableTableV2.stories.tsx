import React, { useMemo, useState } from 'react';

import { StoryFn } from '@storybook/react';

import EditableTableV2, { EditableTableColumnV2 } from '../components/EditableTableV2';
import EditableTableExportButton from './EditableTableExportButton';

export default { title: 'Editable Table V2', component: EditableTableV2 };

type RowData = {
  id: string;
  name: string;
  middlename: string;
  lastname: string;
  occupation: string;
  available: string;
  date: string;
  pets: number;
  previousStudies?: string;
};

type Scenario = 'default' | 'filters' | 'clearAllFilters' | 'occupationFilter' | 'withoutPagination';

const createRows = (rowCount: number): RowData[] =>
  Array.from({ length: rowCount }, (_, index) => {
    if (index % 2 === 0) {
      return {
        id: String(index),
        name: `Constanza_${index}`,
        middlename: '',
        lastname: 'Uanini',
        occupation: 'Artist',
        date: '2023-02-03',
        pets: 5,
        available: 'yes',
      };
    } else if (index % 3 === 0) {
      return {
        id: String(index),
        name: `Carlos_${index}`,
        middlename: '--',
        lastname: 'Thurber',
        occupation: 'Freelancer',
        available: 'no',
        date: '2023-04-12',
        pets: 10,
      };
    } else {
      return {
        id: String(index),
        name: `Jane${index}`,
        middlename: 'John',
        lastname: 'Doe',
        occupation: 'Business analyst',
        available: 'yes',
        date: '2023-04-27',
        pets: 12,
        previousStudies: 'Natural Sciences, Social Sciences',
      };
    }
  });

const EditableTableWithStateV2 = ({
  rowCount = 50,
  scenario = 'default',
}: {
  rowCount?: number;
  scenario?: Scenario;
}) => {
  const [data, setData] = useState(() => createRows(rowCount));
  const withoutPagination = scenario === 'withoutPagination';
  const columns = useMemo<EditableTableColumnV2<RowData>[]>(() => {
    const onSave = (row: RowData, value: unknown, columnId: string) => {
      const nextValue = columnId === 'pets' ? parseInt(String(value), 10) : value;
      if (typeof nextValue !== 'number' || !isNaN(nextValue)) {
        setData((previous) => previous.map((item) => (item.id === row.id ? { ...item, [columnId]: nextValue } : item)));
      }
    };
    const occupations = ['Artist', 'Freelancer', 'Business analyst', 'Developer', 'Designer'];
    const allColumns: EditableTableColumnV2<RowData>[] = [
      {
        id: 'name',
        header: 'Name',
        accessorKey: 'name',
        size: 150,

        editConfig: { onSave },
      },
      { id: 'middlename', header: 'Middle Name', accessorKey: 'middlename', size: 150, editConfig: { onSave } },
      { id: 'lastname', header: 'Last Name', accessorKey: 'lastname', size: 150, editConfig: { onSave } },
      {
        id: 'occupation',
        header: 'Occupation',
        accessorKey: 'occupation',
        size: 180,

        editConfig: {
          editVariant: 'select',
          selectOptions: (withoutPagination ? occupations.slice(0, 3) : occupations).map((value) => ({
            label: value,
            value,
          })),
          onSave,
        },
      },
      {
        id: 'available',
        header: 'Available',
        accessorKey: 'available',
        size: 120,

        editConfig: {
          editVariant: 'select',
          selectOptions: [
            { label: 'Yes', value: 'yes' },
            { label: 'No', value: 'no' },
          ],
          onSave,
        },
      },
      { id: 'date', header: 'Date', accessorKey: 'date', size: 130, editConfig: { onSave } },
      { id: 'pets', header: 'Pets', accessorKey: 'pets', size: 100, editConfig: { onSave } },
      {
        id: 'previousStudies',
        header: 'Previous Studies',
        accessorKey: 'previousStudies',
        size: 200,
        editConfig: { onSave },
      },
    ];
    const columnIds =
      scenario === 'default'
        ? allColumns.map((column) => column.id)
        : withoutPagination
          ? ['name', 'lastname', 'occupation']
          : ['name', 'occupation', 'available'];
    return allColumns.filter((column) => columnIds.includes(column.id));
  }, [scenario, withoutPagination]);

  return (
    <EditableTableV2
      clearAllFiltersLabel={scenario === 'clearAllFilters' ? 'Clear All Filters' : 'Clear all filters'}
      columns={columns}
      data={data}
      enableEditing={scenario !== 'clearAllFilters'}
      enableSorting
      enablePagination={!withoutPagination}
      enableBottomToolbar={!withoutPagination}
      initialSorting={scenario === 'default' ? [{ id: 'name', desc: false }] : undefined}
    />
  );
};

const Template: StoryFn<{ rowCount: number }> = (args) => <EditableTableWithStateV2 {...args} />;

export const Default = Template.bind({});
Default.args = { rowCount: 50 };

export const WithoutPagination = () => <EditableTableWithStateV2 scenario='withoutPagination' rowCount={20} />;

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
      { id: 'name', header: 'Indicator', accessorKey: 'name', editConfig: { onSave } },
      {
        id: 'status',
        header: 'Status',
        accessorKey: 'status',

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
      tableOptions={{
        getRowId: (row) => row.id,
      }}
    />
  );
};
