import {REMOVE_FROM_FRAME_SUCCESS} from './../const';
import { unbindFrameEvents } from '../../services/pubsub';
import { notifSend } from '../notifications';

export default function(frame) {
  return (dispatch, getState) => {
    const state = getState();
    const owner = state.user.byId[frame.ownerId];
    let name = frame.name.toUpperCase();
    dispatch({ type: REMOVE_FROM_FRAME_SUCCESS, frameId: frame.id });
    let notification = {
      message: `You are no longer curating ${owner.username}'s frame ${name}.`,
      type: 'info',
      dismissAfter: 5000
    }
    dispatch(notifSend(notification));
    unbindFrameEvents(frame.id);
  }
};