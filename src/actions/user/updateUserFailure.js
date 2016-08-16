import {UPDATE_USER_FAILURE} from './../const';

module.exports = function(error) {
  return {
    type: UPDATE_USER_FAILURE,
    error: error.message || error
  };
};
