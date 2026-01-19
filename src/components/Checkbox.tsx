import React, { SyntheticEvent, type JSX } from 'react';

import { FormControlLabel, Checkbox as MUICheckbox, SxProps, Theme, useTheme } from '@mui/material';

export const CheckboxStyle = (theme: Theme): SxProps<Theme> => ({
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
  className?: string;
  disabled?: boolean;
  id: string;
  indeterminate?: boolean;
  label: React.ReactNode;
  name: string;
  onChange: (value: boolean) => void;
  sx?: SxProps;
  value?: boolean | null;
}

export default function Checkbox(props: Props): JSX.Element {
  const theme = useTheme();

  const onChange = (event: SyntheticEvent<Element, Event>, checked: boolean) => {
    if (props.indeterminate) {
      props.onChange(true);

      return;
    }

    props.onChange(checked);
  };

  return (
    <FormControlLabel
      id={props.id}
      onChange={onChange}
      label={props.label}
      disabled={props.disabled}
      control={
        <MUICheckbox
          disabled={props.disabled}
          disableRipple={true}
          id={'check-' + props.id}
          indeterminate={props.indeterminate}
          checked={props.value ?? false}
          size='medium'
          sx={[CheckboxStyle(theme), ...(Array.isArray(props.sx) ? props.sx : [props.sx])]}
        />
      }
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
