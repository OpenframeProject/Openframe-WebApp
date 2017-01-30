import {FETCH_USER_ARTWORK_SUCCESS} from './../const';
import { normalize } from 'normalizr';
import * as schema from '../schema';

module.exports = function(userId, response) {
  return dispatch => {
    dispatch({
      type: FETCH_USER_ARTWORK_SUCCESS,
      response: normalize(response, schema.arrayOfArtworks),
      userId: userId
    });
  }
};
