/* eslint-disable @typescript-eslint/no-unused-vars */
import {
  CustomWebpackBrowserSchema,
  TargetOptions,
} from '@angular-builders/custom-webpack';
import { container } from 'webpack';
import * as webpack from 'webpack';

const { ModuleFederationPlugin } = container;

export default (
  config: webpack.Configuration,
  options: CustomWebpackBrowserSchema,
  targetOptions: TargetOptions,
) => {
  if (config.experiments) config.experiments.outputModule = true;
  config.target = 'es2020';
  config.watch = true;

  if (!config.plugins) config.plugins = [];

  config.plugins = [
    ...config.plugins,
    new ModuleFederationPlugin({
      library: { type: 'module' },
      name: 'angular',
      filename: 'remoteEntry.js',
      remotes: {
        'react-shell': 'http://localhost:4001/assets/remoteEntry.js',
      },
      exposes: {
        './AngularPage': './src/main.ts',
      },
    }),
  ];

  return config;
};
