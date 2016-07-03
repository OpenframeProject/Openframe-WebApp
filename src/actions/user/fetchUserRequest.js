import {FETCH_USER_REQUEST} from '../const';
import fetchUserSuccess from './fetchUserSuccess';
import fetchUserFailure from './fetchUserFailure';
import {users} from '../../sources/api';

module.exports = function() {
	return dispatch => {
		dispatch({
			type: FETCH_USER_REQUEST
		});
		// fetchById defaults to 'current' user
		return users.fetchById().then(
			response => dispatch(fetchUserSuccess(response)),
			error => dispatch(fetchUserFailure(error))
		);
	}
};
