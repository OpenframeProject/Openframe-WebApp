import {FETCH_USER_LIKES_FAILURE} from './../const';
module.exports = function(error) {
  return { type: FETCH_USER_LIKES_FAILURE, error };
};
