import React from 'react';
import { ListItem, MenuItem, MenuList, Popover, useTheme } from '@mui/material';
import { DropdownItem } from '../types';

export type Section = DropdownItem[];

export type PopoverProps = {
  sections: Section[];
  handleClick: (item: DropdownItem) => void;
  anchorElement: HTMLElement | null;
  setAnchorElement: React.Dispatch<React.SetStateAction<HTMLElement | null>>;
};

export default function PopoverDropdown(props: PopoverProps): JSX.Element {
  const { sections, handleClick, anchorElement, setAnchorElement } = props;
  const theme = useTheme();

  const handleClose = () => {
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
      open={Boolean(anchorElement)}
      anchorEl={anchorElement}
      onClose={handleClose}
      anchorOrigin={{
        vertical: 'bottom',
        horizontal: 'center',
      }}
      transformOrigin={{
        vertical: 'top',
        horizontal: 'center',
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
            elements.push(<ListItem>---</ListItem>);
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
                >
                  {item.label}
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
