import React, { SyntheticEvent, type JSX } from 'react';

import { FormControlLabel, Radio } from '@mui/material';

export interface Props {
  id: string;
  name: string;
  label: React.ReactNode;
  value?: boolean | null;
  onChange: (value: boolean) => void;
}

export default function RadioButton(props: Props): JSX.Element {
  const onChange = (event: SyntheticEvent<Element, Event>, checked: boolean) => {
    props.onChange(checked);
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
