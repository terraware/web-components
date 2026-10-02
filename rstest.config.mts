import { defineConfig } from '@rstest/core';

export default defineConfig({
  testEnvironment: 'jsdom',
  include: ['src/**/*.test.{ts,tsx}'],
  setupFiles: ['./src/setupTests.js'],
  tools: {
    rspack: {
      module: {
        rules: [
          {
            // jsdom does not apply styles, so load stylesheets as inert source instead of compiling them.
            test: /\.(css|scss|sass)$/,
            type: 'asset/source',
          },
        ],
      },
    },
    swc: {
      jsc: {
        transform: {
          react: {
            runtime: 'automatic',
          },
        },
      },
    },
  },
  globals: true,
  coverage: {
    reportsDirectory: 'docs/coverage',
  },
});
