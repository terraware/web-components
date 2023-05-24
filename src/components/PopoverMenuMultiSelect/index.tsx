import React, { useState } from 'react';
import { ListItemText } from '@mui/material';
import { DropdownItem } from '../types';
import Icon from '../Icon/Icon';
import './styles.scss';
import Popover from '../PopoverMenu/Popover';

export type PopoverMenuMultiSelectProps = {
  anchorElement: HTMLElement | null;
  initialSelection: any[];
  menuAlign?: 'left' | 'center' | 'right';
  onChange: (selection: any[]) => void;
  options: any[];
  optionRenderer: (option: any) => string;
  setAnchorElement: React.Dispatch<React.SetStateAction<HTMLElement | null>>;
};

export default function PopoverMenuMultiSelect(props: PopoverMenuMultiSelectProps): JSX.Element {
  const { anchorElement, initialSelection, menuAlign, onChange, options, optionRenderer, setAnchorElement} = props;
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

  return <Popover
    sections={[options.map((opt) => ({
      label: optionRenderer(opt),
      value: opt,
    }))]}
    handleClick={(item) => {
      const itemIndex = selection.findIndex((s) => s === item.value);
      if (itemIndex >= 0) {
        removeFromSelection(itemIndex);
      } else {
        addToSelection(item.value);
      }
    }}
    anchorElement={anchorElement}
    setAnchorElement={setAnchorElement}
    itemRenderer={(item) => {
      const itemFound = selection.find((s) => s === item.value);

      return <>
        {itemFound
          ? <Icon name='checkmark' className='button-dropdown-select__checkmark-selection'/>
          : iconSpacer()
        }
        <ListItemText>{item.label}</ListItemText>
      </>;
    }}
    menuAlign={menuAlign}
  />;
}
