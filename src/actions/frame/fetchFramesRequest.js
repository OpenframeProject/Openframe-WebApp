import {FETCH_FRAMES_REQUEST} from './../const';
import fetchFramesSuccess from './fetchFramesSuccess';
import fetchFramesFailure from './fetchFramesFailure';
import {users} from '../../sources/api';

module.exports = function() {
  return dispatch => {
		dispatch({
			type: FETCH_FRAMES_REQUEST
		});
		// fetchById defaults to 'current' user
		return users.fetchAllFrames().then(
			response => dispatch(fetchFramesSuccess(response)),
			error => dispatch(fetchFramesFailure(error))
		);
	}
}
