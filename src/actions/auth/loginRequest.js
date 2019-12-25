import {LOGIN_REQUEST} from '../const';
import loginSuccess from './loginSuccess';
import loginFailure from './loginFailure';
import {users} from '../../sources/api';

export default function(credentials) {
  return dispatch => {
  	dispatch({
  	  type: LOGIN_REQUEST
  	});
    return users.login(credentials).then(
      response => {
        dispatch(loginSuccess(response));
      },
      error => dispatch(loginFailure(error))
    );
  };
};