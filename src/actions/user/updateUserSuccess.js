import { normalize } from 'normalizr';
import { browserHistory } from 'react-router';
import {UPDATE_USER_SUCCESS} from './../const';
import * as schema from '../schema';

const updateNoticeBanner = require('../ui/updateNoticeBanner.js');

module.exports = function(response, notice) {
  // browserHistory.push('/');

  return dispatch => {
    dispatch({
      type: UPDATE_USER_SUCCESS,
      response: normalize(response, schema.user)
    });

    if (notice) dispatch(updateNoticeBanner(notice));
  }
};