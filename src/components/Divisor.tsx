import React, { type JSX } from 'react';

import { Box, Divider } from '@mui/material';

export interface Props {
  mt?: number;
}
export default function Divisor({ mt = 3 }: Props): JSX.Element {
  return (
    <>
      <Box mt={mt} />
      <Divider light={true} />
      <Box mt={mt} />
    </>
  );
}
