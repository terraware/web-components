import { action } from '@storybook/addon-actions';
import { Story } from '@storybook/react';
import React from 'react';
import { makeStyles } from '@mui/styles';
import Checkbox, { Props as CheckboxProps } from '../components/Checkbox';

export default {
  title: 'Checkbox',
  component: Checkbox,
};

const useStyles = makeStyles(() => ({
  narrowWidth: {
    width: '200px',
  },
}));

const Template: Story<CheckboxProps> = (args) => {
  const [value, setValue] = React.useState(true);
  const toggleChange = (_value: boolean) => {
    action('onChange')(_value);
    setValue(_value);
  };

  const classes = useStyles();
  const className = classes.narrowWidth;

  return <Checkbox {...args} onChange={toggleChange} value={value} className={className} />;
};

export const Default = Template.bind({});
export const TopAlignLongLabel = Template.bind({});

Default.args = {
  id: '1',
  name: 'Test',
  label: 'Test',
  disabled: false,
};

TopAlignLongLabel.args = {
  id: '2',
  name: 'Alignment Test',
  label: 'The Quick Brown Fox Jumped Over The Silly Lazy Goat',
  disabled: false,
};
