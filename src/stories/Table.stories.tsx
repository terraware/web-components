import { Story } from '@storybook/react';
import React from 'react';
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

const Template: Story<TableProps<{ name: string; lastname: string }>> = (
  args
) => {
  const styles = useStyles();
  args.columns[1].className = styles.italic;

  return <Table {...args} Renderer={Renderer} />;
};

export const Default = Template.bind({});

Default.args = {
  orderBy: 'name',
  columns: [
    { key: 'name', name: 'Name', type: 'string' },
    { key: 'middlename', name: 'Middlename', type: 'string', tooltipTitle: 'Middle name is optional' },
    { key: 'lastname', name: 'Lastname', type: 'string' },
  ],
  rows: Array(50).fill({name: '', middlename: '', lastname: ''}).map((i, j) => {
    if (j % 2 === 0) {
      return { name: `Constanza_${j}`, middlename: '', lastname: 'Uanini' };
    } else if (j % 3 === 0) {
      return { name: `Carlos_${j}`, middlename: '--', lastname: 'Thurber' };
    } else {
      return { name: `Jane${j}`, middlename: 'John', lastname: 'Doe' };
    }
  }),
};

export const FloatingHeader = Template.bind({});

FloatingHeader.args = {
  ...Default.args,
  floatHeader: true,
};
