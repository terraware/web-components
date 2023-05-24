import React, { useState } from 'react';
import { Story } from '@storybook/react';
import { Box } from '@mui/material';
import PopoverMenuMultiSelect, { PopoverMenuMultiSelectProps } from '../components/PopoverMenuMultiSelect';
import Button from '../components/Button/Button';

export default {
  title: 'PopoverMenuMultiSelect',
  component: PopoverMenuMultiSelect,
};

const PopoverMenuMultiSelectTemplate: Story<Omit<PopoverMenuMultiSelectProps, 'anchorElement' | 'setAnchorElement'>> = (args) => {
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
  const handleClick = (event?: (React.MouseEvent<HTMLButtonElement, MouseEvent> | undefined)) => {
    setAnchorEl(event?.currentTarget ?? null);
  };

  return <>
    <PopoverMenuMultiSelect anchorElement={anchorEl} setAnchorElement={setAnchorEl} {...args} />
    <Box display='flex' justifyContent='center'>
      <Button onClick={handleClick} icon='iconLayers' label='Click Me for a Popover' />
    </Box>
  </>;
};

export const Default = PopoverMenuMultiSelectTemplate.bind({});

Default.args = {
  initialSelection: ['One'],
  onChange: (selection: any[]) => alert(selection),
  options: ['One', 'Two', 'Three'],
  optionRenderer: (opt: any) => opt,
  menuAlign: 'right',
};
