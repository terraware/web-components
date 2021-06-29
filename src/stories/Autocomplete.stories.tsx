// YourComponent.stories.js

import { action } from '@storybook/addon-actions';
import { Story } from '@storybook/react';
import React from 'react';
import Autocomplete, {
  Props as AutocompleteProps,
} from '../components/Autocomplete';

export default {
  title: 'Autocomplete',
  component: Autocomplete,
};

const Template: Story<AutocompleteProps> = (args) => {
  const [selected, setSelected] = React.useState('');
  const handleChange = (id: string, value: string) => {
    action('onChange')(value);
    setSelected(value);
  };

  return <Autocomplete {...args} selected={selected} onChange={handleChange} />;
};

export const Default = Template.bind({});

Default.args = {
  id: '1',
  label: 'Test',
  values: ['Test 1', 'Test 2', 'Hello'],
  onChange: () => true,
  selected: '',
};
