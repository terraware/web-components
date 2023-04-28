import { Story } from '@storybook/react';
import React from 'react';
import SelectPhotos, { SelectPhotosProps } from '../components/SelectPhotos';

export default {
  title: 'SelectPhotos',
  component: SelectPhotos,
};

const Template: Story<SelectPhotosProps> = (args) => {
  return <SelectPhotos {...args} />;
};

export const Default = Template.bind({});
Default.args = {
  onPhotosChanged: () => window.alert('Photo selected!'),
  multipleSelection: false,
  uploadText: 'Upload a photo',
  uploadDescription: 'Select any photo from your device',
  photoSelectedText: 'Photo selected',
  chooseFileText: 'Choose file',
  replaceFileText: 'Replace file',
};

export const Multiple = Template.bind({});
Multiple.args = {
  onPhotosChanged: () => window.alert('Photos changed (added or deleted)'),
  multipleSelection: true,
  uploadText: 'Upload a photo',
  uploadDescription: 'Select any photo from your device',
  photoSelectedText: 'Photo selected',
  chooseFileText: 'Choose file',
  replaceFileText: 'Replace file',
};
