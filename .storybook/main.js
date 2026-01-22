module.exports = {
  stories: ['../src/**/*.stories.@(js|jsx|ts|tsx|mdx)'],
  addons: [
    '@storybook/addon-links',
    '@storybook/addon-essentials',
    '@storybook/preset-create-react-app',
  ],
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
    config.plugins = config.plugins.filter(
      plugin => plugin.constructor.name !== 'ESLintWebpackPlugin'
    );

    return config;
  },
};
