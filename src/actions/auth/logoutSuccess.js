import {LOGOUT_SUCCESS} from './../const';

module.exports = function(parameter) {
  return { type: LOGOUT_SUCCESS, parameter };
};
