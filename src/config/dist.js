'use strict';

import baseConfig from './base';

let config = {
  appEnv: 'dist',  // feel free to remove the appEnv property here
  apiBase: 'https://dev.openframe.io/api/',
  crossStorageRules: [
    {
        origin: /editor\.thebookofshaders\.com$/,
        allow: ['get']
    }
  ]
};

export default Object.freeze(Object.assign({}, baseConfig, config));
