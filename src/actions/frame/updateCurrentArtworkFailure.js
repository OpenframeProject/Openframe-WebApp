import {UPDATE_CURRENT_ARTWORK_FAILURE} from './../const';

module.exports = function(error) {
  return { type: UPDATE_CURRENT_ARTWORK_FAILURE, error };
};
