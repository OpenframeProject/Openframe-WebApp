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
        let notice = !accessToken ? 'Your password has been updated.' : null;
        if (accessToken) {
          dispatch(updateVisibleModal('login'));
        }
        dispatch(updateUserSuccess(response, notice));
      },
      error => dispatch(updateUserFailure(error))
    );
  };
};