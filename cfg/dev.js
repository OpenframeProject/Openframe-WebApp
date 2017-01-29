'use strict';

let path = require('path');
let webpack = require('webpack');
let baseConfig = require('./base');
let defaultSettings = require('./defaults');

// Add needed plugins here
let BowerWebpackPlugin = require('bower-webpack-plugin');

let config = Object.assign({}, baseConfig, {
  entry: {
    app: ['./src/index', 'webpack-dev-server/client?http://localhost:8000', 'webpack/hot/only-dev-server'],
    hub: ['./src/hub', 'webpack-dev-server/client?http://localhost:8000', 'webpack/hot/only-dev-server']
    // If we decide to make a separate mini-app for login functionality only (for third party apps)
    // login: ['./src/login', 'webpack-dev-server/client?http://localhost:8000', 'webpack/hot/only-dev-server']
  },
  cache: true,
  devtool: 'eval-source-map',
  plugins: [
    new webpack.HotModuleReplacementPlugin(),
    new webpack.NoErrorsPlugin(),
    new BowerWebpackPlugin({
      searchResolveModulesDirectories: false
    }),
    new webpack.ProvidePlugin({
        $: 'jquery',
        jQuery: 'jquery',
        'window.jQuery': 'jquery'
    })
  ],
  module: defaultSettings.getDefaultModules()
});

// Add needed loaders to the defaults here
config.module.loaders.push({
  test: /\.(js|jsx)$/,
  loader: 'babel-loader',
  include: [].concat(
    config.additionalPaths,
    [ path.join(__dirname, '/../src') ],
    [ path.join(__dirname, '/../node_modules/glslCanvas') ]
  )
});

module.exports = config;
