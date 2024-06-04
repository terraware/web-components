import { Story } from '@storybook/react';
import React, { useState } from 'react';
import MultiSelect, { MultiSelectProps } from '../components/MultiSelect';
import Button from '../components/Button/Button';
import { Popover, Typography } from '@mui/material';

export default {
  title: 'MultiSelect',
  component: MultiSelect,
};

const Template: Story<MultiSelectProps<number, string>> = (args) => {
  const [selectedOptions, setSelectedOptions] = useState<number[]>([]);

  const handleAdd = (id: number) => {
    const newOptions = [...selectedOptions];
    newOptions.push(id);
    setSelectedOptions(newOptions);
  };

  const handleRemove = (id: number) => {
    const newOptions = [...selectedOptions];
    const index = newOptions.findIndex((value) => id === value);
    if (index >= 0) {
      newOptions.splice(index, 1);
      setSelectedOptions(newOptions);
    }
  };

  const onPillClick = (id: number) => {
    window.alert(`You clicked the ${defaultOptions.get(id)} pill!`);
  };

  const renderString = (v: string) => v;

  return (
    <MultiSelect
      {...args}
      selectedOptions={selectedOptions}
      onAdd={handleAdd}
      onRemove={handleRemove}
      onPillClick={onPillClick}
      valueRenderer={renderString}
    />
  );
};

const WithParentOptionsVisibilityControlTemplate: Story<MultiSelectProps<number, string>> = (args) => {
  const [selectedOptions, setSelectedOptions] = useState<number[]>([]);
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
  const [optionsVisible, setOptionsVisible] = useState(false);
  const [shouldClose, setShouldClose] = useState(false);

  const toggleMultiSelectVisible = (event?: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
    if (event) {
      setAnchorEl(event.currentTarget);
    }
  };

  const hideOptionsOrClose = () => {
    if (shouldClose) {
      setAnchorEl(null);
    }
  };

  const onMultiSelectBlur = () => {
    /*
      I admit this is less than ideal. I was unable to find another solution (and I spent way to long on it already).
      Because there are two events that fire in immediate succession (and in this order), the MultiSelect onBlur
      and the Popover onClick, we need to setOptionsVisible(false) and setShouldClose(false) _after_ the
      Popover's onClickCapture executes. I chose 100 ms arbitrarily based on the desire to still be able to double
      click away from the popover to close the options and subsequently close the popover. Choosing a number
      like 1000ms, for example, makes the double click not work unless 1000ms has elapsed between the two clicks.
     */
    const delaySet = async () => {
      await new Promise((resolve) => {
        setTimeout(resolve, 100);
      });
      setShouldClose(false);
      setOptionsVisible(false);
    };

    void delaySet();
  };

  const onMultiSelectFocus = () => {
    setOptionsVisible(true);
    setShouldClose(false);
  };

  const handleAdd = (id: number) => {
    const newOptions = [...selectedOptions];
    newOptions.push(id);
    setSelectedOptions(newOptions);
  };

  const handleRemove = (id: number) => {
    const newOptions = [...selectedOptions];
    const index = newOptions.findIndex((value) => id === value);
    if (index >= 0) {
      newOptions.splice(index, 1);
      setSelectedOptions(newOptions);
    }
  };

  const onPillClick = (id: number) => {
    window.alert(`You clicked the ${defaultOptions.get(id)} pill!`);
  };

  const renderString = (v: string) => v;

  const renderMultiSelect = () => (
    <MultiSelect
      {...args}
      selectedOptions={selectedOptions}
      onAdd={handleAdd}
      onRemove={handleRemove}
      onPillClick={onPillClick}
      valueRenderer={renderString}
      optionsVisible={optionsVisible}
      onBlur={onMultiSelectBlur}
      onFocus={onMultiSelectFocus}
    />
  );

  return (
    <>
      <Typography sx={{ marginBottom: '20px' }}>
        The purpose of this story is to show that clicking away from the card will hide the options first (if they are
        open), and a second click away will hide the multi select
      </Typography>

      <Button onClick={toggleMultiSelectVisible} label={Boolean(anchorEl) ? 'Hide MultiSelect' : 'Show MultiSelect'} />

      <Popover
        id='filter-popover'
        open={Boolean(anchorEl)}
        onClose={hideOptionsOrClose}
        anchorEl={anchorEl}
        onClickCapture={(event) => {
          // If the captured event is not for the backdrop, do nothing
          const eventIsBackdropClick = Array.from((event.target as HTMLElement).classList.values()).some(
            (targetClass: string) => targetClass.toLowerCase().includes('backdrop')
          );
          if (!eventIsBackdropClick) {
            return;
          }

          // Since two events are fired when the options are opened, the MultiSelect onBlur and
          // the Popover onClick (of the backdrop, which prompts the onClose event), we need to stop event propagation
          // if the options are visible. Otherwise, we setShouldClose(true) so that when the onClose handler fires
          // it knows that it should close
          if (optionsVisible) {
            event.stopPropagation();
          } else {
            setShouldClose(true);
          }
        }}
        anchorOrigin={{
          vertical: 'bottom',
          horizontal: 'left',
        }}
        transformOrigin={{
          vertical: 'top',
          horizontal: 'left',
        }}
        sx={{
          '& .MuiPaper-root': {
            borderRadius: '8px',
            padding: '10px',
            overflow: 'visible',
            width: '480px',
          },
        }}
      >
        {renderMultiSelect()}
      </Popover>
    </>
  );
};

export const Default = Template.bind({});

export const WithParentOptionsVisibilityControl = WithParentOptionsVisibilityControlTemplate.bind({});

const defaultOptions = new Map<number, string>([
  [1, 'eggs'],
  [2, 'potatoes'],
  [3, 'spam'],
  [4, 'bacon'],
  [5, 'beans'],
  [6, 'spam also'],
  [7, 'more spam'],
]);

Default.args = {
  label: 'Breakfast order:',
  tooltipTitle: 'Please make your selection below...',
  helperText: 'Maybe some nice spam?',
  missingValuePlaceholder: '???',
  placeHolder: 'Select...',
  options: defaultOptions,
  disabled: false,
};

WithParentOptionsVisibilityControl.args = {
  label: 'Breakfast order:',
  tooltipTitle: 'Please make your selection below...',
  helperText: 'Maybe some nice spam?',
  missingValuePlaceholder: '???',
  placeHolder: 'Select...',
  options: defaultOptions,
  disabled: false,
};
