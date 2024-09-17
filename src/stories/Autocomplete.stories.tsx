import { action } from '@storybook/addon-actions';
import { Story } from '@storybook/react';
import { Box, useTheme } from '@mui/material';
import React, { useCallback } from 'react';
import Autocomplete, { ValueType, Props as AutocompleteProps } from '../components/Autocomplete/Autocomplete';

export default {
  title: 'Autocomplete',
  component: Autocomplete,
};

const Template: Story<AutocompleteProps> = (args) => {
  const theme = useTheme();
  const [selected, setSelected] = React.useState<ValueType>();
  const handleChange = (value: ValueType) => {
    action('onChange')(value);
    setSelected(value);
  };

  return (
    <Box sx={{ marginTop: '30px' }}>
      <Autocomplete
        {...args}
        selected={selected}
        onChange={handleChange}
        sx={{
          backgroundColor: theme.palette.TwClrBaseWhite,
          width: '300px',
        }}
      />
    </Box>
  );
};

const AsyncTemplate: Story<AutocompleteProps> = (args) => {
  const theme = useTheme();

  const [open, setOpen] = React.useState<boolean>(false);
  const [loading, setLoading] = React.useState<boolean>(false);
  const [selected, setSelected] = React.useState<ValueType>();
  const [options, setOptions] = React.useState<ValueType[]>([]);

  const sleep = (duration: number): Promise<void> => {
    return new Promise<void>((resolve) => {
      setTimeout(() => {
        resolve();
      }, duration);
    });
  };

  const load = useCallback(async () => {
    setLoading(true);
    await sleep(1e3);
    setLoading(false);
    setOptions([...args.options]);
  }, [setLoading, setOptions]);

  const handleOpen = useCallback(async () => {
    setOpen(true);
    await load();
  }, [setOpen, load]);

  const handleClose = () => {
    setOpen(false);
    setOptions([]);
  };

  const handleChange = (value: ValueType) => {
    action('onChange')(value);
    setSelected(value);
  };

  return (
    <Box sx={{ marginTop: '30px' }}>
      <Autocomplete
        {...args}
        open={open}
        onOpen={() => void handleOpen()}
        onClose={handleClose}
        selected={selected}
        loading={loading}
        options={options}
        onChange={handleChange}
        sx={{
          backgroundColor: theme.palette.TwClrBaseWhite,
          width: '300px',
        }}
      />
    </Box>
  );
};

export const Default = Template.bind({});

export const Complex = Template.bind({});

export const AsyncDefault = AsyncTemplate.bind({});


Default.args = {
  id: '1',
  label: 'Test',
  options: ['Test 1', 'Test 2', 'Hello'],
  onChange: () => true,
  selected: undefined,
  freeSolo: true,
  errorText: '',
};

Complex.args = {
  id: '2',
  label: 'Complex Objects',
  placeholder: 'Pick a value',
  options: [
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
  tooltipTitle: 'Hello world!',
};

AsyncDefault.args = {
  id: '3',
  label: 'Test',
  options: ['Test 1', 'Test 2', 'Hello'],
  freeSolo: true,
  errorText: '',
};