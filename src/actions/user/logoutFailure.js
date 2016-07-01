import {LOGOUT_FAILURE} from './../const';

module.exports = function(parameter) {
  return { type: LOGOUT_FAILURE, parameter };
};
