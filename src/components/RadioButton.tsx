import { FormControlLabel, Radio } from '@mui/material';
import React, { SyntheticEvent } from 'react';

export interface Props {
  id: string;
  propertyName: string;
  name: string;
  label: React.ReactNode;
  value?: boolean | null;
  onChange: (propertyName: string, value: boolean) => void;
}

export default function RadioButton(props: Props): JSX.Element {
  const onChange = (event: SyntheticEvent<Element, Event>, checked: boolean) => {
    props.onChange(props.propertyName, checked);
  };

  return (
    <FormControlLabel
      id={props.id}
      onChange={onChange}
      label={props.label}
      control={<Radio id={'radio-' + props.id} color='primary' checked={props.value ?? false} />}
    />
  );
}
