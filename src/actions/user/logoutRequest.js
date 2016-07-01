import {LOGOUT_REQUEST} from './../const';

module.exports = function(parameter) {
  return { type: LOGOUT_REQUEST, parameter };
};
