import {FETCH_SINGLE_COLLECTION_FAILURE} from './../const';

module.exports = function(error) {
  return { type: FETCH_SINGLE_COLLECTION_FAILURE, error };
};
