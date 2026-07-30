import React, { useState } from 'react';

import { Story } from '@storybook/react';

import PhotoChooser, { PhotoChooserProps } from '../components/PhotoChooser';

const SAMPLE_IMAGE =
  'data:image/svg+xml;utf8,<svg xmlns="http://www.w3.org/2000/svg" width="120" height="120"><rect width="120" height="120" fill="%234f8a5b"/></svg>';

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

const ExistingTemplate: Story<PhotoChooserProps & { initialExistingPhotos?: string[] }> = ({
  initialExistingPhotos = [],
  ...args
}) => {
  const [existingPhotos, setExistingPhotos] = useState<string[]>(initialExistingPhotos);

  return (
    <PhotoChooser
      {...args}
      existingPhotos={existingPhotos}
      onExistingPhotoRemoved={(index) => setExistingPhotos((prev) => prev.filter((_, i) => i !== index))}
    />
  );
};

export const WithExistingImages = ExistingTemplate.bind({});
WithExistingImages.args = {
  onPhotosChanged: (data) => data.length && window.alert(`${data.length} new photos`),
  multipleSelection: true,
  initialExistingPhotos: [SAMPLE_IMAGE],
  existingImagesLabel: 'Existing images',
  newImagesLabel: 'New images',
  uploadText: 'Upload a photo',
  uploadDescription: 'Select any photo from your device',
  photoSelectedText: 'Photo selected',
  chooseFileText: 'Choose file',
  replaceFileText: 'Replace file',
};
