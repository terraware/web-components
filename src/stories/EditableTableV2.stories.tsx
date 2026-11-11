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
  const [data] = useState(() => createRows(rowCount));
  const withoutPagination = scenario === 'withoutPagination';
  const columns = useMemo<EditableTableColumnV2<RowData>[]>(() => {
    const allColumns: EditableTableColumnV2<RowData>[] = [
      {
        id: 'name',
        header: 'Name',
        accessorKey: 'name',
        size: 150,
      },
      { id: 'middlename', header: 'Middle Name', accessorKey: 'middlename', size: 150 },
      { id: 'lastname', header: 'Last Name', accessorKey: 'lastname', size: 150 },
      {
        id: 'occupation',
        header: 'Occupation',
        accessorKey: 'occupation',
        size: 180,
      },
      {
        id: 'available',
        header: 'Available',
        accessorKey: 'available',
        size: 120,
      },
      { id: 'date', header: 'Date', accessorKey: 'date', size: 130 },
      { id: 'pets', header: 'Pets', accessorKey: 'pets', size: 100 },
      {
        id: 'previousStudies',
        header: 'Previous Studies',
        accessorKey: 'previousStudies',
        size: 200,
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
