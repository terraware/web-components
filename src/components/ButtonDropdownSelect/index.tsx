import React, {useState} from 'react';
import { Box, ListItemIcon, ListItemText, Menu, MenuItem, MenuList, Typography } from '@mui/material';
import { DropdownItem } from '../types';
import { IconName } from '../Icon/icons';
import Button from '../Button/Button';
import Icon from '../Icon/Icon';
import './styles.scss';

type ButtonDropdownSelectProps = {
  id: string;
  options: DropdownItem[];
  initialSelection: DropdownItem[];
  onChange: (selection: DropdownItem[]) => void;
  buttonIcon?: IconName;
  buttonLabel?: string;
  menuAlign?: 'left' | 'center' | 'right';
  buttonStyle?: 'terraware' | 'plain';
  disabled?: boolean;
};

export default function ButtonDropdownSelect(props: ButtonDropdownSelectProps): JSX.Element {
  const {id, options, initialSelection, onChange, buttonIcon, buttonLabel, menuAlign, buttonStyle, disabled} = props;
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
  const open = Boolean(anchorEl);
  const handleClick = (event?: React.MouseEvent<HTMLButtonElement>) => {
    setAnchorEl(event?.currentTarget ?? null);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };

  const [selection, setSelection] = useState(initialSelection);
  const addToSelection = (value: DropdownItem) => {
    const newSelection = [...selection];
    newSelection.push(value);
    setSelection(newSelection);
    onChange(newSelection);
  };
  const removeFromSelection = (index: number) => {
    const newSelection = [...selection];
    newSelection.splice(index, 1);
    setSelection(newSelection);
    onChange(newSelection);
  };

  const iconSpacer = () => {
    return <div className='button-dropdown-select__checkmark-spacer'/>;
  };

  return <>
    {buttonStyle === 'terraware' ? (
      <Button onClick={handleClick} label={buttonLabel} icon={buttonIcon} disabled={disabled}/>
    ) : (
      <button onClick={handleClick} className='button-dropdown-select__plain-button' disabled={disabled}>
        {buttonIcon && <Icon name={buttonIcon} size='small' className='plain-button__icon'/>}
        {buttonLabel && <Typography className='plain-button__label'>{buttonLabel}</Typography>}
      </button>
    )}
    <Menu
      id={id}
      anchorEl={anchorEl}
      open={open}
      onClose={handleClose}
      MenuListProps={{
        'aria-labelledby': id,
      }}
      anchorOrigin={{vertical: 'bottom', horizontal: menuAlign ?? 'left'}}
      transformOrigin={{vertical: 'top', horizontal: menuAlign ?? 'left'}}
    >
      <MenuList dense={true}>
        {options.map((opt) => {
          const itemIndex = selection.findIndex((s) => s.label === opt.label);

          return <MenuItem
            key={opt.label}
            onClick={() => itemIndex >= 0 ? removeFromSelection(itemIndex) : addToSelection(opt)}
          >
            {itemIndex >= 0
              ? <Icon name='checkmark' className='button-dropdown-select__checkmark-selection'/>
              : iconSpacer()
            }
            <ListItemText>{opt.label}</ListItemText>
          </MenuItem>;
        })}
      </MenuList>
    </Menu>
  </>;
}
