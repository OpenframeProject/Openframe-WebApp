import { FRAME_CONNECTED } from './../const';

export default function(frameId) {
  return { type: FRAME_CONNECTED, frameId };
};
