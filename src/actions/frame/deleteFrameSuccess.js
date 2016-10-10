import {DELETE_FRAME_SUCCESS} from './../const';

import { unbindFrameEvents } from '../../services/pubsub';
const updateNotification = require('../ui/updateNotification.js');

module.exports = function(frame) {
  return (dispatch) => {
    dispatch({ type: DELETE_FRAME_SUCCESS, frameId: frame.id });
    let notification = {
      text: `Your <strong style="text-transform: uppercase;">${frame.name}</strong> frame has been <strong>deleted</strong>.`,
      type: 'info',
      dismissible: true
    }
    dispatch(updateNotification(notification));
    unbindFrameEvents(frame.id);
  }
};