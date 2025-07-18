import React, { useCallback } from 'react';
import { Switch } from '@mui/material';
import './styles.scss';

export type AntSwitchProps = {
  checked?: boolean;
  disabled?: boolean;
  onChange: (checked: boolean) => void;
};

const AntSwitch = (props: AntSwitchProps) => {
  const { checked, disabled, onChange } = props;

  const onChangeHandler = useCallback((event: React.ChangeEvent<HTMLInputElement>, value: boolean) => {
    onChange(value);
  }, [onChange]);

  return <Switch className="ant-switch" checked={checked} disabled={disabled} onChange={onChangeHandler} />;
};

export default AntSwitch;