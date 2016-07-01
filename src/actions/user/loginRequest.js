import fetch from 'isomorphic-fetch';
import {LOGIN_REQUEST} from './../const';
import loginSuccess from './loginSuccess';
import loginFailure from './loginFailure';

import config from 'config';

module.exports = function(credentials) {
  return dispatch => {
    // dispatch LOGIN_REQUEST so that the UI can update accordingly
    dispatch({ type: LOGIN_REQUEST, credentials });

    let url = config.apiBase + 'users/login';

    // return a promise that dispatches another action on success or failure
    return fetch(url, {
        method: 'POST',
        headers: {
          'Accept': 'application/json',
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(credentials)
      })
      .then(response => response.json())
      .then(json => dispatch(loginSuccess(json)))
      .catch(err => dispatch(loginFailure(err)));
  }
};