import { action } from '@storybook/addon-actions';
import { Story } from '@storybook/react';
import React from 'react';
import TextArea from '../components/TextArea';
import { Props as TextAreaProps } from '../components/TextField';

export default {
  title: 'TextArea',
  component: TextArea,
};

const Template: Story<TextAreaProps> = (args) => {
  const [value, setValue] = React.useState('');
  const handleChange = (id: string, _value: unknown) => {
    action('onChange')(_value);
    setValue(_value as string);
  };

  return <TextArea {...args} value={value} onChange={handleChange} />;
};

export const Default = Template.bind({});

Default.args = {
  id: '1',
  label: 'Text Area',
};
