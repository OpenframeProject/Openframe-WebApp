'use strict';

import baseConfig from './base';

let config = {
  appEnv: 'dev',  // feel free to remove the appEnv property here
  apiBase: 'http://localhost:8888/api/'
};

export default Object.freeze(Object.assign({}, baseConfig, config));
