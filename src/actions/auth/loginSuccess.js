import {LOGIN_SUCCESS} from './../const';
import {setToken} from '../../services/auth';
import fetchCurrentUserRequest from '../user/fetchCurrentUserRequest';
import fetchFramesRequest from '../frame/fetchFramesRequest';

module.exports = function(token) {
  // set accesToken on localStorage
  setToken(token.id);

  return dispatch => {
    dispatch({
      type: LOGIN_SUCCESS,
      token
    });

    dispatch(fetchCurrentUserRequest());
    dispatch(fetchFramesRequest());

  };
};