import { Story } from '@storybook/react';
import React from 'react';
import PageForm, { PageFormProps } from '../components/PageForm';

export default {
  title: 'PageForm',
  component: PageForm,
};

const Template: Story<PageFormProps> = (args) => {
  return <PageForm {...args} />;
};

export const Default = Template.bind({});

Default.args = {
  children: 'Hello World',
  cancelID: 'cancel-id',
  saveID: 'save-id',
  onCancel: () => { return; },
  onSave: async () => {
    return new Promise((resolve, reject) => {
      setTimeout(() => resolve(), 2000);
    });
  },
  cancelButtonText: 'cancel',
  saveButtonText: 'save',
  saveDisabled: false,
  hideEdit: false,
};

export const WithAdditionalButtons = Template.bind({});
WithAdditionalButtons.args = {
  ...Default.args,
  additionalRightButtons: [
    {
      id: 'id-right',
      text: 'right',
      disabled: false,
      onClick: () => window.alert('you clicked right'),
      buttonPriority: 'primary',
      buttonType: 'passive',
    }
  ],
};
