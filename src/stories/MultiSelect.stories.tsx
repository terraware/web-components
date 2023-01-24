import { Story } from '@storybook/react';
import React, {useState} from 'react';
import MultiSelect, { MultiSelectProps } from '../components/MultiSelect';

export default {
  title: 'MultiSelect',
  component: MultiSelect,
};

const Template: Story<MultiSelectProps<number>> = (args) => {
  const [selectedOptions, setSelectedOptions] = useState<number[]>([]);

  const handleAdd = (id: number) => {
    const newOptions = [...selectedOptions];
    newOptions.push(id);
    setSelectedOptions(newOptions);
  };

  const handleRemove = (id: number) => {
    const newOptions = [...selectedOptions];
    const index = newOptions.findIndex((value) => id === value);
    newOptions.splice(index, 1);
    setSelectedOptions(newOptions);
  };

  return <MultiSelect {...args} selectedOptions={selectedOptions} onAdd={handleAdd} onRemove={handleRemove} />;
};

export const Default = Template.bind({});

const defaultOptions = new Map<number, string>([
  [1, 'eggs'], [2, 'potatoes'], [3, 'spam'], [4, 'bacon'], [5, 'beans'], [6, 'spam'], [7, 'spam'], [8, 'spam']
]);

Default.args = {
  label: 'Breakfast order:',
  tooltipTitle: 'Please make your selection below...',
  helperText: 'Maybe some nice spam?',
  placeHolder: 'Select...',
  options: defaultOptions,
  selectedOptions: [1, 2, 4, 5],
  onAdd: (id: number) => window.alert(`You added item ${id}`),
  onRemove: (id: number) => window.alert(`You removed item ${id}`),
};
