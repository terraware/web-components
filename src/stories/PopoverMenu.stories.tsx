import React from 'react';

import { Box } from '@mui/material';
import { Story } from '@storybook/react';
import { expect, userEvent, waitFor, within } from 'storybook/test';

import PopoverMenu, { PopoverMenuProps } from '../components/PopoverMenu';
import { DropdownItem } from '../components/types';

export default {
  title: 'PopoverMenu',
  component: PopoverMenu,
};

const PopoverMenuTemplate: Story<PopoverMenuProps> = (args) => {
  return (
    <Box display='flex' justifyContent='space-between'>
      <PopoverMenu {...args} />
      <PopoverMenu {...args} />
      <PopoverMenu {...args} />
    </Box>
  );
};

const openMenu: NonNullable<Story<PopoverMenuProps>['play']> = async ({ canvasElement }) => {
  await userEvent.click(within(canvasElement).getAllByRole('button')[0]);
  const menu = await within(canvasElement.ownerDocument.body).findByRole('menu');
  await expect(menu).toBeVisible();
  await waitFor(() => expect(menu.parentElement).toHaveStyle({ opacity: '1', transform: 'none' }));
};

export const Default = PopoverMenuTemplate.bind({});
Default.play = openMenu;

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
    [{ label: 'Dangerous Option', value: 'Danger', type: 'destructive' }],
    [{ label: 'Disabled Option', value: 'Disabled', disabled: true }],
  ],
  onClick: (item: DropdownItem) => window.alert(`you clicked ${item.value}`),
};

export const ItemizedOnClick = PopoverMenuTemplate.bind({});
ItemizedOnClick.play = openMenu;

ItemizedOnClick.args = {
  anchor: 'Test Itemized Onclick',
  menuSections: [
    [{ label: 'Menu Above', value: 'Menu Above', onClick: () => window.alert('You clicked menu above') }],
    [{ label: 'Menu Below', value: 'Menu Below', onClick: () => window.alert('You clicked menu below') }],
    [{ label: 'Dangerous Option', value: 'Danger', onClick: () => window.alert('Danger!!'), type: 'destructive' }],
    [{ label: 'Disabled Option', value: 'Disabled', disabled: true }],
  ],
};
