import {FETCH_USER_SUCCESS} from './../const';
import { normalize } from 'normalizr';
import * as schema from '../schema';
import fetchUserArtworkRequest from './fetchUserArtworkRequest';


module.exports = function(response) {
  return dispatch => {
    let normalized = normalize(response, schema.arrayOfUsers);
    dispatch({
      type: FETCH_USER_SUCCESS,
      response: normalized
    });

    dispatch(fetchUserArtworkRequest(normalized.result[0]));
  }
};
