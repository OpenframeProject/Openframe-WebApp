'use strict';

import baseConfig from './base';

let config = {
  appEnv: 'dist',  // feel free to remove the appEnv property here
  apiBase: 'https://api.openframe.io/v0/',
  crossStorageRules: [
    {
        origin: /editor\.thebookofshaders\.com$/,
        allow: ['get']
    }
  ]
};

export default Object.freeze(Object.assign({}, baseConfig, config));
