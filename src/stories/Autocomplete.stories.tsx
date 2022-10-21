import { action } from '@storybook/addon-actions';
import { Story } from '@storybook/react';
import { Theme } from '@mui/material';
import React from 'react';
import Autocomplete, {
  Props as AutocompleteProps,
} from '../components/Autocomplete/Autocomplete';
import { makeStyles } from '@mui/styles';

const useStyles = makeStyles((theme: Theme) => ({
  container: {
    width: '300px',
    backgroundColor: theme.palette.ClrBaseWhite,
  },
}));

export default {
  title: 'Autocomplete',
  component: Autocomplete,
};

const Template: Story<AutocompleteProps> = (args) => {
  const classes = useStyles();
  const [selected, setSelected] = React.useState('');
  const handleChange = (id: string, value: string) => {
    action('onChange')(value);
    setSelected(value);
  };

  return <Autocomplete {...args} selected={selected} onChange={handleChange} className={classes.container} />;
};

export const Default = Template.bind({});

export const V1 = Template.bind({});

Default.args = {
  id: '1',
  label: 'Test',
  values: ['Test 1', 'Test 2', 'Hello'],
  onChange: () => true,
  selected: '',
};

V1.args = {
  id: '1',
  label: 'Test',
  values: ['Test 1', 'Test 2', 'Hello'],
  onChange: () => true,
  selected: '',
  isV1: true,
};
