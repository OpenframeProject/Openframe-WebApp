import {UPDATE_USER_REQUEST} from './../const';
import updateUserSuccess from './updateUserSuccess';
import updateUserFailure from './updateUserFailure';
import updateNoticeBanner from '../ui/updateNoticeBanner';
import {users} from '../../sources/api';

module.exports = function(data, userId = 'current', accessToken) {
  return dispatch => {
    dispatch({
      type: UPDATE_USER_REQUEST
    });
    return users.update(userId, data, accessToken).then(
      response => {
        if (data.password) {
          dispatch(updateNoticeBanner('Your password has been updated.'));
        }
        dispatch(updateUserSuccess(response));
      },
      error => dispatch(updateUserFailure(error))
    );
  };
};