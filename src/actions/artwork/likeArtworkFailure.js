import {LIKE_ARTWORK_FAILURE} from './../const';

module.exports = function(error) {
  return { type: LIKE_ARTWORK_FAILURE, error };
};
