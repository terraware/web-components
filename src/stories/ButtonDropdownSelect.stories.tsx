import type { Meta, StoryObj } from '@storybook/react';
import { DropdownItem } from '../components/types';

import ButtonDropdownSelect from '../components/ButtonDropdownSelect';

const meta = {
  title: 'ButtonDropdownSelect',
  component: ButtonDropdownSelect,
  parameters: {
    layout: 'centered',
  },
} satisfies Meta<typeof ButtonDropdownSelect>;

export default meta;
type Story = StoryObj<typeof meta>;

const onChangeSelection = (selection: DropdownItem[]) => {
  const labelsList = selection.map((s) => s.label).join(', ');
  const valuesList = selection.map((s) => s.value.toString()).join(', ');
  alert(`New selection\nLabels = ${labelsList}\nValues = ${valuesList}`);
};

export const Default: Story = {
  args: {
    id: 'storybook',
    options: [
      {
        label: 'One',
        value: 1,
      },
      {
        label: 'Two',
        value: 2,
      },
      {
        label: 'Three',
        value: 3,
      },
    ],
    initialSelection: [
      {
        label: 'One',
        value: 1,
      },
      {
        label: 'Three',
        value: 3,
      },
    ],
    buttonIcon: 'iconLayers',
    buttonLabel: 'Layers',
    menuAlign: 'left',
    onChange: onChangeSelection,
    buttonStyle: 'terraware',
  },
};
