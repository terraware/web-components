import React, { useState } from 'react';
import { action } from '@storybook/addon-actions';
import { Story } from '@storybook/react';
import Dropdown, { Props as DropdownV1Props, DropdownV1, DropdownProps } from '../components/Dropdown';

export default {
  title: 'Dropdown',
  component: Dropdown,
};

const DropdownV1Template: Story<DropdownV1Props> = (args) => {
  const [selected, setSelected] = React.useState('');
  const handleChange = (value: string) => {
    action('onChange')(value);
    setSelected(value);
  };

  return <DropdownV1 {...args} selected={selected} onChange={handleChange} />;
};

export const LegacyDropdown = DropdownV1Template.bind({});

LegacyDropdown.args = {
  id: '1',
  label: 'Legacy Dropdown',
  values: [
    { label: 'One', value: '1' },
    { label: 'Two', value: '2' },
  ],
};

const DropdownTemplate: Story<DropdownProps> = (args) => {
  const [selectedValue, setSelectedValue] = useState(args.selectedValue);

  const handleChange = (value: string) => {
    action('onChange')(value);
    setSelectedValue(value);
  };

  return <Dropdown {...args} onChange={handleChange} selectedValue={selectedValue} />;
};

export const Default = DropdownTemplate.bind({});

Default.args = {
  id: '1',
  label: 'Dropdown',
  placeholder: 'Select',
  options: [
    { label: 'One', value: '1' },
    { label: 'Two', value: '2' },
    { label: 'Three', value: '3', fontStyle: 'oblique' },
    { label: 'Four', value: '4', fontWeight: 'bold' },
    { label: 'Five', value: '5', fontStyle: 'italic', fontWeight: 'bold' },
    { label: 'Six', value: '6' },
    { label: 'Seven', value: '7' },
    { label: 'Eight', value: '8' },
    { label: 'Nine', value: '9' },
    { label: 'Ten', value: '10' },
  ],
  selectedValue: '2',
  tooltipTitle: 'A handy tooltip',
};

const DropdownAutocompleteTemplate: Story<DropdownProps> = (args) => {
  const [selectedValue, setSelectedValue] = useState(args.selectedValue);

  const handleChange = (value: string) => {
    action('onChange')(value);
    setSelectedValue(value);
  };

  return <Dropdown {...args} onChange={handleChange} selectedValue={selectedValue} autocomplete={true} />;
};

export const Autocomplete = DropdownAutocompleteTemplate.bind({});

Autocomplete.args = {
  hideClearIcon: true,
  id: '2',
  label: 'DropdownAutocomplete',
  placeholder: 'Select',
  options: [
    { label: 'One', value: '1' },
    { label: 'Two', value: '2' },
    { label: 'Three', value: '3', fontStyle: 'oblique' },
    { label: 'Four', value: '4', fontWeight: 'bold' },
    { label: 'Five', value: '5', fontStyle: 'italic', fontWeight: 'bold' },
    { label: 'Six', value: '6' },
    { label: 'Seven', value: '7' },
    { label: 'Eight', value: '8' },
    { label: 'Nine', value: '9' },
    { label: 'Ten', value: '10' },
  ],
  selectedValue: '2',
  tooltipTitle: 'A handy tooltip',
};
