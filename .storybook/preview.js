import React from 'react';
import { ThemeProvider, StyledEngineProvider } from '@mui/material';

export const parameters = {
  actions: { argTypesRegex: '^on[A-Z].*' },
  controls: {
    matchers: {
      color: /(background|color)$/i,
      date: /Date$/,
    },
  },
};

import { theme } from '../src/';

export const decorators = [
  (Story) => (
    <ThemeProvider theme={theme}>
      <StyledEngineProvider injectFirst>
        <Story />
      </StyledEngineProvider>
    </ThemeProvider>
  ),
];
