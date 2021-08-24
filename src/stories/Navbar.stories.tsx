// YourComponent.stories.js

import { Story } from '@storybook/react';
import React from 'react';
import Navbar, { Props as NavbarProps } from '../components/Navbar/Navbar';
import NavItem from '../components/Navbar/NavItem';
import SubNavbar from '../components/Navbar/SubNavbar';

export default {
  title: 'Navbar',
  component: Navbar,
  argTypes: {
    type: {
      options: ['productive', 'passive', 'destructive'],
      control: { type: 'radio' },
    },
    priority: {
      options: ['primary', 'secondary'],
      control: { type: 'radio' },
    },
    size: {
      options: ['small', 'medium', 'large', 'xlarge'],
      control: { type: 'radio' },
    },
    icon: {
      options: ['lock', 'caretDown', 'plus', null],
      control: { type: 'radio' },
    },
  },
};

const Template: Story<NavbarProps> = (args) => {
  return (
    <Navbar>
      <NavItem label='Home' icon='lock' />
      <NavItem label='Seeds' icon='lock'>
        <SubNavbar>
          <NavItem label='Summary' />
          <NavItem label='Accessions' />
        </SubNavbar>
      </NavItem>
      <NavItem label='Plants' icon='lock' />
      <NavItem label='Species' icon='lock' />
    </Navbar>
  );
};

export const Default = Template.bind({});
