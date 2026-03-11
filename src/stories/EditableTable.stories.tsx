import React, { useMemo, useState } from 'react';

import { Link, Typography } from '@mui/material';
import { Story } from '@storybook/react';

import EditableTable, { EditableTableColumn } from '../components/EditableTable';

export default {
  title: 'Editable Table',
  component: EditableTable,
};

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

const EditableTableWithState = ({ rowCount }: { rowCount: number }) => {
  const [data, setData] = useState<RowData[]>(() => {
    return Array(rowCount)
      .fill(null)
      .map((_, j) => {
        if (j % 2 === 0) {
          return {
            id: `${j}`,
            name: `Constanza_${j}`,
            middlename: '',
            lastname: 'Uanini',
            occupation: 'Artist',
            date: '2023-02-03',
            pets: 5,
            available: 'yes',
          };
        } else if (j % 3 === 0) {
          return {
            id: `${j}`,
            name: `Carlos_${j}`,
            middlename: '--',
            lastname: 'Thurber',
            occupation: 'Freelancer',
            available: 'no',
            date: '2023-04-12',
            pets: 10,
          };
        } else {
          return {
            id: `${j}`,
            name: `Jane${j}`,
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
  });

  const columns = useMemo<EditableTableColumn<RowData>[]>(
    () => [
      {
        id: 'name',
        header: 'Name',
        accessorKey: 'name',
        size: 150,
        editConfig: {
          onSave: (row, value, columnId) => {
            setData((prev) => prev.map((item) => (item.id === row.id ? { ...item, [columnId]: value } : item)));
          },
        },
      },
      {
        id: 'middlename',
        header: 'Middle Name',
        accessorKey: 'middlename',
        size: 150,
        editConfig: {
          onSave: (row, value, columnId) => {
            setData((prev) => prev.map((item) => (item.id === row.id ? { ...item, [columnId]: value } : item)));
          },
        },
      },
      {
        id: 'lastname',
        header: 'Last Name',
        accessorKey: 'lastname',
        size: 150,
        editConfig: {
          onSave: (row, value, columnId) => {
            setData((prev) => prev.map((item) => (item.id === row.id ? { ...item, [columnId]: value } : item)));
          },
        },
      },
      {
        id: 'occupation',
        header: 'Occupation',
        accessorKey: 'occupation',
        size: 180,
        editConfig: {
          editVariant: 'select',
          selectOptions: [
            { label: 'Artist', value: 'Artist' },
            { label: 'Freelancer', value: 'Freelancer' },
            { label: 'Business analyst', value: 'Business analyst' },
            { label: 'Developer', value: 'Developer' },
            { label: 'Designer', value: 'Designer' },
          ],
          onSave: (row, value, columnId) => {
            setData((prev) => prev.map((item) => (item.id === row.id ? { ...item, [columnId]: value } : item)));
          },
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
          onSave: (row, value, columnId) => {
            setData((prev) => prev.map((item) => (item.id === row.id ? { ...item, [columnId]: value } : item)));
          },
        },
      },
      {
        id: 'date',
        header: 'Date',
        accessorKey: 'date',
        size: 130,
        editConfig: {
          onSave: (row, value, columnId) => {
            setData((prev) => prev.map((item) => (item.id === row.id ? { ...item, [columnId]: value } : item)));
          },
        },
      },
      {
        id: 'pets',
        header: 'Pets',
        accessorKey: 'pets',
        size: 100,
        editConfig: {
          onSave: (row, value, columnId) => {
            const numValue = parseInt(value, 10);
            if (!isNaN(numValue)) {
              setData((prev) => prev.map((item) => (item.id === row.id ? { ...item, [columnId]: numValue } : item)));
            }
          },
        },
      },
      {
        id: 'previousStudies',
        header: 'Previous Studies',
        accessorKey: 'previousStudies',
        size: 200,
        editConfig: {
          onSave: (row, value, columnId) => {
            setData((prev) => prev.map((item) => (item.id === row.id ? { ...item, [columnId]: value } : item)));
          },
        },
      },
    ],
    []
  );

  return (
    <EditableTable<RowData>
      columns={columns}
      data={data}
      enableEditing={true}
      enableSorting={true}
      enablePagination={true}
      initialSorting={[{ id: 'name', desc: false }]}
    />
  );
};

const Template: Story<{ rowCount: number }> = (args) => <EditableTableWithState {...args} />;

export const Default = Template.bind({});

Default.args = {
  rowCount: 50,
};

export const WithFilters: Story = () => {
  const rowCount = 50;
  const [data, setData] = useState<RowData[]>(() => {
    return Array(rowCount)
      .fill(null)
      .map((_, j) => {
        if (j % 2 === 0) {
          return {
            id: `${j}`,
            name: `Constanza_${j}`,
            middlename: '',
            lastname: 'Uanini',
            occupation: 'Artist',
            date: '2023-02-03',
            pets: 5,
            available: 'yes',
          };
        } else if (j % 3 === 0) {
          return {
            id: `${j}`,
            name: `Carlos_${j}`,
            middlename: '--',
            lastname: 'Thurber',
            occupation: 'Freelancer',
            available: 'no',
            date: '2023-04-12',
            pets: 10,
          };
        } else {
          return {
            id: `${j}`,
            name: `Jane${j}`,
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
  });

  const columns = useMemo<EditableTableColumn<RowData>[]>(
    () => [
      {
        id: 'name',
        header: 'Name',
        accessorKey: 'name',
        size: 150,
        filterVariant: 'text',
        editConfig: {
          onSave: (row, value, columnId) => {
            setData((prev) => prev.map((item) => (item.id === row.id ? { ...item, [columnId]: value } : item)));
          },
        },
      },
      {
        id: 'occupation',
        header: 'Occupation',
        accessorKey: 'occupation',
        size: 180,
        filterVariant: 'select',
        filterSelectOptions: ['Artist', 'Freelancer', 'Business analyst', 'Developer', 'Designer'],
        editConfig: {
          editVariant: 'select',
          selectOptions: [
            { label: 'Artist', value: 'Artist' },
            { label: 'Freelancer', value: 'Freelancer' },
            { label: 'Business analyst', value: 'Business analyst' },
            { label: 'Developer', value: 'Developer' },
            { label: 'Designer', value: 'Designer' },
          ],
          onSave: (row, value, columnId) => {
            setData((prev) => prev.map((item) => (item.id === row.id ? { ...item, [columnId]: value } : item)));
          },
        },
      },
      {
        id: 'available',
        header: 'Available',
        accessorKey: 'available',
        size: 120,
        filterVariant: 'select',
        filterSelectOptions: ['yes', 'no'],
        editConfig: {
          editVariant: 'select',
          selectOptions: [
            { label: 'Yes', value: 'yes' },
            { label: 'No', value: 'no' },
          ],
          onSave: (row, value, columnId) => {
            setData((prev) => prev.map((item) => (item.id === row.id ? { ...item, [columnId]: value } : item)));
          },
        },
      },
    ],
    []
  );

  return (
    <EditableTable<RowData>
      columns={columns}
      data={data}
      enableEditing={true}
      enableGlobalFilter={true}
      enableColumnFilters={true}
      enableSorting={true}
      enablePagination={true}
    />
  );
};

export const WithClearAllFilters: Story = () => {
  const rowCount = 50;
  const [data, setData] = useState<RowData[]>(() => {
    return Array(rowCount)
      .fill(null)
      .map((_, j) => {
        if (j % 2 === 0) {
          return {
            id: `${j}`,
            name: `Constanza_${j}`,
            middlename: '',
            lastname: 'Uanini',
            occupation: 'Artist',
            date: '2023-02-03',
            pets: 5,
            available: 'yes',
          };
        } else if (j % 3 === 0) {
          return {
            id: `${j}`,
            name: `Carlos_${j}`,
            middlename: '--',
            lastname: 'Thurber',
            occupation: 'Freelancer',
            available: 'no',
            date: '2023-04-12',
            pets: 10,
          };
        } else {
          return {
            id: `${j}`,
            name: `Jane${j}`,
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
  });

  const columns = useMemo<EditableTableColumn<RowData>[]>(
    () => [
      {
        id: 'name',
        header: 'Name',
        accessorKey: 'name',
        size: 150,
        filterVariant: 'text',
        editConfig: {
          onSave: (row, value, columnId) => {
            setData((prev) => prev.map((item) => (item.id === row.id ? { ...item, [columnId]: value } : item)));
          },
        },
      },
      {
        id: 'occupation',
        header: 'Occupation',
        accessorKey: 'occupation',
        size: 180,
        filterVariant: 'select',
        filterSelectOptions: ['Artist', 'Freelancer', 'Business analyst', 'Developer', 'Designer'],
        editConfig: {
          editVariant: 'select',
          selectOptions: [
            { label: 'Artist', value: 'Artist' },
            { label: 'Freelancer', value: 'Freelancer' },
            { label: 'Business analyst', value: 'Business analyst' },
            { label: 'Developer', value: 'Developer' },
            { label: 'Designer', value: 'Designer' },
          ],
          onSave: (row, value, columnId) => {
            setData((prev) => prev.map((item) => (item.id === row.id ? { ...item, [columnId]: value } : item)));
          },
        },
      },
      {
        id: 'available',
        header: 'Available',
        accessorKey: 'available',
        size: 120,
        filterVariant: 'select',
        filterSelectOptions: ['yes', 'no'],
        editConfig: {
          editVariant: 'select',
          selectOptions: [
            { label: 'Yes', value: 'yes' },
            { label: 'No', value: 'no' },
          ],
          onSave: (row, value, columnId) => {
            setData((prev) => prev.map((item) => (item.id === row.id ? { ...item, [columnId]: value } : item)));
          },
        },
      },
    ],
    []
  );

  return (
    <EditableTable<RowData>
      clearAllFiltersLabel='Clear All Filters'
      columns={columns}
      data={data}
      enableColumnFilters={true}
      enableGlobalFilter={true}
      enablePagination={true}
      enableSorting={true}
      onClearAllFilters={() => console.log('All filters cleared')}
    />
  );
};

export const WithOccupationFilter: Story = () => {
  const rowCount = 50;
  const [data, setData] = useState<RowData[]>(() => {
    return Array(rowCount)
      .fill(null)
      .map((_, j) => {
        if (j % 2 === 0) {
          return {
            id: `${j}`,
            name: `Constanza_${j}`,
            middlename: '',
            lastname: 'Uanini',
            occupation: 'Artist',
            date: '2023-02-03',
            pets: 5,
            available: 'yes',
          };
        } else if (j % 3 === 0) {
          return {
            id: `${j}`,
            name: `Carlos_${j}`,
            middlename: '--',
            lastname: 'Thurber',
            occupation: 'Freelancer',
            available: 'no',
            date: '2023-04-12',
            pets: 10,
          };
        } else {
          return {
            id: `${j}`,
            name: `Jane${j}`,
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
  });

  const columns = useMemo<EditableTableColumn<RowData>[]>(
    () => [
      {
        id: 'name',
        header: 'Name',
        accessorKey: 'name',
        size: 150,
        editConfig: {
          onSave: (row, value, columnId) => {
            setData((prev) => prev.map((item) => (item.id === row.id ? { ...item, [columnId]: value } : item)));
          },
        },
      },
      {
        id: 'occupation',
        header: 'Occupation',
        accessorKey: 'occupation',
        size: 180,
        filterVariant: 'select',
        filterSelectOptions: ['Artist', 'Freelancer', 'Business analyst', 'Developer', 'Designer'],
        editConfig: {
          editVariant: 'select',
          selectOptions: [
            { label: 'Artist', value: 'Artist' },
            { label: 'Freelancer', value: 'Freelancer' },
            { label: 'Business analyst', value: 'Business analyst' },
            { label: 'Developer', value: 'Developer' },
            { label: 'Designer', value: 'Designer' },
          ],
          onSave: (row, value, columnId) => {
            setData((prev) => prev.map((item) => (item.id === row.id ? { ...item, [columnId]: value } : item)));
          },
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
          onSave: (row, value, columnId) => {
            setData((prev) => prev.map((item) => (item.id === row.id ? { ...item, [columnId]: value } : item)));
          },
        },
      },
    ],
    []
  );

  return (
    <EditableTable<RowData>
      columns={columns}
      data={data}
      enableEditing={true}
      enableColumnFilters={true}
      enableSorting={true}
      enablePagination={true}
    />
  );
};

export const SortingFn: Story = () => {
  type SimpleRow = { id: string; value: string };

  const data: SimpleRow[] = [
    { id: '1', value: '15372' },
    { id: '2', value: '1467' },
    { id: '3', value: '20' },
    { id: '4', value: '113' },
    { id: '5', value: '13770' },
  ];

  const columns = useMemo<EditableTableColumn<SimpleRow>[]>(
    () => [
      {
        id: 'noSorting',
        header: 'Without Sorting Function',
        accessorKey: 'value',
        size: 200,
      },
      {
        id: 'withSorting',
        header: 'With Alphanumeric Sorting Function',
        accessorKey: 'value',
        size: 200,
        sortingFn: 'alphanumeric',
      },
    ],
    []
  );

  return (
    <>
      <Typography>Clicking the headers to see the difference</Typography>
      <EditableTable<SimpleRow> columns={columns} data={data} enableSorting={true} enablePagination={false} />
      <Typography>
        Note this only makes a difference if there are fewer than 10 rows. Otherwise it will determine the correct
        function to use (see this{' '}
        <Link target='_blank' href={'https://github.com/TanStack/table/issues/4908'}>
          Github Issue
        </Link>
        )
      </Typography>
    </>
  );
};

export const WithoutPagination: Story = () => {
  const rowCount = 20;
  const [data, setData] = useState<RowData[]>(() => {
    return Array(rowCount)
      .fill(null)
      .map((_, j) => {
        if (j % 2 === 0) {
          return {
            id: `${j}`,
            name: `Constanza_${j}`,
            middlename: '',
            lastname: 'Uanini',
            occupation: 'Artist',
            date: '2023-02-03',
            pets: 5,
            available: 'yes',
          };
        } else if (j % 3 === 0) {
          return {
            id: `${j}`,
            name: `Carlos_${j}`,
            middlename: '--',
            lastname: 'Thurber',
            occupation: 'Freelancer',
            available: 'no',
            date: '2023-04-12',
            pets: 10,
          };
        } else {
          return {
            id: `${j}`,
            name: `Jane${j}`,
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
  });

  const columns = useMemo<EditableTableColumn<RowData>[]>(
    () => [
      {
        id: 'name',
        header: 'Name',
        accessorKey: 'name',
        size: 150,
        editConfig: {
          onSave: (row, value, columnId) => {
            setData((prev) => prev.map((item) => (item.id === row.id ? { ...item, [columnId]: value } : item)));
          },
        },
      },
      {
        id: 'lastname',
        header: 'Last Name',
        accessorKey: 'lastname',
        size: 150,
        editConfig: {
          onSave: (row, value, columnId) => {
            setData((prev) => prev.map((item) => (item.id === row.id ? { ...item, [columnId]: value } : item)));
          },
        },
      },
      {
        id: 'occupation',
        header: 'Occupation',
        accessorKey: 'occupation',
        size: 180,
        editConfig: {
          editVariant: 'select',
          selectOptions: [
            { label: 'Artist', value: 'Artist' },
            { label: 'Freelancer', value: 'Freelancer' },
            { label: 'Business analyst', value: 'Business analyst' },
          ],
          onSave: (row, value, columnId) => {
            setData((prev) => prev.map((item) => (item.id === row.id ? { ...item, [columnId]: value } : item)));
          },
        },
      },
    ],
    []
  );

  return (
    <EditableTable<RowData>
      columns={columns}
      data={data}
      enableEditing={true}
      enablePagination={false}
      enableBottomToolbar={false}
      enableSorting={true}
    />
  );
};
