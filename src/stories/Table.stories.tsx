import React, { useCallback, useMemo, useState } from 'react';

import { Box } from '@mui/material';
import { Story } from '@storybook/react';

import CellRenderer from '../components/table/TableCellRenderer';
import Table, { EnhancedTopBarSelectionProps, Props as TableProps } from '../components/table/index';
import { RendererProps } from '../components/table/types';

export default {
  title: 'Table',
  component: Table,
  argTypes: {
    density: {
      options: ['comfortable', 'compact', 'roomy'],
      control: { type: 'radio' },
    },
  },
};

function Renderer(props: RendererProps<any>): JSX.Element {
  const { column } = props;

  if (column.key === 'middlename') {
    return <CellRenderer {...props} sx={{ fontStyle: 'italic' }} />;
  }

  return <CellRenderer {...props} />;
}

const TableWithState = (
  args: Omit<TableProps<{ name: string; lastname: string }>, 'rows'> & { rowCount: number; currentPage?: number }
) => {
  const [selectedRows, setSelectedRows] = useState<any>([]);

  const rows: any = useMemo(() => {
    return Array(args.rowCount)
      .fill({ name: '', middlename: '', lastname: '', occupation: '' })
      .map((i, j) => {
        if (j % 2 === 0) {
          return {
            name: `Constanza_${j}-${args.currentPage ?? ''}`,
            middlename: '',
            lastname: 'Uanini',
            occupation: 'Artist',
            date: '2023-02-03',
            pets: 5,
          };
        } else if (j % 3 === 0) {
          return {
            name: `Carlos_${j}-${args.currentPage ?? ''}`,
            middlename: '--',
            lastname: 'Thurber',
            occupation: 'Freelancer',
            available: 'false',
            date: '2023-04-12',
            pets: 10,
          };
        } else {
          return {
            name: `Jane${j}-${args.currentPage ?? ''}`,
            middlename: 'John',
            lastname: 'Doe',
            occupation: 'Business analyst',
            available: true,
            date: '2023-04-27',
            pets: 12,
            previousStudies: 'natural Sciences, social Sciences',
          };
        }
      });
  }, [args.rowCount, args.currentPage]);

  return (
    <Box paddingTop={args.showTopBar ? '50px' : 0} display='flex' flexGrow={1} flexDirection='column'>
      <Table
        {...args}
        rows={rows}
        Renderer={Renderer}
        selectedRows={selectedRows}
        setSelectedRows={setSelectedRows}
        topBarButtons={[
          {
            buttonType: 'productive',
            buttonText: 'Click',
            onButtonClick: () => window.alert('click'),
          },
          {
            buttonType: 'passive',
            buttonText: 'Disabled',
            onButtonClick: () => window.alert('you should not see this'),
            disabled: true,
          },
          {
            buttonType: 'passive',
            buttonText: 'Tooltip',
            onButtonClick: () => window.alert('you should not see this either'),
            disabled: true,
            tooltipTitle:
              'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.',
          },
        ]}
        tableComments='* Data collected in 2024'
      />
    </Box>
  );
};

const Template: Story<Omit<TableProps<{ name: string; lastname: string }>, 'rows'> & { rowCount: number }> = (args) => (
  <TableWithState {...args} />
);

export const PageChangeCallback: Story<
  Omit<TableProps<{ name: string; lastname: string }>, 'rows'> & { rowCount: number }
> = (args) => {
  const [currentPage, setCurrentPage] = useState(1);
  const onPageChange = useCallback((newPage: number) => {
    // this is just showing off that that page number is being controlled outside the table component
    const customizedPage = newPage * 2;
    alert(`New Page: ${customizedPage}`);
    setCurrentPage(customizedPage);
  }, []);

  return <TableWithState {...args} onPageChange={onPageChange} currentPage={currentPage} />;
};

export const Default = Template.bind({});
export const Selectable = Template.bind({});
export const Presorted = Template.bind({});
export const ShowTopBar = Template.bind({});
export const ShowTopBarV2 = Template.bind({});

Default.args = {
  orderBy: 'name',
  columns: [
    { key: 'name', name: 'Name', type: 'string' },
    {
      key: 'middlename',
      name: 'Middlename',
      type: 'string',
      tooltipTitle: 'Middle name is optional',
      sx: { fontStyle: 'italic' },
    },
    { key: 'lastname', name: 'Lastname', type: 'string' },
    { key: 'occupation', name: 'Occupation', type: 'string' },
    { key: 'available', name: 'Available', type: 'boolean' },
    { key: 'previousStudies', name: 'Previous Studies', type: 'string', alignment: 'right' },
    { key: 'date', name: 'Date', type: 'string', tooltipTitle: 'Right aligend with tooltip', alignment: 'right' },
    { key: 'pets', name: 'Pets', type: 'string', alignment: 'right' },
  ],
  rowCount: 201,
  showTopBar: false,
  booleanFalseText: 'No',
  booleanTrueText: 'Yes',
  editText: 'Edit',
  renderNumSelectedText: (num) => `${num} selected`,
  renderPaginationText: (from, to, total) => `${from} to ${to} of ${total}`,
  density: 'comfortable',
};

Selectable.args = {
  ...Default.args,
  showCheckbox: true,
  controlledOnSelect: true,
};

Presorted.args = {
  ...Default.args,
  isPresorted: true,
};

ShowTopBar.args = {
  ...Default.args,
  showCheckbox: true,
  controlledOnSelect: true,
  showTopBar: true,
};

const enhancedTopBarSelectionConfig: EnhancedTopBarSelectionProps = {
  renderEnhancedNumSelectedText(selectedCount: number, pageCount: number): string {
    switch (true) {
      case selectedCount === 1 && pageCount === 1: {
        return `${selectedCount} row selected.`;
      }
      case selectedCount > 1 && pageCount === 1: {
        return `${selectedCount} rows selected.`;
      }
      case selectedCount === 1 && pageCount > 1: {
        return `${selectedCount} row selected across ${pageCount} pages.`;
      }
      case selectedCount > 1 && pageCount > 1: {
        return `${selectedCount} rows selected across ${pageCount} pages.`;
      }
    }

    return '';
  },
  renderSelectAllText(rowsCount: number): string {
    return `Select all ${rowsCount} rows`;
  },
  renderSelectNoneText(): string {
    return 'Clear selection';
  },
};

ShowTopBarV2.args = {
  ...Default.args,
  showCheckbox: true,
  controlledOnSelect: true,
  showTopBar: true,
  enhancedTopBarSelectionConfig,
};

PageChangeCallback.args = {
  ...Default.args,
  maxItemsPerPage: 10,
  totalRowCount: 279,
};
