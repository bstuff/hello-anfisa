'use strict';

const NodemonPlugin = require('nodemon-webpack-plugin');
const path = require('path');
const { DefinePlugin } = require('webpack');

// will be excluded from bundle
const blacklist = [];
const nodeModulesExternals = Object.keys(require('./package.json').dependencies)
  .map((v) => new RegExp(`^${v}`))
  .concat(blacklist);

module.exports = (env, argv = {}) => {
  const isProduction = argv.mode === 'production';

  return [
    {
      name: 'server',
      target: 'node',
      entry: {
        server: [path.join(__dirname, 'src', 'index.ts'), path.join(__dirname, 'src', 'app.ts')],
      },
      output: {
        path: path.join(__dirname, 'dist'),
        filename: '[name].js',
        libraryTarget: 'commonjs2',
      },
      optimization: {
        minimize: false,
        splitChunks: false,
        nodeEnv: false,
      },
      stats: {
        warningsFilter: /export .* was not found in/,
      },
      externals: [...nodeModulesExternals],
      resolve: {
        extensions: ['.js', '.mjs', '.jsx', '.json', '.ts', '.tsx'],
      },
      module: {
        rules: [
          {
            test: /\.(j|t)sx?$/,
            use: [
              {
                loader: 'babel-loader',
                options: {
                  rootMode: 'upward',
                  // cacheDirectory: utils.getCacheDir('babel'),
                },
              },
            ],
          },
          {
            test: /\.(jpg|gif|png|svg)$/i,
            loader: 'file-loader',
            options: {
              name: 'assets/[contenthash].[ext]',
              esModule: false,
              emitFile: false,
            },
          },
        ],
      },
      plugins: [
        new DefinePlugin({
          'process.env.NODE_ENV': JSON.stringify(isProduction ? 'production' : 'development'),
        }),
        new NodemonPlugin({
          nodeArgs: ['--inspect=0.0.0.0:9229'],
        }),
      ],
      devtool: process.env.WEBPACK_DEVTOOL || 'source-maps',
    },

    {
      name: 'frontend',
      target: 'web',
      entry: {
        app: [path.join(__dirname, 'src', 'frontend', 'app.ts')],
      },
      output: {
        path: path.join(__dirname, 'dist', 'frontend'),
        filename: '[name].js',
      },
      optimization: {
        minimize: false,
        splitChunks: false,
        nodeEnv: false,
      },
      stats: {
        warningsFilter: /export .* was not found in/,
      },
      resolve: {
        extensions: ['.js', '.mjs', '.jsx', '.json', '.ts', '.tsx'],
      },
      module: {
        rules: [
          {
            test: /\.(j|t)sx?$/,
            use: [
              {
                loader: 'babel-loader',
                options: {
                  rootMode: 'upward',
                  // cacheDirectory: utils.getCacheDir('babel'),
                },
              },
            ],
          },
          {
            test: /\.(jpg|gif|png|svg)$/i,
            loader: 'file-loader',
            options: {
              name: 'assets/[contenthash].[ext]',
              esModule: false,
            },
          },
        ],
      },
      plugins: [
        new DefinePlugin({
          'process.env.NODE_ENV': JSON.stringify(isProduction ? 'production' : 'development'),
        }),
      ],
      devtool: process.env.WEBPACK_DEVTOOL || 'source-maps',
    },
  ];
};
