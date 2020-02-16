import { LOGOUT_SUCCESS } from './../const';
import { reset } from 'redux-form';
import history from '../../services/history'

export default function() {
  return dispatch => {
    try {
      localStorage.removeItem('selectedFrameId');
    } catch(e) {
      // nada
    }
    history.push('/');

    dispatch({
      type: LOGOUT_SUCCESS
    });

    dispatch(reset('login'));
  }
};
