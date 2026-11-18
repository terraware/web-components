import React, { ReactNode } from 'react';

import { Box } from '@mui/material';
import { darken, lighten } from '@mui/material/styles';
import highlightWords from 'highlight-words';

export const highlightValue = (value: unknown, query: unknown, matchExactly: boolean): ReactNode => {
  const text = String(value ?? '');
  if (!text || !query || !['string', 'number'].includes(typeof value) || !['string', 'number'].includes(typeof query)) {
    return text;
  }
  const chunks = highlightWords({ text, query: String(query), matchExactly });
  if (!chunks.some((chunk) => chunk.match)) {
    return text;
  }
  return (
    <span aria-label={text} role='note'>
      {chunks.map(({ key, match, text: chunkText }) => (
        <Box
          aria-hidden='true'
          component='span'
          key={key}
          sx={
            match
              ? (theme) => ({
                  backgroundColor:
                    theme.palette.mode === 'dark'
                      ? darken(theme.palette.warning.dark, 0.25)
                      : lighten(theme.palette.warning.light, 0.5),
                  borderRadius: '2px',
                  color: theme.palette.mode === 'dark' ? theme.palette.common.white : theme.palette.common.black,
                  padding: '2px 1px',
                })
              : undefined
          }
        >
          {chunkText}
        </Box>
      ))}
    </span>
  );
};
