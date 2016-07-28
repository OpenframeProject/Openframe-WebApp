import {FETCH_USER_REQUEST} from '../const';
import fetchUserSuccess from './fetchUserSuccess';
import fetchUserFailure from './fetchUserFailure';
import {users} from '../../sources/api';

module.exports = function(username) {
	return dispatch => {
		dispatch({
			type: FETCH_USER_REQUEST
		});

		return users.fetchByUsername(username).then(
			response => {
        console.log('response', response.length);
        if (response.length === 0) {
          dispatch(fetchUserFailure('User not found.'));
        } else {
          dispatch(fetchUserSuccess(response))
        }
      },
			error => dispatch(fetchUserFailure(error))
		);
	}
};
