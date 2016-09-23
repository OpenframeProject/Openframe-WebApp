import {UPDATE_ARTWORK_REQUEST} from './../const';
import updateArtworkSuccess from './updateArtworkSuccess';
import updateArtworkFailure from './updateArtworkFailure';
import {artwork} from '../../sources/api';
module.exports = function(artworkId, data) {
  return dispatch => {
		dispatch({
			type: UPDATE_ARTWORK_REQUEST
		});
		return artwork.update(artworkId, data).then(
			response => dispatch(updateArtworkSuccess(response)),
			error => {
				dispatch(updateArtworkFailure(error))
			}
		);
	}
};
