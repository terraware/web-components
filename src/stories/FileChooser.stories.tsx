import { Story } from '@storybook/react';
import React from 'react';
import FileChooser, { FileChooserProps } from '../components/FileChooser';

export default {
  title: 'FileChooser',
  component: FileChooser,
};

const Template: Story<FileChooserProps> = (args) => {
  return <FileChooser {...args} />;
};

export const Default = Template.bind({});
Default.args = {
  acceptFileType: 'image/*,application/*',
  chooseFileText: 'Choose File...',
  fileSelectedText: 'File selected',
  multipleSelection: false,
  replaceFileText: 'Replace file',
  setFiles: (files: File[]) => window.alert(`${files.length} files selected`),
  template: {
    text: 'Download a template here.',
    url: 'https://docs.google.com/document/d/1NkNoho843CE-6NM8rmmHfdAT7HJS6vWhfzezcvkj3yM/edit?usp=sharing',
  },
  uploadDescription: 'Browser or drag and drop files.',
  uploadText: 'Upload File(s)',
};

export const Multiple = Template.bind({});
Multiple.args = {
  acceptFileType: 'image/*,application/*',
  chooseFileText: 'Choose File...',
  fileSelectedText: 'File selected',
  replaceFileText: 'Replace file',
  setFiles: (files: File[]) => window.alert(`${files.length} files selected`),
  multipleSelection: true,
  uploadDescription: 'Browser or drag and drop files.',
  uploadText: 'Upload File(s)',
};
