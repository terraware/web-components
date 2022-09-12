import { Story } from '@storybook/react';
import React from 'react';
import { Typography } from '@mui/material';
import Select, { SelectProps } from '../components/Select/Select';
import SelectT, { SelectTProps } from '../components/Select/SelectT';

export default {
  title: 'Select',
  component: Select,
};

const Template: Story<SelectProps> = (args) => {
  // tslint:disable-next-line:no-unused-vars
  const [value, setValue] = React.useState('');
  const handleChange = (str: string) => {
    setValue(str);
  };

  return <Select {...args} onChange={handleChange} />;
};

export const Default = Template.bind({});

Default.args = {
  label: 'Field Label',
  disabled: false,
  helperText: 'Help Text',
  placeholder: 'placeholder',
  errorText: '',
  warningText: '',
  readonly: false,
  options: ['test 1', 'test 2', 'test 3'],
  selectedValue: 'test 2',
};

type Value = {
  name?: string;
  age?: number;
};

const TemplateSelectT: Story<SelectTProps<Value>> = (args) => {
  // tslint:disable-next-line:no-unused-vars
  const [value, setValue] = React.useState<Value>({});
  const handleChange = (val: Value) => {
    setValue(val);
  };

  const isEqual = (A: Value, B: Value) => {
    return A.name === B.name && A.age === B.age;
  };

  const renderOption = (option: Value) => {
    return (
      <div>
        <Typography component='p' sx={{fontWeight: 'bold', fontSize: '12px', display: 'inline-block'}}>{option.name}</Typography>
        &nbsp;
        <Typography component='p' sx={{fontStyle: 'italic', fontSize: '10px', display: 'inline-block'}}>({option.age})</Typography>
      </div>
    );
  };

  const toT = (input: string) => ({ name: input });

  const displayLabel = (option: any) => {
    return (option as Value)?.name || '';
  };

  return (
    <SelectT
      {...args}
      onChange={handleChange}
      isEqual={isEqual}
      renderOption={renderOption}
      toT={toT}
      displayLabel={displayLabel}
    />
  );
};

export const ComplexSelect = TemplateSelectT.bind({});

ComplexSelect.args = {
  label: 'Field Label',
  disabled: false,
  helperText: 'Help Text',
  placeholder: 'placeholder',
  errorText: '',
  warningText: '',
  readonly: false,
  options: [{
    name: 'Dora',
    age: 5
  }, {
    name: 'Eeyore',
    age: 8
  }, {
    name: 'Yoda',
    age: 500
  }],
  selectedValue: {
    name: 'Eeyore',
    age: 8
  },
};
