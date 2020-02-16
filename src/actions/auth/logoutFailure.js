import {LOGOUT_FAILURE} from './../const';
import {clearToken} from '../../services/auth';

export default function() {
  return dispatch => {
    clearToken();
    dispatch({
      type: LOGOUT_FAILURE
    });
  }
};