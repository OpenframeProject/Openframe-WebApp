/* Combine all available reducers to a single root reducer.
 *
 * CAUTION: When using the generators, this file is modified in some places.
 *          This is done via AST traversal - Some of your formatting may be lost
 *          in the process - no functionality should be broken though.
 *          This modifications only run once when the generator is invoked - if
 *          you edit them, they are not updated again.
 */
import { combineReducers } from 'redux';
import {reducer as formReducer} from 'redux-form';
/* Populated by react-webpack-redux:reducer */
const reducers = {
  artwork: require('../reducers/artwork/index').default,
  collections: require('../reducers/collections/index').default,
  frames: require('../reducers/frames.js').default,
  user: require('../reducers/user.js'),
  auth: require('../reducers/auth.js'),
  ui: require('../reducers/ui.js'),
  channels: require('../reducers/channels.js'),
  form: formReducer
};

export default combineReducers(reducers);

/**
 * Get a single entity by id
 * @param  {Object} state (hash of entities by id)
 * @param  {String} id
 * @return {Object} An entity object
 */
export const getById = (state, id) => state[id];