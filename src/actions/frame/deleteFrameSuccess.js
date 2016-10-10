import {DELETE_FRAME_SUCCESS} from './../const';

import { unbindFrameEvents } from '../../services/pubsub';
const updateNoticeBanner = require('../ui/updateNoticeBanner.js');

module.exports = function(frame) {
  return (dispatch) => {
    dispatch({ type: DELETE_FRAME_SUCCESS, frameId: frame.id });
    dispatch(updateNoticeBanner(`Your <strong style="text-transform: uppercase;">${frame.name}</strong> frame has been <strong>deleted</strong>.`));
    unbindFrameEvents(frame.id);
  }
};