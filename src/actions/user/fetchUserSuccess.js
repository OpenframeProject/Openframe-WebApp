import {FETCH_USER_SUCCESS} from './../const';
import { normalize } from 'normalizr';
import * as schema from '../schema';
import fetchUserArtworkRequest from './fetchUserArtworkRequest';
import fetchUserLikesRequest from './fetchUserLikesRequest';


module.exports = function(response) {
  return dispatch => {
    let normalized = normalize(response, schema.arrayOfUsers);
    dispatch({
      type: FETCH_USER_SUCCESS,
      response: normalized
    });

    // Fetch user returns an array of users due to RESTful query by username
    dispatch(fetchUserArtworkRequest(normalized.result[0]));
    dispatch(fetchUserLikesRequest(normalized.result[0]));
  }
};
