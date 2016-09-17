import {PASSWORD_RESET_FAILURE} from './../const';

module.exports = function(error) {
  return {
      type: PASSWORD_RESET_FAILURE,
      error
  }
};