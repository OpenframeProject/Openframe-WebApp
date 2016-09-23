import {CREATE_ARTWORK_FAILURE} from './../const';

module.exports = function(error) {
  return { type: CREATE_ARTWORK_FAILURE, error };
};
