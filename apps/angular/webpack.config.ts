/* eslint-disable @typescript-eslint/no-unused-vars */
import {
  CustomWebpackBrowserSchema,
  TargetOptions,
} from '@angular-builders/custom-webpack';
import { container } from 'webpack';
import * as webpack from 'webpack';
import { DotenvRunPlugin } from '@dotenv-run/webpack';

const { ModuleFederationPlugin } = container;

export default (
  config: webpack.Configuration,
  options: CustomWebpackBrowserSchema,
  targetOptions: TargetOptions,
) => {
  if (config.experiments) config.experiments.outputModule = true;
  config.target = 'es2020';
  config.watch = process.env['NGX_NODE_ENV'] === 'developmnent';

  if (!config.plugins) config.plugins = [];

  config.plugins = [
    ...config.plugins,
    new ModuleFederationPlugin({
      library: { type: 'module' },
      name: 'angular',
      filename: 'remoteEntry.js',
      remotes: {
        'react-shell': `${process.env['NGX_REACT_APP'] || 'https://micro-fe-jc4f.vercel.app'}/assets/remoteEntry.js`,
      },
      exposes: {
        './AngularPage': './src/main.ts',
      },
    }),
    new DotenvRunPlugin({ prefix: 'NGX', verbose: true }),
  ];

  return config;
};
