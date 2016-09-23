import {UPDATE_ARTWORK_FAILURE} from './../const';

module.exports = function(error) {
  return { type: UPDATE_ARTWORK_FAILURE, error };
};
