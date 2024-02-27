import React from 'react';
import { ThemeProvider, StyledEngineProvider } from '@mui/material';
import { MemoryRouter } from 'react-router';

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
        <MemoryRouter  initialEntries={['/']}>
          <Story />
        </MemoryRouter>
      </StyledEngineProvider>
    </ThemeProvider>
  ),
];
