import {DELETE_FRAME_FAILURE} from './../const';

module.exports = function(error) {
  return { type: DELETE_FRAME_FAILURE, error };
};
