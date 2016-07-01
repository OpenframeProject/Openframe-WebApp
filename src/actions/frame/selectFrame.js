import {SELECT_FRAME} from './../const';

module.exports = function(frameName) {
  return { type: SELECT_FRAME, frameName };
};
