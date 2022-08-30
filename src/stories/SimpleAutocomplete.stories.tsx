import { action } from '@storybook/addon-actions';
import { Story } from '@storybook/react';
import React from 'react';
import  {
  SimpleAutocompleteProps,
  SimpleAutocomplete,
} from '../components/Autocomplete';

export default {
  title: 'SimpleAutocomplete',
  component: SimpleAutocomplete,
};

const Template: Story<SimpleAutocompleteProps> = (args) => {
  const [selected, setSelected] = React.useState('');
  const handleChange = (id: string, value: string) => {
    action('onChange')(value);
    setSelected(value);
  };

  return <SimpleAutocomplete {...args} selected={selected} onChange={handleChange} />;
};

export const Default = Template.bind({});

Default.args = {
  id: '1',
  label: 'Test',
  options: ['Test 1', 'Test 2', 'Hello'],
  onChange: () => true,
  selected: '',
};
