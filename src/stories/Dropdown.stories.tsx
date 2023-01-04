import { action } from '@storybook/addon-actions';
import { Story } from '@storybook/react';
import React from 'react';
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
  const handleChange = (value: string) => {
    action('onChange')(value);
  };

  return <Dropdown {...args} onChange={handleChange} />;
};

export const Default = DropdownTemplate.bind({});

Default.args = {
  id: '1',
  label: 'Dropdown',
  placeholder: 'Select',
  options: [
    { label: 'One', value: '1' },
    { label: 'Two', value: '2' },
  ],
  selectedValue: '2',
  tooltipTitle: 'A handy tooltip',
};
