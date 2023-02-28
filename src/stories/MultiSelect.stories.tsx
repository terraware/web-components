import { Story } from '@storybook/react';
import React, {useState} from 'react';
import MultiSelect, { MultiSelectProps } from '../components/MultiSelect';

export default {
  title: 'MultiSelect',
  component: MultiSelect,
};

const Template: Story<MultiSelectProps<number, string>> = (args) => {
  const [selectedOptions, setSelectedOptions] = useState<number[]>([]);

  const handleAdd = (id: number) => {
    const newOptions = [...selectedOptions];
    newOptions.push(id);
    setSelectedOptions(newOptions);
  };

  const handleRemove = (id: number) => {
    const newOptions = [...selectedOptions];
    const index = newOptions.findIndex((value) => id === value);
    if (index >= 0) {
      newOptions.splice(index, 1);
      setSelectedOptions(newOptions);
    }
  };

  const onPillClick = (id: number) => {
    window.alert(`You clicked the ${defaultOptions.get(id)} pill!`);
  };

  const renderString = (v: string) => v;

  return <MultiSelect
    {...args}
    selectedOptions={selectedOptions}
    onAdd={handleAdd}
    onRemove={handleRemove}
    onPillClick={onPillClick}
    valueRenderer={renderString}
  />;
};

export const Default = Template.bind({});

const defaultOptions = new Map<number, string>([
  [1, 'eggs'], [2, 'potatoes'], [3, 'spam'], [4, 'bacon'], [5, 'beans'], [6, 'spam also'], [7, 'more spam']
]);

Default.args = {
  label: 'Breakfast order:',
  tooltipTitle: 'Please make your selection below...',
  helperText: 'Maybe some nice spam?',
  missingValuePlaceholder: '???',
  placeHolder: 'Select...',
  options: defaultOptions,
  disabled: false,
};
