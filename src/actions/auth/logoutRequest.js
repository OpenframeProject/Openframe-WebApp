import {LOGOUT_REQUEST} from './../const';
import logoutSuccess from './logoutSuccess';
import {clearToken} from '../../services/auth';

// Logout simply requires deleting the access token
module.exports = function() {
  return dispatch => {
    dispatch({
      type: LOGOUT_REQUEST
    });
    clearToken();
    dispatch(logoutSuccess());
  };
};