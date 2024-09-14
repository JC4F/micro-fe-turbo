/* eslint-disable @typescript-eslint/no-unused-vars */
import {
  CustomWebpackBrowserSchema,
  TargetOptions,
} from '@angular-builders/custom-webpack';
import { container } from 'webpack';
import * as webpack from 'webpack';
import dotenv from 'dotenv';

dotenv.config({ path: './.env' });

const { ModuleFederationPlugin } = container;

export default (
  config: webpack.Configuration,
  options: CustomWebpackBrowserSchema,
  targetOptions: TargetOptions,
) => {
  const mode = process.env['NODE_ENV'] || 'production';

  if (config.experiments) config.experiments.outputModule = true;
  config.target = 'es2020';
  config.watch = mode === 'development';

  if (!config.plugins) config.plugins = [];

  config.plugins = [
    ...config.plugins,
    new ModuleFederationPlugin({
      library: { type: 'module' },
      name: 'angular',
      filename: 'remoteEntry.js',
      remotes: {
        'react-shell': `${process.env['VITE_REACT_APP']}/assets/remoteEntry.js`,
      },
      exposes: {
        './AngularPage': './src/main.ts',
      },
    }),
    new webpack.DefinePlugin({
      'process.env': JSON.stringify(process.env),
    }),
  ];

  return config;
};
