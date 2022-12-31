import React, { SyntheticEvent } from 'react';
import { Checkbox as MUICheckbox, FormControlLabel, Theme, useTheme } from '@mui/material';
import Icon from './Icon/Icon';

export const CheckboxIcons = {
  checkedIcon: (
    <span className='checkbox selected'>
      <Icon name='checkmark' />
    </span>
  ),
  indeterminateIcon: (
    <span className='checkbox selected'>
      <Icon name='iconMinus' />
    </span>
  ),
  icon: (<span className='checkbox unchecked' />)
};

export const CheckboxStyle = (theme: Theme) => ({
  padding: theme.spacing(0, 1, 0, 0),
  '&.Mui-disabled': {
    opacity: 0.5,
  },
  '&:hover > .unchecked': {
    border: `2px solid ${theme.palette.TwClrBrdrHover}`,
  },
  '& > .checkbox': {
    width: '24px',
    height: '24px',
    borderRadius: '4px',
    boxSizing: 'border-box',
    '& > svg': {
      display: 'flex',
      margin: '2px auto auto',
    }
  },
  '& > .selected': {
    border: '2px solid transparent',
    backgroundColor: theme.palette.TwClrBgSelected,
    '& > svg' : {
      fill: theme.palette.TwClrBaseWhite,
      stroke: theme.palette.TwClrBaseWhite,
      strokeWidth: '4px',
    }
  },
  '& > .unchecked': {
    border: `2px solid ${theme.palette.TwClrBrdrSecondary}`,
  },
});

export interface Props {
  id: string;
  name: string;
  label: React.ReactNode;
  value?: boolean | null;
  onChange: (id: string, value: boolean) => void;
  disabled?: boolean;
  className?: string;
}

export default function Checkbox(props: Props): JSX.Element {
  const theme = useTheme();

  const onChange = (event: SyntheticEvent<Element, Event>, checked: boolean) => {
    props.onChange(props.id, checked);
  };

  return (
    <FormControlLabel
      id={props.id}
      onChange={onChange}
      label={props.label}
      disabled={props.disabled}
      control={(
        <MUICheckbox
          disabled={props.disabled}
          disableRipple={true}
          id={'check-' + props.id}
          checked={props.value ?? false}
          size='medium'
          sx={CheckboxStyle(theme)}
          {...CheckboxIcons}
        />
      )}
      className={props.className}
      sx={{
        alignItems: 'flex-start',
        color: theme.palette.TwClrTxt,
        fontFamily: 'Inter',
        fontSize: '16px',
        fontWeight: 500,
        lineHeight: '24px',
        margin: theme.spacing(1, 0, 0, 0),
        '&.Mui-disabled .MuiFormControlLabel-label': {
          color: theme.palette.TwClrTxt,
          opacity: 0.5,
        },
      }}
    />
  );
}
