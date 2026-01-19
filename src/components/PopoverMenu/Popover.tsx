import React, { type JSX } from 'react';

import { Divider, MenuItem, MenuList, Popover, useTheme } from '@mui/material';

import { DropdownItem } from '../types';

export type Section = DropdownItem[];

export type PopoverProps = {
  sections: Section[];
  handleClick: (item: DropdownItem) => void;
  anchorElement: HTMLElement | null;
  setAnchorElement: (anchorEl: HTMLElement | null) => void;
  itemRenderer?: (item: DropdownItem) => React.ReactNode;
  menuAlign?: 'left' | 'center' | 'right';
  selectedValue?: any;
  onClose?: () => void;
  container?: HTMLElement | null; // handle fullscreen
};

export default function PopoverDropdown(props: PopoverProps): JSX.Element {
  const {
    sections,
    handleClick,
    anchorElement,
    setAnchorElement,
    itemRenderer,
    menuAlign,
    selectedValue,
    onClose,
    container,
  } = props;
  const theme = useTheme();

  const handleClose = () => {
    if (onClose) {
      onClose();
    }
    setAnchorElement(null);
  };

  const onClick = (item: DropdownItem) => {
    if (item.onClick) {
      item.onClick();
    }
    handleClick(item);
  };

  const itemStyles = (type?: 'passive' | 'destructive') => ({
    color: type === 'destructive' ? theme.palette.TwClrTxtDanger : theme.palette.TwClrTxt,
    '& .MuiMenuItem-root:hover': {
      backgroundColor: theme.palette.TwClrBgSelectedGhostHover,
    },
    '&.MuiMenuItem-root:active': {
      backgroundColor: theme.palette.TwClrBgSelectedGhostActive,
    },
  });

  return (
    <Popover
      id='simple-popover'
      container={container}
      open={Boolean(anchorElement)}
      anchorEl={anchorElement}
      onClose={handleClose}
      anchorOrigin={{
        vertical: 'bottom',
        horizontal: menuAlign ?? 'left',
      }}
      transformOrigin={{
        vertical: 'top',
        horizontal: menuAlign ?? 'left',
      }}
      sx={{
        '& .MuiPaper-root': {
          borderRadius: '8px',
          boxShadow: 'none',
          border: `1px solid ${theme.palette.TwClrBrdrSecondary}`,
          paddingY: '8px',
          marginTop: '4px',
        },
      }}
    >
      <MenuList sx={{ padding: 0 }}>
        {sections?.map((section, index) => {
          let elements: JSX.Element[] = [];
          if (index > 0) {
            elements.push(<Divider />);
          }
          elements = [
            ...elements,
            ...section.map((item, itemIndex) => {
              return (
                <MenuItem
                  onClick={() => onClick(item)}
                  key={`option-${itemIndex}`}
                  sx={itemStyles(item.type)}
                  disableRipple={true}
                  disabled={item.disabled}
                  selected={item.value === selectedValue}
                >
                  {itemRenderer ? itemRenderer(item) : item.label}
                </MenuItem>
              );
            }),
          ];

          return elements;
        })}
      </MenuList>
    </Popover>
  );
}
