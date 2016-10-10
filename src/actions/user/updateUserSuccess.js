import { normalize } from 'normalizr';
import {UPDATE_USER_SUCCESS} from './../const';
import * as schema from '../schema';

const updateNotification = require('../ui/updateNotification.js');

module.exports = function(response, notice) {
  return dispatch => {
    dispatch({
      type: UPDATE_USER_SUCCESS,
      response: normalize(response, schema.user)
    });
    if (notice) {
      let notification = {
        text: notice,
        type: 'info',
        dismissible: true
      }
      dispatch(updateNotification(notification));
    }
  }
};