import { FRAME_CONNECTED } from './../const';

module.exports = function(frameId) {
  return { type: FRAME_CONNECTED, frameId };
};
