import React from 'react';

import { Story } from '@storybook/react';

import PhotoChooser, { PhotoChooserProps } from '../components/PhotoChooser';

export default {
  title: 'PhotoChooser',
  component: PhotoChooser,
};

const Template: Story<PhotoChooserProps> = (args) => {
  return <PhotoChooser {...args} />;
};

export const Default = Template.bind({});
Default.args = {
  onPhotosChanged: (data) => data.length && window.alert('Photo selected!'),
  multipleSelection: false,
  uploadText: 'Upload a photo',
  uploadDescription: 'Select any photo from your device',
  photoSelectedText: 'Photo selected',
  chooseFileText: 'Choose file',
  replaceFileText: 'Replace file',
};

export const Multiple = Template.bind({});
Multiple.args = {
  onPhotosChanged: (data) => data.length && window.alert(`${data.length} photos changed (added or deleted)`),
  multipleSelection: true,
  uploadText: 'Upload a photo',
  uploadDescription: 'Select any photo from your device',
  photoSelectedText: 'Photo selected',
  chooseFileText: 'Choose file',
  replaceFileText: 'Replace file',
  error: { title: 'Select photos please', text: 'Error selecting' },
};
