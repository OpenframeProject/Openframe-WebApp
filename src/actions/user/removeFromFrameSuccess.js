import {REMOVE_FROM_FRAME_SUCCESS} from './../const';
import { unbindFrameEvents } from '../../services/pubsub';

const updateNoticeBanner = require('../ui/updateNoticeBanner.js');

module.exports = function(frame) {
  return (dispatch, getState) => {
    const state = getState();
    const owner = state.user.byId[frame.ownerId];
    dispatch({ type: REMOVE_FROM_FRAME_SUCCESS, frameId: frame.id });
    dispatch(updateNoticeBanner(`You are no longer curating <strong>${owner.username}</strong>'s frame <strong style="text-transform: uppercase;">${frame.name}</strong>.`));
    unbindFrameEvents(frame.id);
  }
};