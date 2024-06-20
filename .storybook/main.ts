import type { StorybookConfig } from '@storybook/react-webpack5';
import NodePolyfillPlugin from 'node-polyfill-webpack-plugin';
import TsconfigPathsPlugin from 'tsconfig-paths-webpack-plugin';

const config: StorybookConfig = {
  stories: ['../src/**/*.stories.@(ts|tsx)'],
  addons: [
    '@storybook/addon-links',
    '@storybook/addon-essentials',
    '@chromatic-com/storybook',
    '@storybook/addon-webpack5-compiler-babel',
  ],
  framework: {
    name: '@storybook/react-webpack5',
    options: {},
  },
  webpackFinal: async (config) => {
    if (config.plugins) {
      config.plugins.push(new NodePolyfillPlugin());
    }
    if (config.resolve) {
      config.resolve.plugins = [new TsconfigPathsPlugin()];
    }
    return config;
  },
};
export default config;
