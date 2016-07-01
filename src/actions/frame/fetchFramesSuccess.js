import {FETCH_FRAMES_SUCCESS} from './../const';

module.exports = function(parameter) {
  return { type: FETCH_FRAMES_SUCCESS, parameter };
};
