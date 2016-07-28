import {FETCH_CURRENT_USER_SUCCESS} from './../const';
import { normalize } from 'normalizr';
import * as schema from '../schema';
import fetchFramesRequest from '../frame/fetchFramesRequest';

module.exports = function(response) {
  return dispatch => {
    dispatch({
      type: FETCH_CURRENT_USER_SUCCESS,
      response: normalize(response, schema.user)
    });

    dispatch(fetchFramesRequest());
  }
};
