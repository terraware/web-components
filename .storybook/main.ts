import { loadEnv, mergeRsbuildConfig, rspack } from '@rsbuild/core';
import { pluginReact } from '@rsbuild/plugin-react';
import { pluginSass } from '@rsbuild/plugin-sass';
import type { StorybookConfig } from 'storybook-react-rsbuild';

const config: StorybookConfig = {
  stories: ['../src/**/*.stories.@(js|jsx|ts|tsx|mdx)'],
  addons: ['@storybook/addon-links', '@storybook/addon-docs'],
  framework: {
    name: 'storybook-react-rsbuild',
    options: {},
  },
  staticDirs: ['../static'],
  rsbuildFinal: (config) =>
    mergeRsbuildConfig(config, {
      plugins: [pluginReact(), pluginSass()],
      source: {
        // Exposes TERRAWARE_* variables from .env, such as the Mapbox token the map stories use.
        define: loadEnv({ prefixes: ['TERRAWARE_'] }).publicVars,
      },
      tools: {
        rspack: {
          plugins: [
            // playcanvas' gsplat sort worker has a Node-only `require('node:worker_threads')` fallback that
            // is never hit in the browser, and sync-ammo is only needed for physics, which we don't use.
            new rspack.IgnorePlugin({ resourceRegExp: /^(node:worker_threads|sync-ammo)$/ }),
          ],
        },
      },
    }),
};

export default config;
