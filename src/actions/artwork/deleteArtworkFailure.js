import {DELETE_ARTWORK_FAILURE} from './../const';

module.exports = function(error) {
  return { type: DELETE_ARTWORK_FAILURE, error };
};
