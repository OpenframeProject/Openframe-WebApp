import {UPDATE_CURRENT_ARTWORK_SUCCESS} from './../const';

import { normalize } from 'normalizr';
import * as schema from '../schema';
// import { actions as notifActions } from 'redux-notifications';
// const { notifSend } = notifActions;

export default function(response) {
  return dispatch => {
    let frame = response;
    dispatch({ type: UPDATE_CURRENT_ARTWORK_SUCCESS, response: normalize(frame, schema.frame) });
    // let notification = {
    //   message: 'Current artwork updated.',
    //   kind: 'info',
    //   dismissAfter: 5000
    // }
    // dispatch(notifSend(notification));

  }
};