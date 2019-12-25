import {DELETE_FRAME_SUCCESS} from './../const';
import { unbindFrameEvents } from '../../services/pubsub';
import { actions as notifActions } from 'redux-notifications';
const { notifSend } = notifActions;

export default function(frame) {
  return (dispatch) => {
    dispatch({ type: DELETE_FRAME_SUCCESS, frameId: frame.id });
    let name = frame.name.toUpperCase();
    let notification = {
      message: `Your ${name} frame has been deleted.`,
      type: 'info',
      dismissAfter: 5000
    }
    dispatch(notifSend(notification));
    unbindFrameEvents(frame.id);
  }
};