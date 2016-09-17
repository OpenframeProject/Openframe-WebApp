import {PASSWORD_RESET_SUCCESS} from './../const';

module.exports = function(email) {
  return {
      type: PASSWORD_RESET_SUCCESS,
      notice: `A password reset link has been sent to ${email}.`
  };
};