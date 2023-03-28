import React, { useState } from 'react';
import { action } from '@storybook/addon-actions';
import { Story } from '@storybook/react';
import PopoverMenu, { PopoverMenuProps } from '../components/PopoverMenu';
import { DropdownItem } from '../components/types';

export default {
  title: 'PopoverMenu',
  component: PopoverMenu,
};

const PopoverMenuTemplate: Story<PopoverMenuProps> = (args) => {
  return <PopoverMenu {...args} />;
};

export const Default = PopoverMenuTemplate.bind({});

Default.args = {
  anchor: (
    <>
      <span>Test</span>
      <span>Anchor</span>
    </>
  ),
  menuSections: [
    [{ label: 'Menu Above', value: 'Menu Above' }],
    [{ label: 'Menu Below', value: 'Menu Below' }],
  ],
  onClick: (item: DropdownItem) => window.alert(`you clicked ${item.value}`),
};

export const ItemizedOnClick = PopoverMenuTemplate.bind({});

ItemizedOnClick.args = {
  anchor: 'Test Itemized Onclick',
  menuSections: [
    [{ label: 'Menu Above', value: 'Menu Above', onClick: () => window.alert('You clicked menu above') }],
    [{ label: 'Menu Below', value: 'Menu Below', onClick: () => window.alert('You clicked menu below') }],
  ],
};