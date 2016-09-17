import {PASSWORD_RESET_REQUEST} from '../const';
import passwordResetSuccess from './passwordResetSuccess';
import passwordResetFailure from './passwordResetFailure';
import {users} from '../../sources/api';

module.exports = function(email) {
  return dispatch => {
  	dispatch({
  	  type: PASSWORD_RESET_REQUEST
  	});
    return users.passwordReset(email).then(
      response => {
        dispatch(passwordResetSuccess(email));
      },
      error => dispatch(passwordResetFailure(error))
    );
  };
};