import {FETCH_USER_FAILURE} from './../const';
module.exports = function(parameter) {
  return { type: FETCH_USER_FAILURE, parameter };
};
