import {FETCH_USER_SUCCESS} from './../const';
import fetchFramesRequest from '../frame/fetchFramesRequest';

module.exports = function(user) {
  return dispatch => {
    dispatch({
      type: FETCH_USER_SUCCESS,
      user
    });

    dispatch(fetchFramesRequest());
  }
};
