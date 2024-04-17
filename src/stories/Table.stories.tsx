import React, { useEffect, useState } from 'react';
import { Story } from '@storybook/react';
import { Box } from '@mui/material';
import { makeStyles } from '@mui/styles';
import Table, { EnhancedTopBarSelectionProps, Props as TableProps } from '../components/table/index';
import CellRenderer from '../components/table/TableCellRenderer';
import { RendererProps } from '../components/table/types';

const useStyles = makeStyles(() => ({
  italic: {
    fontStyle: 'italic',
  },
}));

export default {
  title: 'Table',
  component: Table,
};

function Renderer(props: RendererProps<any>): JSX.Element {
  const { column } = props;
  const classes = useStyles();

  if (column.key === 'middlename') {
    return <CellRenderer {...props} className={classes.italic} />;
  }

  return <CellRenderer {...props} />;
}

const Template: Story<Omit<TableProps<{ name: string; lastname: string }>, 'rows'> & { rowCount: number }> = (args) => {
  const classes = useStyles();
  const styles = useStyles();

  const [selectedRows, setSelectedRows] = useState<any>([]);
  const [rows, setRows] = useState<any>([]);

  args.columns[1].className = styles.italic;

  useEffect(() => {
    const nextRows = Array(args.rowCount)
      .fill({ name: '', middlename: '', lastname: '', occupation: '' })
      .map((i, j) => {
        if (j % 2 === 0) {
          return {
            name: `Constanza_${j}`,
            middlename: '',
            lastname: 'Uanini',
            occupation: 'Artist',
            date: '2023-02-03',
            pets: 5,
          };
        } else if (j % 3 === 0) {
          return {
            name: `Carlos_${j}`,
            middlename: '--',
            lastname: 'Thurber',
            occupation: 'Freelancer',
            available: 'false',
            date: '2023-04-12',
            pets: 10,
          };
        } else {
          return {
            name: `Jane${j}`,
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

    setRows(nextRows);
  }, [args.rowCount]);

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
      />
    </Box>
  );
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
    { key: 'middlename', name: 'Middlename', type: 'string', tooltipTitle: 'Middle name is optional' },
    { key: 'lastname', name: 'Lastname', type: 'string' },
    { key: 'occupation', name: 'Occupation', type: 'string' },
    { key: 'available', name: 'Available', type: 'boolean' },
    { key: 'previousStudies', name: 'Previous Studies', type: 'string', alignment: 'right' },
    { key: 'date', name: 'Date', type: 'string', tooltipTitle: 'Right aligend with tooltip', alignment: 'right' },
    { key: 'pets', name: 'Pets', type: 'string', alignment: 'right' },
  ],
  rowCount: 150,
  showTopBar: false,
  booleanFalseText: 'No',
  booleanTrueText: 'Yes',
  editText: 'Edit',
  renderNumSelectedText: (num) => `${num} selected`,
  renderPaginationText: (from, to, total) => `${from} to ${to} of ${total}`,
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
