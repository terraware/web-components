import React, { useState } from 'react';
import { Story } from '@storybook/react';
import { Box } from '@mui/material';
import PopoverMultiSelect, { PopoverMultiSelectProps } from '../components/PopoverMultiSelect';
import Button from '../components/Button/Button';

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
