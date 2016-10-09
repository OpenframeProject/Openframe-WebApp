import {DELETE_ARTWORK_REQUEST} from './../const';
import deleteArtworkSuccess from './deleteArtworkSuccess';
import deleteArtworkFailure from './deleteArtworkFailure';
import { artwork } from '../../sources/api';

module.exports = function(_artwork) {
  return dispatch => {
		dispatch({
			type: DELETE_ARTWORK_REQUEST
		});
		return artwork.delete(_artwork.id).then(
			response => dispatch(deleteArtworkSuccess(_artwork)),
			error => dispatch(deleteArtworkFailure(error))
		);
	}
};
