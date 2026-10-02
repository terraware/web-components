import { pluginReact } from '@rsbuild/plugin-react';
import { defineConfig } from '@rslib/core';

const notPublished = ['**/*.test.*', '**/*.stories.*', '**/stories/**', '**/*.d.ts'];

export default defineConfig({
  lib: [
    {
      format: 'esm',
      // Emit one module per source file so the published layout mirrors src and consumers can keep
      // deep-importing individual components.
      bundle: false,
      syntax: 'esnext',
      autoExtension: false,
      dts: true,
      source: {
        entry: {
          index: ['./src/**/*.{ts,tsx}', ...notPublished.map((pattern) => `!${pattern}`)],
        },
      },
      redirect: {
        // Rewriting declaration imports would also turn playcanvas' .mjs script imports into .js paths that don't exist.
        dts: { extension: false },
        // Style sheets are copied to dist as-is and compiled by the consuming application, so their
        // imports have to survive into the output untouched.
        style: { extension: false },
      },
      output: {
        target: 'web',
        copy: [
          {
            from: '**/*',
            context: 'src',
            globOptions: { ignore: ['**/*.ts', '**/*.tsx', ...notPublished] },
          },
        ],
      },
    },
  ],
  plugins: [pluginReact()],
  // public/ holds the Storybook build, not assets for the package.
  server: { publicDir: false },
});
