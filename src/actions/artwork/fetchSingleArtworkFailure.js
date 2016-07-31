import {FETCH_SINGLE_ARTWORK_FAILURE} from './../const';

module.exports = function(error) {
  return { type: FETCH_SINGLE_ARTWORK_FAILURE, error };
};
