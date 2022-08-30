import { action } from '@storybook/addon-actions';
import { Story } from '@storybook/react';
import React from 'react';
import { Typography } from '@mui/material';
import Autocomplete, {
  Props as AutocompleteProps,
} from '../components/Autocomplete';

export default {
  title: 'Autocomplete',
  component: Autocomplete,
};

type Value = {
  scientificName: string;
  commonName?: string;
};

const defaultValue: Value = {
  scientificName: '',
  commonName: '',
};

const AutocompleteTemplate: Story<AutocompleteProps<Value>> = (args) => {
  const [selected, setSelected] = React.useState<Value>(defaultValue);
  const handleChange = (id: string, value: Value | string) => {
    action('onChange')(value);
    if (typeof value === 'string') {
      setSelected({ scientificName: value });
    } else {
      setSelected(value);
    }
  };

  const optionLabel = (option: any) => {
    if (typeof option === 'string') {
      return option as string;
    }
    const value = option as Value;

    return value.scientificName;
  };

  const optionSelected = (option: Value, value: Value) => {
    return option.scientificName === value.scientificName;
  };

  const renderOption = (props: object, option: Value, state: object) => {
    if (typeof option === 'string') {
      return (
        <div {...props}>{option as string}</div>
      );
    }

    return (
      <div {...props}>
        <Typography variant='body1' sx={{ fontWeight: 'bold' }}>{option.scientificName}</Typography>
        &nbsp;
        &nbsp;
        <Typography variant='body1' sx={{ fontStyle: 'italic' }}>({option.commonName})</Typography>
      </div>
    );
  };

  return (
    <Autocomplete
      {...args}
      selected={selected}
      onChange={handleChange}
      optionSelected={optionSelected}
      optionLabel={optionLabel}
      defaultValue={defaultValue}
      renderOption={renderOption}
    />
  );
};

export const AutocompleteStory = AutocompleteTemplate.bind({});

AutocompleteStory.args = {
  id: '1',
  label: 'Test',
  options: [
    {
      scientificName: 'sci 1',
      commonName: 'comm 1',
    },
    {
      scientificName: 'sci 2',
      commonName: 'comm 2',
    },
    {
      scientificName: 'sci 3',
      commonName: 'comm 3',
    },
  ],
  freeSolo: true
};
