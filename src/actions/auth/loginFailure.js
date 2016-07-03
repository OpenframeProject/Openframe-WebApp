import {LOGIN_FAILURE} from './../const';

module.exports = function(parameter) {
  return { type: LOGIN_FAILURE, parameter };
};
