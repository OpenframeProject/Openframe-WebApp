import {UPDATE_FRAME_FAILURE} from './../const';

module.exports = function(error) {
  return { type: UPDATE_FRAME_FAILURE, error };
};
