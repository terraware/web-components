import React from 'react';
import { action } from '@storybook/addon-actions';
import { Story } from '@storybook/react';
import { AntSwitch } from '../index';
import { AntSwitchProps } from '../components/AntSwitch';

export default {
  title: 'AntSwitch',
  component: AntSwitch,
};

const Template: Story<AntSwitchProps> = (args) => {
  const [checked, setChecked] = React.useState(false);
  const handleSwitch = (value: boolean) => {
      action('switch')(value);
      setChecked(value);
    };

  return (
    <AntSwitch {...args} checked={checked} onChange={handleSwitch}/>
  );
};

export const Default = Template.bind({});

Default.args = {
  disabled: false,
};
