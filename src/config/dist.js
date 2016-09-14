'use strict';

import baseConfig from './base';

let config = {
  appEnv: 'dist',  // feel free to remove the appEnv property here
  apiBase: 'dev.openframe.io:3000/api/'
};

export default Object.freeze(Object.assign({}, baseConfig, config));
