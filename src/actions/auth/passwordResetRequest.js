import {PASSWORD_RESET_REQUEST} from '../const';
import passwordResetSuccess from './passwordResetSuccess';
import passwordResetFailure from './passwordResetFailure';
import {users} from '../../sources/api';

module.exports = function() {
  return dispatch => {
  	dispatch({
  	  type: PASSWORD_RESET_REQUEST
  	});
    return users.passwordReset().then(
      response => {
        dispatch(passwordResetSuccess(response));
      },
      error => dispatch(passwordResetFailure(error))
    );
  };
};