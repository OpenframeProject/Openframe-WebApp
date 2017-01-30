/**
 * Function that returns default values.
 * Used because Object.assign does a shallow instead of a deep copy.
 * Using [].push will add to the base array, so a require will alter
 * the base array output.
 */
'use strict';

const path = require('path');
const srcPath = path.join(__dirname, '/../src');
const dfltPort = 8000;

/**
 * Get the default modules object for webpack
 * @return {Object}
 */
function getDefaultModules() {
  return {
    preLoaders: [
      // If you want to show eslint warnings in the browser console:
      // {
      //   test: /\.(js|jsx)$/,
      //   include: srcPath,
      //   loader: 'eslint-loader'
      // }
    ],
    loaders: [
      {
        test: /\.css$/,
        loader: 'style-loader!css-loader'
      },
      {
        test: /\.sass/,
        loader: 'style-loader!css-loader!sass-loader?outputStyle=expanded'
          + '&includePaths[]=' + path.resolve(__dirname, '../node_modules/compass-mixins/lib')
          + '&includePaths[]=' + path.resolve(__dirname, '../node_modules/bootstrap-sass/assets/stylesheets')
          + '&includePaths[]=' + path.resolve(__dirname, '../node_modules')
      },
      {
        test: /\.scss/,
        loader: 'style-loader!css-loader!sass-loader?outputStyle=expanded'
          // TODO: consolidate, no reason to have any includePaths other than /node_modules
          + '&includePaths[]=' + path.resolve(__dirname, '../node_modules/compass-mixins/lib')
          + '&includePaths[]=' + path.resolve(__dirname, '../node_modules/bootstrap-sass/assets/stylesheets')
          + '&includePaths[]=' + path.resolve(__dirname, '../node_modules')
      },
      {
        test: /\.less/,
        loader: 'style-loader!css-loader!less-loader'
      },
      {
        test: /\.styl/,
        loader: 'style-loader!css-loader!stylus-loader'
      },
      {
        test: /\.(png|jpg|gif|svg|woff|woff2|ttf|eot)$/,
        loader: 'url-loader?limit=8192'
      },
      {
        test: /\.(mp4|ogg)$/,
        loader: 'file-loader'
      }
    ]
  };
}

module.exports = {
  srcPath: srcPath,
  publicPath: '/assets/',
  port: dfltPort,
  getDefaultModules: getDefaultModules
};
