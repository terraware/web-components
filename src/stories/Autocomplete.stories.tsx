import { action } from '@storybook/addon-actions';
import { Story } from '@storybook/react';
import { Theme } from '@mui/material';
import React from 'react';
import Autocomplete, { ValueType, Props as AutocompleteProps } from '../components/Autocomplete/Autocomplete';
import { makeStyles } from '@mui/styles';

const useStyles = makeStyles((theme: Theme) => ({
  container: {
    width: '300px',
    backgroundColor: theme.palette.TwClrBaseWhite,
  },
}));

export default {
  title: 'Autocomplete',
  component: Autocomplete,
};

const Template: Story<AutocompleteProps> = (args) => {
  const classes = useStyles();
  const [selected, setSelected] = React.useState<ValueType>('');
  const handleChange = (value: ValueType) => {
    action('onChange')(value);
    setSelected(value);
  };

  return <Autocomplete {...args} selected={selected} onChange={handleChange} className={classes.container} />;
};

export const Default = Template.bind({});

export const Complex = Template.bind({});

Default.args = {
  id: '1',
  label: 'Test',
  values: ['Test 1', 'Test 2', 'Hello'],
  onChange: () => true,
  selected: '',
  freeSolo: true,
  errorText: '',
};

Complex.args = {
  id: '2',
  label: 'Complex Objects',
  placeholder: 'Pick a value',
  values: [
    {
      label: 'hello',
      value: 1,
    },
    {
      label: 'world',
      value: 2,
    },
    {
      label: 'yoyo',
      value: 3,
    },
    {
      label: 'ma',
      value: 4,
    },
  ],
  onChange: () => true,
  selected: undefined,
  hideClearIcon: true,
  errorText: '',
  isEqual: (option: any, value: any) => option.value === value.value,
};
