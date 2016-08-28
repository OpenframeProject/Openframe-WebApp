import {UNLIKE_ARTWORK_FAILURE} from './../const';

module.exports = function(error) {
  return { type: UNLIKE_ARTWORK_FAILURE, error };
};
