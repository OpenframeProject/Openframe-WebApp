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
        // Since we're using a RESTful request with a filter by username,
        // an empty array will be returned rather than a 404 if user doesn't exist.
        // On the client, we want that to be an error, so we handle it here.
        //
        // TODO: create an endpoint for user by username that responds with 404 if not found?
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
