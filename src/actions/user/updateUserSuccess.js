import { normalize } from 'normalizr';
import {UPDATE_USER_SUCCESS} from './../const';
import * as schema from '../schema';
import { actions as notifActions } from 'redux-notifications';
const { notifSend } = notifActions;

export default function(response, notice) {
  return dispatch => {
    dispatch({
      type: UPDATE_USER_SUCCESS,
      response: normalize(response, schema.user)
    });
    if (notice) {
      let notification = {
        message: notice,
        type: 'info',
        dismissAfter: 5000
      }
      dispatch(notifSend(notification));
    }
  }
};