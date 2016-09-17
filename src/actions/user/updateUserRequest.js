import {UPDATE_USER_REQUEST} from './../const';
import updateUserSuccess from './updateUserSuccess';
import updateUserFailure from './updateUserFailure';
import updateVisibleModal from '../ui/updateVisibleModal';
import {users} from '../../sources/api';

module.exports = function(data, userId = 'current', accessToken) {
  return dispatch => {
    dispatch({
      type: UPDATE_USER_REQUEST
    });
    return users.update(userId, data, accessToken).then(
      response => {
        dispatch(updateUserSuccess(response));
        if (data.password) {
          dispatch(updateVisibleModal('login'));
        }
      },
      error => dispatch(updateUserFailure(error))
    );
  };
};