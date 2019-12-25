/* Combine all available reducers to a single root reducer.
 *
 * CAUTION: When using the generators, this file is modified in some places.
 *          This is done via AST traversal - Some of your formatting may be lost
 *          in the process - no functionality should be broken though.
 *          This modifications only run once when the generator is invoked - if
 *          you edit them, they are not updated again.
 */
import { combineReducers } from 'redux';
import { reducer as formReducer } from 'redux-form';
import { reducer as notifReducer } from 'redux-notifications';
/* Populated by react-webpack-redux:reducer */
const reducers = {
  artwork: require('./artwork/index').default,
  collections: require('./collections/index').default,
  frames: require('./frame/index').default,
  user: require('./user/index').default,
  config: require('./config.js').default,
  auth: require('./auth.js').default,
  ui: require('./ui.js').default,
  channels: require('./channels.js').default,
  featureFlags: require('./feature-flags.js').default,
  form: formReducer,
  notifs: notifReducer
};

export default combineReducers(reducers);

/**
 * Get a single entity by id
 * @param  {Object} state (hash of entities by id)
 * @param  {String} id
 * @return {Object} An entity object
 */
export const getById = (state, id) => state[id];