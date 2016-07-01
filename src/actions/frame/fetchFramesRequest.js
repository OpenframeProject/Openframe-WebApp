import {FETCH_FRAMES_REQUEST} from './../const';

module.exports = function(parameter) {
  return { type: FETCH_FRAMES_REQUEST, parameter };
};
