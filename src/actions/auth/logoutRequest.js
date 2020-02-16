import {LOGOUT_REQUEST} from './../const';
import logoutSuccess from './logoutSuccess';
import logoutFailure from './logoutFailure';
import {clearToken} from '../../services/auth';
import {users} from '../../sources/api';

// Logout simply requires deleting the access token
export default function() {
  return dispatch => {
    dispatch({
      type: LOGOUT_REQUEST
    });
    return users.logout().then(
      response => {
        clearToken();
        dispatch(logoutSuccess());
      },
      error => dispatch(logoutFailure(error))
    );
  };
};