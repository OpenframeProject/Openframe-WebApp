import {DELETE_ARTWORK_SUCCESS} from './../const';
import { actions as notifActions } from 'redux-notifications';
const { notifSend } = notifActions;

module.exports = function(artwork) {
  return (dispatch) => {
    dispatch({ type: DELETE_ARTWORK_SUCCESS, artwork: artwork });
    let notification = {
      message: `The artwork '${artwork.title}' has been deleted.`,
      kind: 'info',
      dismissAfter: 5000
    }
    dispatch(notifSend(notification));
  };
};
