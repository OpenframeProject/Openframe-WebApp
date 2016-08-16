import {UPDATE_USER_SUCCESS} from './../const';
import { normalize } from 'normalizr';
import * as schema from '../schema';

module.exports = function(response) {
  return dispatch => {
    dispatch({
      type: UPDATE_USER_SUCCESS,
      response: normalize(response, schema.user)
    });
  }
};