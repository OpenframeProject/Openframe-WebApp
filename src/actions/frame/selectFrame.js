import {SELECT_FRAME} from './../const';

export default function(frameId) {
  try {
    localStorage.setItem('selectedFrameId', frameId) || null;
  } catch(e) {
  }
  return { type: SELECT_FRAME, frameId };
};
