import {INITIATE_UPDATE_PROFILE} from './../const';
import updateUserRequest from './updateUserRequest.js';

module.exports = function(fields) {
  return dispatch => {
    dispatch({
      type: INITIATE_UPDATE_PROFILE
    });

    dispatch(updateUserRequest(fields))
  };
};
