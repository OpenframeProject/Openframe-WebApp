import {FETCH_SINGLE_ARTWORK_REQUEST} from './../const';
import fetchSingleArtworkSuccess from './fetchSingleArtworkSuccess';
import fetchSingleArtworkFailure from './fetchSingleArtworkFailure';
import {artwork} from '../../sources/api';
module.exports = function(artworkId) {
  return dispatch => {
		dispatch({
			type: FETCH_SINGLE_ARTWORK_REQUEST
		});
		// fetchById defaults to 'current' user
		return artwork.fetchById(artworkId).then(
			response => dispatch(fetchSingleArtworkSuccess(response)),
			error => {
				console.log('ERROR', error);
				dispatch(fetchSingleArtworkFailure(error))
			}
		);
	}
};
