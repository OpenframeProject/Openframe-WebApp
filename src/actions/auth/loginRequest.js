import loginSuccess from './loginSuccess';
import loginFailure from './loginFailure';
import {users} from '../../sources/api';

module.exports = function(credentials) {
  return dispatch => {
    return users.login(credentials).then(
      response => dispatch(loginSuccess(response)),
      error => dispatch(loginFailure(error))
    );
  };
};