import { Story } from '@storybook/react';
import React from 'react';
import NavItem, { NavItemProps } from '../components/Navbar/NavItem';
import Navbar from '../components/Navbar/Navbar';

export default {
  title: 'NavItem',
  component: NavItem,
};

const Template : Story<NavItemProps> = (args : NavItemProps) => {
  // eslint-disable-next-line @typescript-eslint/no-empty-function
  const showNavbar = () => {};

  return  (
    <Navbar setShowNavBar={showNavbar}>
      <NavItem {...args} />
    </Navbar>);
};

export const Default = Template.bind({});

Default.args = {
  label: 'Species',
  icon: 'species',
  selected: true,
  onClick: () => window.alert('you clicked species'),
};