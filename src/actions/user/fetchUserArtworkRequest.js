import {FETCH_USER_ARTWORK_REQUEST} from '../const';
import fetchUserArtworkSuccess from './fetchUserArtworkSuccess';
import fetchUserArtworkFailure from './fetchUserArtworkFailure';
import { users } from '../../sources/api';

module.exports = function(userId) {
  return dispatch => {
    dispatch({
      type: FETCH_USER_ARTWORK_REQUEST
    });

    return users.fetchUserArtwork(userId).then(
      response => dispatch(fetchUserArtworkSuccess(response)),
      error => dispatch(fetchUserArtworkFailure(error))
    );
  }
};