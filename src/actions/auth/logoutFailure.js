import {LOGOUT_FAILURE} from './../const';
import {clearToken} from '../../services/auth';

module.exports = function() {
  return dispatch => {
    clearToken();
    dispatch({
      type: LOGOUT_FAILURE
    });
  }
};