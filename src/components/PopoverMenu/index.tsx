import React, { useState } from 'react';
import Icon from '../Icon/Icon';
import { IconButton, Theme } from '@mui/material';
import { makeStyles } from '@mui/styles';
import Popover, { Section } from './Popover';
import { DropdownItem } from '../types';

const useStyles = makeStyles((theme: Theme) => ({
  iconContainer: {
    height: '48px',
    borderRadius: '16px',
    padding: theme.spacing(1.5, 2),
  },
  icon: {
    width: '32px',
    height: '32px',
  },
  chevronDown: {
    marginLeft: '8px',
    fill: theme.palette.TwClrIcn,
  },
}));

export type PopoverMenuProps = {
  anchor: React.ReactNode;
  menuSections: Section[];
  onClick?: (selected: DropdownItem) => void;
};

export default function PopoverMenu({ anchor, menuSections, onClick }: PopoverMenuProps): JSX.Element {
  const classes = useStyles();
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
      <IconButton onClick={handleClick} size='small' className={classes.iconContainer}>
        {anchor}
        <Icon name='chevronDown' size='medium' className={classes.chevronDown} />
      </IconButton>
      <Popover
        sections={menuSections}
        handleClick={onItemClick}
        anchorElement={anchorEl}
        setAnchorElement={setAnchorEl}
      />
    </div>
  );
}
