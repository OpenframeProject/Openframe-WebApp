import thunk from 'redux-thunk';

import { createStore, applyMiddleware } from 'redux';
import reducers from '../reducers';

/**
 * configureStore method, called from the src/index.js
 * @param  {Object} initialState
 * @return {Store} A redux store
 */
module.exports = function(initialState) {

  const middlewares = [thunk];

  if (process.env.NODE_ENV !== 'production') {
    const createLogger = require('redux-logger');
    const logger = createLogger();
    middlewares.push(logger);
  }

  const store = createStore(
    reducers,
    initialState,
    applyMiddleware(...middlewares)
  );

  if (module.hot) {
    // Enable Webpack hot module replacement for reducers
    module.hot.accept('../reducers', () => {
      const nextReducer = require('../reducers')
      store.replaceReducer(nextReducer)
    })
  }

  return store
}
