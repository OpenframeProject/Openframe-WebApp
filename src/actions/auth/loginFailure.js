import {LOGIN_FAILURE} from './../const';

module.exports = function(error) {
  return {
    type: LOGIN_FAILURE,
    error: error.message || error
  };
};
