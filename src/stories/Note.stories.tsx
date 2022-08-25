import { Story } from '@storybook/react';
import React from 'react';
import Note, { Props as NoteProps } from '../components/Note';

export default {
  title: 'Note',
  component: Note,
};

const Template: Story<NoteProps> = (args) => <Note {...args} />;

export const Default = Template.bind({});

Default.args = {
  children: 'Hello',
};
