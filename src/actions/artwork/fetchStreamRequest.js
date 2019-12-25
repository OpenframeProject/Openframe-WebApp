import {FETCH_STREAM_REQUEST} from './../const';
import fetchStreamSuccess from './fetchStreamSuccess';
import fetchStreamFailure from './fetchStreamFailure';
import {artwork} from '../../sources/api';
import config from 'config';

export default function(page = 0) {
	let perPage = config.perPage;
	let skip = perPage * page;
  return dispatch => {
		dispatch({
			type: FETCH_STREAM_REQUEST
		});
		// fetchById defaults to 'current' user
		return artwork.fetchStream({ skip }).then(
			response => dispatch(fetchStreamSuccess(response)),
			error => dispatch(fetchStreamFailure(error))
		);
	}
};
