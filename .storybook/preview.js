import React from 'react';

import { StyledEngineProvider, ThemeProvider } from '@mui/material';

import { getSupportedLocales, setLocale, theme } from '../src/';

const locales = getSupportedLocales(true);

export const globalTypes = {
  locale: {
    description: 'Language the components render in',
    defaultValue: 'en',
    toolbar: {
      icon: 'globe',
      items: locales.map(({ id, name }) => ({ value: id, title: name })),
      dynamicTitle: true,
    },
  },
};

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
  (Story, context) => {
    setLocale(context.globals.locale);

    return (
      <ThemeProvider theme={theme}>
        <StyledEngineProvider injectFirst>
          <Story />
        </StyledEngineProvider>
      </ThemeProvider>
    );
  },
];
