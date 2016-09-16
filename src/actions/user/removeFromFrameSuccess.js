import {REMOVE_FROM_FRAME_SUCCESS} from './../const';

import { unbindFrameEvents } from '../../services/pubsub';

module.exports = function(frameId) {
  return (dispatch) => {
    dispatch({ type: REMOVE_FROM_FRAME_SUCCESS, frameId });
    unbindFrameEvents(frameId);
  }
};