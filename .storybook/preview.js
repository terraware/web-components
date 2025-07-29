import React from 'react';

import { StyledEngineProvider, ThemeProvider } from '@mui/material';

import { theme } from '../src/';

export const parameters = {
  actions: { argTypesRegex: '^on[A-Z].*' },
  controls: {
    matchers: {
      color: /(background|color)$/i,
      date: /Date$/,
    },
  },
};

export const decorators = [
  (Story) => (
    <ThemeProvider theme={theme}>
      <StyledEngineProvider injectFirst>
        <Story />
      </StyledEngineProvider>
    </ThemeProvider>
  ),
];
