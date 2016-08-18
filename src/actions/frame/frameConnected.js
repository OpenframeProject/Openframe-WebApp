import { FRAME_CONNECTED } from './../const';

module.exports = function(frameId) {
  console.log('frameConnected', frameId);
  return { type: FRAME_CONNECTED, frameId };
};
