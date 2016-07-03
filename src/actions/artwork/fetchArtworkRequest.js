import {FETCH_ARTWORK_REQUEST} from './../const';
import fetchArtworkSuccess from './fetchArtworkSuccess';
import fetchArtworkFailure from './fetchArtworkFailure';
import {artwork} from '../../sources/api';

module.exports = function() {
  return dispatch => {
		dispatch({
			type: FETCH_ARTWORK_REQUEST
		});
		// fetchById defaults to 'current' user
		return artwork.fetch().then(
			response => dispatch(fetchArtworkSuccess(response)),
			error => dispatch(fetchArtworkFailure(error))
		);
	}
};
