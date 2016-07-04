import {SELECT_FRAME} from './../const';

module.exports = function(frameId) {
  try {
    localStorage.setItem('selectedFrameId', frameId) || null;
  } catch(e) {
  }
  return { type: SELECT_FRAME, frameId };
};
