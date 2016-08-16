import { LOGOUT_SUCCESS } from './../const';
import { browserHistory } from 'react-router';
import { reset } from 'redux-form';

module.exports = function() {
  return dispatch => {
    browserHistory.push('/');

    dispatch({
      type: LOGOUT_SUCCESS
    });

    dispatch(reset('login'));
  }
};
