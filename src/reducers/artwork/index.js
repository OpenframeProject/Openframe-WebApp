/* Define your initial state here.
 *
 * If you change the type from object to something else, do not forget to update
 * src/container/App.js accordingly.
 */
import { combineReducers } from 'redux';

import { getById } from '../index';
import byId from './byId';
import ids from './ids';
import { isFetching, lastUpdated } from './meta';

export default combineReducers({
  byId,
  ids,
  isFetching,
  lastUpdated
});

export const getArtworkList = function(state, filter) {
  const ids = state.artwork.ids;
  return ids.map(id => getById(state.artwork.byId, id));
}