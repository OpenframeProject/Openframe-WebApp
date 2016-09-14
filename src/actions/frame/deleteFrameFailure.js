import {DELETE_FRAME_FAILURE} from './../const';

module.exports = function(parameter) {
  return { type: DELETE_FRAME_FAILURE, parameter };
};
