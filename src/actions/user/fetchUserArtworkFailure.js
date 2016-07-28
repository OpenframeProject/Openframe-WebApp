import {FETCH_USER_ARTWORK_FAILURE} from './../const';
module.exports = function(error) {
  return { type: FETCH_USER_ARTWORK_FAILURE, error };
};
