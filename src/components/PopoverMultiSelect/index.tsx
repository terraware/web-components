import React, { useState, type JSX } from 'react';

import { ListItemText } from '@mui/material';

import Icon from '../Icon/Icon';
import Popover, { Section } from '../PopoverMenu/Popover';
import { DropdownItem } from '../types';
import './styles.scss';

export type PopoverMultiSelectProps = {
  anchorElement: HTMLElement | null;
  initialSelection: any[];
  menuAlign?: 'left' | 'center' | 'right';
  onChange: (selection: any[]) => void;
  sections: Section[];
  setAnchorElement: (anchorEl: HTMLElement | null) => void;
};

export default function PopoverMultiSelect(props: PopoverMultiSelectProps): JSX.Element {
  const { anchorElement, initialSelection, menuAlign, onChange, sections, setAnchorElement } = props;
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
    return <div className='popover-multi-select__checkmark-spacer' />;
  };

  return (
    <Popover
      sections={sections}
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
        const selected = selection.find((s) => s === item.value);

        return (
          <>
            {selected ? <Icon name='checkmark' className='popover-multi-select__checkmark-selection' /> : iconSpacer()}
            <ListItemText>{item.label}</ListItemText>
          </>
        );
      }}
      menuAlign={menuAlign}
    />
  );
}
