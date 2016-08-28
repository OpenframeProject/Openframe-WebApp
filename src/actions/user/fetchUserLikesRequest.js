import {FETCH_USER_LIKES_REQUEST} from '../const';
import fetchUserLikesSuccess from './fetchUserLikesSuccess';
import fetchUserLikesFailure from './fetchUserLikesFailure';
import { users } from '../../sources/api';

module.exports = function(userId) {
  return dispatch => {
    dispatch({
      type: FETCH_USER_LIKES_REQUEST
    });

    return users.fetchUserLikedArtwork(userId).then(
      response => dispatch(fetchUserLikesSuccess(userId, response)),
      error => dispatch(fetchUserLikesFailure(error))
    );
  }
};