'use strict';

import baseConfig from './base';

let config = {
  appEnv: 'dev',  // feel free to remove the appEnv property here
  apiBase: 'https://api.openframe.io/v0/',
  crossStorageRules: [
    {
        origin: /localhost:3030$/,
        allow: ['get']
    }
  ]
};

export default Object.freeze(Object.assign({}, baseConfig, config));
