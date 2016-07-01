import {FETCH_FRAMES_FAILURE} from './../const';

module.exports = function(parameter) {
  return { type: FETCH_FRAMES_FAILURE, parameter };
};
