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
import userLikedArtworksById from './userLikedArtworksById';
import { isFetching } from './meta';

export default combineReducers({
  byId,
  ids,
  current,
  profile,
  profileNotFound,
  profileArtworkIds,
  userLikedArtworksById,
  isFetching
});

export const getUserList = function(usersById, userIds) {
  return userIds.map(id => getById(usersById, id));
}

export const getCurrentUser = function(userState) {
  return getById(userState.byId, userState.current) || null;
}

export const getProfileUser = function(userState) {
  return getById(userState.byId, userState.profile) || null;
}

export const getProfileNotFound = function(userState) {
  return userState.profileNotFound === true;
}

export const getUserLikes = function(userState, userId) {
  return userState.userLikedArtworksById[userId] || [];
}

export const isLiked = function(userState, artworkId) {
  const currentUserId = userState.current;
  if (!currentUserId) return false;

  const likes = getUserLikes(userState, currentUserId);

  return likes.indexOf(artworkId) !== -1;
}

