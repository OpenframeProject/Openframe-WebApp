import {FETCH_SINLGE_ARTWORK_FAILURE} from './../const';

module.exports = function(error) {
  return { type: FETCH_SINLGE_ARTWORK_FAILURE, error };
};
