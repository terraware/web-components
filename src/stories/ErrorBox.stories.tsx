import { Story } from '@storybook/react';
import React from 'react';
import ErrorBox, { Props as ErrorBoxProps } from '../components/ErrorBox/ErrorBox';

export default {
  title: 'ErrorBox',
  component: ErrorBox,
};

const Template: Story<ErrorBoxProps> = (args) => {
  return (
    <ErrorBox
      {...args}
      text={'This is an error message'}
      title={'Error Title'}
      buttonText={'Help!'}
      onClick={() => window.alert('You clicked help.')}
    />
  );
};

export const Default = Template.bind({});

Default.args = {
  text: 'This is an error message',
  title: 'Error Title',
  buttonText: 'Help!',
  onClick: () => window.alert('You clicked help.')
};
