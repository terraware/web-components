import { Chip } from '@mui/material';
import { Theme } from '@mui/material';
import React from 'react';
import { makeStyles } from '@mui/styles';

const useStyles = makeStyles((theme: Theme) => ({
  cancel: {
    backgroundColor: theme.palette.common.white,
    borderColor: theme.palette.neutral[400],
    borderWidth: 1,
  },
}));

export interface Props {
  onClick: () => void;
  label: string;
}

export default function CancelButton({ onClick, label }: Props): JSX.Element {
  const classes = useStyles();

  return (
    <Chip
      id='cancel'
      className={classes.cancel}
      label={label}
      clickable={true}
      onClick={onClick}
      variant='outlined'
    />
  );
}
