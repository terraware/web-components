import { Story } from '@storybook/react';
import React, { useState } from 'react';
import MultiSelect, { MultiSelectProps } from '../components/MultiSelect';
import Button from '../components/Button/Button';
import { Card, Popover, Typography } from '@mui/material';
import { makeStyles } from '@mui/styles';

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
    <MultiSelect {...args} selectedOptions={selectedOptions} onAdd={handleAdd} onRemove={handleRemove} onPillClick={onPillClick} valueRenderer={renderString} />
  );
};

const useStyles = makeStyles(() => ({
  popoverContainer: {
    '& .MuiPaper-root': {
      borderRadius: '8px',
      padding: '10px',
      overflow: 'visible',
      width: '480px',
    },
  },
}));

const WithParentOptionsVisibilityControlTemplate: Story<MultiSelectProps<number, string>> = (args) => {
  const classes = useStyles();

  const [selectedOptions, setSelectedOptions] = useState<number[]>([]);
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
  const [optionsVisible, setOptionsVisible] = useState(false);
  /*
    Admittedly, this is a bit confusing. Because the onBlur event within the MultiSelect bubbles up _before_ the
    onClose event in the Popover, we need to store, within this component's state, whether or not the options _were_
    visible before the blur event occurred. I tried many, many configurations where setOptionsVisible was passed into
    the MultiSelect, but the onBlur would still fire before the child component could tell the parent component that
    the options were no longer visible (using setOptionsVisible), which resulted in the options being close, the parent
    component re-rendering, and then the onClose handler would think that the options aren't visible, so the Popover
    should be closed, which resulted in not achieving the goal.
   */
  const [optionsWereVisibleBeforeBlur, setOptionsWereVisibleBeforeblur] = useState(false);

  const toggleMultiSelectVisible = (event?: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
    if (event) {
      setAnchorEl(event.currentTarget);
    }
  };

  const hideOptionsOrClose = () => {
    if (optionsWereVisibleBeforeBlur) {
      setOptionsVisible(false);
      setOptionsWereVisibleBeforeblur(false);
    } else {
      setAnchorEl(null);
    }
  };

  const onMultiSelectBlur = () => {
    setOptionsWereVisibleBeforeblur(true);
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
    />
  );

  return (
    <>
      <Typography sx={{ marginBottom: '20px' }}>
        The purpose of this story is to show that clicking away from the card will hide the options first (if they are open), and a second click away will hide
        the multi select
      </Typography>

      <Button onClick={toggleMultiSelectVisible} label={Boolean(anchorEl) ? 'Hide MultiSelect' : 'Show MultiSelect'} />

      <Popover
        className={classes.popoverContainer}
        id='filter-popover'
        open={Boolean(anchorEl)}
        onClose={hideOptionsOrClose}
        anchorEl={anchorEl}
        anchorOrigin={{
          vertical: 'bottom',
          horizontal: 'left',
        }}
        transformOrigin={{
          vertical: 'top',
          horizontal: 'left',
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
