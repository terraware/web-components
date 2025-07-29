import React, { useState } from 'react';

import { IconButton, useTheme } from '@mui/material';

import Icon from '../Icon/Icon';
import { DropdownItem } from '../types';
import Popover, { Section } from './Popover';

export type PopoverMenuProps = {
  anchor: React.ReactNode;
  menuSections: Section[];
  onClick?: (selected: DropdownItem) => void;
  showChevron?: boolean;
  selectedValue?: any;
};

export default function PopoverMenu({
  anchor,
  menuSections,
  onClick,
  showChevron = true,
  selectedValue,
}: PopoverMenuProps): JSX.Element {
  const theme = useTheme();
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);

  const handleClick = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };

  const onItemClick = (selectedItem: DropdownItem) => {
    if (onClick) {
      onClick(selectedItem);
    }
    handleClose();
  };

  return (
    <div>
      <IconButton
        onClick={handleClick}
        size='small'
        sx={{
          height: '48px',
          borderRadius: '16px',
          padding: theme.spacing(1.5, 2),
        }}
      >
        {anchor}
        {showChevron && (
          <Icon
            name='chevronDown'
            size='medium'
            style={{
              marginLeft: '8px',
              fill: theme.palette.TwClrIcn,
            }}
          />
        )}
      </IconButton>
      <Popover
        sections={menuSections}
        handleClick={onItemClick}
        anchorElement={anchorEl}
        setAnchorElement={setAnchorEl}
        selectedValue={selectedValue}
      />
    </div>
  );
}
