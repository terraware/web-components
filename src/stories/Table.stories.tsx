import { Story } from '@storybook/react';
import React, { useState } from 'react';
import Table, { Props as TableProps } from '../components/table/index';
import CellRenderer from '..//components/table/TableCellRenderer';
import { RendererProps } from '../components/table/types';

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
  const [selectedRows, setSelectedRows] = useState<any>([]);
  const styles = useStyles();
  args.columns[1].className = styles.italic;

  return (
    <Table
      {...args}
      Renderer={Renderer}
      selectedRows={selectedRows}
      setSelectedRows={setSelectedRows}
      topBarButtons={
        [
          {
            buttonType: 'productive',
            buttonText: 'Click',
            onButtonClick: () => window.alert('click')
          },
          {
            buttonType: 'passive',
            buttonText: 'Disabled',
            onButtonClick: () => window.alert('you should not see this'),
            disabled: true,
          },
        ]
      }
    />
  );
};

export const Default = Template.bind({});
export const Selectable = Template.bind({});

Default.args = {
  orderBy: 'name',
  columns: [
    { key: 'name', name: 'Name', type: 'string' },
    { key: 'middlename', name: 'Middlename', type: 'string', tooltipTitle: 'Middle name is optional' },
    { key: 'lastname', name: 'Lastname', type: 'string' },
    { key: 'occupation', name: 'Occupation', type: 'string' },
  ],
  rows: Array(50)
    .fill({ name: '', middlename: '', lastname: '', occupation: '' })
    .map((i, j) => {
      if (j % 2 === 0) {
        return { name: `Constanza_${j}`, middlename: '', lastname: 'Uanini', occupation: 'Artist' };
      } else if (j % 3 === 0) {
        return { name: `Carlos_${j}`, middlename: '--', lastname: 'Thurber', occupation: 'Freelancer' };
      } else {
        return { name: `Jane${j}`, middlename: 'John', lastname: 'Doe', occupation: 'Business analyst' };
      }
    }),
  showTopBar: false,
};

Selectable.args = {
  ...Default.args,
  showCheckbox: true,
  controlledOnSelect: true,
};
