const webpack = require('webpack');

module.exports = {
  stories: ['../src/**/*.stories.@(js|jsx|ts|tsx|mdx)'],
  addons: ['@storybook/addon-links', '@storybook/addon-essentials', '@storybook/preset-create-react-app'],
  framework: {
    name: '@storybook/react-webpack5',
    options: {},
  },
  staticDirs: ['../static'],
  docs: {
    autodocs: true,
  },
  webpackFinal: async (config) => {
    // Disable ESLint in Storybook build to avoid build failures
    config.plugins = config.plugins.filter((plugin) => plugin.constructor.name !== 'ESLintWebpackPlugin');

    // playcanvas' gsplat sort worker has a Node-only `require('node:worker_threads')`
    // fallback that is never hit in the browser, but webpack5 still tries to resolve
    // the `node:` scheme at build time and throws UnhandledSchemeError. Ignoring it
    // lets PlayCanvas-based stories build.
    config.plugins.push(new webpack.IgnorePlugin({ resourceRegExp: /^node:worker_threads$/ }));

    return config;
  },
};
