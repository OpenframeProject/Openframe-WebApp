import {FETCH_STREAM_REQUEST} from './../const';
import fetchStreamSuccess from './fetchStreamSuccess';
import fetchStreamFailure from './fetchStreamFailure';
import {artwork} from '../../sources/api';

module.exports = function() {
  return dispatch => {
		dispatch({
			type: FETCH_STREAM_REQUEST
		});
		// fetchById defaults to 'current' user
		return artwork.fetchStream().then(
			response => dispatch(fetchStreamSuccess(response)),
			error => dispatch(fetchStreamFailure(error))
		);
	}
};
