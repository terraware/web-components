import React from 'react';
import { Switch, SwitchProps } from '@mui/material';
import './styles.scss';

const AntSwitch = (props: SwitchProps) => {
  return <Switch className="ant-switch" {...props} />;
};

export { AntSwitch };