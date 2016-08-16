import {UPDATE_USER_REQUEST} from './../const';
import updateUserSuccess from './updateUserSuccess';
import updateUserFailure from './updateUserFailure';
import {users} from '../../sources/api';

module.exports = function(data) {
  return dispatch => {
    dispatch({
      type: UPDATE_USER_REQUEST
    });
    return users.update('current', data).then(
      response => {
        dispatch(updateUserSuccess(response));
      },
      error => dispatch(updateUserFailure(error))
    );
  };
};