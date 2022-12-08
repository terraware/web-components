import { Checkbox as MUICheckbox, FormControlLabel, Theme, useTheme } from '@mui/material';
import React, { SyntheticEvent } from 'react';

export const CheckboxStyle = (theme: Theme) => ({
  padding: theme.spacing(0, 1, 0, 0),
  '& .MuiSvgIcon-root': {
    fill: theme.palette.TwClrBrdrSecondary,
  },
  '&:hover > .MuiSvgIcon-root': {
    fill: theme.palette.TwClrBrdrHover,
  },
  '&.Mui-checked > .MuiSvgIcon-root': {
    fill: theme.palette.TwClrBgSelected,
    color: theme.palette.TwClrBgSelected,
  },
  '&.MuiCheckbox-indeterminate > .MuiSvgIcon-root': {
    fill: theme.palette.TwClrBgSelected,
    color: theme.palette.TwClrBgSelected,
  },
  '&:focus > .MuiSvgIcon-root': {
    border: `2px solid ${theme.palette.TwClrBgSelected}`,
  },
  '&.Mui-disabled': {
    opacity: 0.5,
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
      }}
    />
  );
}
