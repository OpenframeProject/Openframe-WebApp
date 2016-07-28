/* Define your initial state here.
 *
 * If you change the type from object to something else, do not forget to update
 * src/container/App.js accordingly.
 */
import { combineReducers } from 'redux';

import { getById } from '../index';
import byId from './byId';
import ids from './ids';
import current from './current';
import profile from './profile';
import profileNotFound from './profileNotFound';
import profileArtworkIds from './profileArtworkIds';
import { isFetching } from './meta';

export default combineReducers({
  byId,
  ids,
  current,
  profile,
  profileNotFound,
  profileArtworkIds,
  isFetching
});

export const getUserList = function(state, filter) {
  const ids = state.user.ids;
  return ids.map(id => getById(state.user.byId, id));
}

export const getCurrentUser = function(user) {
  return getById(user.byId, user.current) || null;
}

export const getProfileUser = function(user) {
  return getById(user.byId, user.profile) || null;
}

export const getProfileNotFound = function(user) {
  return user.profileNotFound === true;
}