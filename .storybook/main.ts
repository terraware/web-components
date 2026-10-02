import type { StorybookConfig } from '@storybook/react-webpack5';
import webpack from 'webpack';

const config: StorybookConfig = {
  stories: ['../src/**/*.stories.@(js|jsx|ts|tsx|mdx)'],
  addons: ['@storybook/addon-links', '@storybook/addon-docs', '@storybook/preset-create-react-app'],
  framework: {
    name: '@storybook/react-webpack5',
    options: {},
  },
  staticDirs: ['../static'],
  webpackFinal: async (config) => {
    // Disable ESLint in Storybook build to avoid build failures
    config.plugins = config.plugins?.filter((plugin) => plugin?.constructor.name !== 'ESLintWebpackPlugin');

    // playcanvas' gsplat sort worker has a Node-only `require('node:worker_threads')`
    // fallback that is never hit in the browser, but webpack5 still tries to resolve
    // the `node:` scheme at build time and throws UnhandledSchemeError. Ignoring it
    // lets PlayCanvas-based stories build.
    config.plugins?.push(new webpack.IgnorePlugin({ resourceRegExp: /^node:worker_threads$/ }));

    return config;
  },
};

export default config;
