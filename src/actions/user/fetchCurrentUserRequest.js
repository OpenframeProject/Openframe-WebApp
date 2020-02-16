import {FETCH_CURRENT_USER_REQUEST} from '../const';
import fetchCurrentUserSuccess from './fetchCurrentUserSuccess';
import fetchCurrentUserFailure from './fetchCurrentUserFailure';
import {users} from '../../sources/api';

export default function() {
	return dispatch => {
		dispatch({
			type: FETCH_CURRENT_USER_REQUEST
		});

		// fetchById defaults to 'current' user

		return users.fetchById().then(
			response => dispatch(fetchCurrentUserSuccess(response)),
			error => dispatch(fetchCurrentUserFailure(error))
		);
	}
};
