import React, { useState } from 'react';

import { Box } from '@mui/material';
import { Story } from '@storybook/react';
import { expect, userEvent, waitFor, within } from 'storybook/test';

import Button from '../components/Button/Button';
import PopoverMultiSelect, { PopoverMultiSelectProps } from '../components/PopoverMultiSelect';

export default {
  title: 'PopoverMultiSelect',
  component: PopoverMultiSelect,
};

const PopoverMultiSelectTemplate: Story<Omit<PopoverMultiSelectProps, 'anchorElement' | 'setAnchorElement'>> = (
  args
) => {
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
  const handleClick = (event?: React.MouseEvent<HTMLButtonElement, MouseEvent> | undefined) => {
    setAnchorEl(event?.currentTarget ?? null);
  };

  return (
    <>
      <PopoverMultiSelect anchorElement={anchorEl} setAnchorElement={setAnchorEl} {...args} />
      <Box display='flex' justifyContent='center'>
        <Button onClick={handleClick} icon='iconLayers' label='Click Me for a Popover' />
      </Box>
    </>
  );
};

export const Default = PopoverMultiSelectTemplate.bind({});
Default.play = async ({ canvasElement }) => {
  await userEvent.click(within(canvasElement).getByRole('button', { name: 'Click Me for a Popover' }));
  const menu = await within(canvasElement.ownerDocument.body).findByRole('menu');
  await expect(menu).toBeVisible();
  await waitFor(() => expect(menu.parentElement).toHaveStyle({ opacity: '1', transform: 'none' }));
};

Default.args = {
  initialSelection: [1, 3],
  onChange: (selection: any[]) => alert(selection),
  sections: [
    [
      { label: 'One', value: 1 },
      { label: 'Two', value: 2 },
    ],
    [{ label: 'Three', value: 3 }],
  ],
  menuAlign: 'right',
};
