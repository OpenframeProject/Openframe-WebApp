import {UPDATE_FRAME_FAILURE} from './../const';

module.exports = function(parameter) {
  return { type: UPDATE_FRAME_FAILURE, parameter };
};
