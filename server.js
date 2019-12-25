/*eslint no-console:0 */
'use strict';
require('core-js/fn/object/assign');
const webpack = require('webpack');
const WebpackDevServer = require('webpack-dev-server');
const config = require('./webpack.dev');
const open = require('open');

let server = new WebpackDevServer(webpack(config), config.devServer);

server.listen(8080, '0.0.0.0', (err) => {
  if (err) {
    console.log(err);
  }
  console.log('Listening at localhost:' + 8080);
  console.log('Opening your system browser...');
  open('http://localhost:' + 8080 + '/webpack-dev-server/');
});