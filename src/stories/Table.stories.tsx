import { Story } from '@storybook/react';
import React, { useState } from 'react';
import Table, { EnhancedTopBarSelectionProps, Props as TableProps } from '../components/table/index';
import CellRenderer from '..//components/table/TableCellRenderer';
import { RendererProps } from '../components/table/types';
import { Box } from '@mui/material';
import { makeStyles } from '@mui/styles';

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

const Template: Story<TableProps<{ name: string; lastname: string }>> = (args) => {
  const classes = useStyles();
  const [selectedRows, setSelectedRows] = useState<any>([]);
  const styles = useStyles();
  args.columns[1].className = styles.italic;

  return (
    <Box paddingTop={args.showTopBar ? '50px' : 0} display='flex' flexGrow={1} flexDirection='column'>
      <Table
        {...args}
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
            tooltipTitle: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.',
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
    { key: 'name', name: 'Name', type: 'string', sticky: 'left' },
    { key: 'middlename', name: 'Middlename', type: 'string', tooltipTitle: 'Middle name is optional' },
    { key: 'lastname', name: 'Lastname', type: 'string' },
    { key: 'occupation', name: 'Occupation', type: 'string' },
    { key: 'available', name: 'Available', type: 'boolean' },
    { key: 'pets', name: 'Pets', type: 'string' },
  ],
  rows: Array(150)
    .fill({ name: '', middlename: '', lastname: '', occupation: '' })
    .map((i, j) => {
      if (j % 2 === 0) {
        return { name: `Constanza_${j}`, middlename: '', lastname: 'Uanini', occupation: 'Artist', date: '2023-02-03', pets: 5 };
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
        };
      }
    }),
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
    return `${selectedCount} selected across ${pageCount} pages`;
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
