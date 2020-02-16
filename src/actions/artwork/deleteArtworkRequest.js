import {DELETE_ARTWORK_REQUEST} from './../const';
import deleteArtworkSuccess from './deleteArtworkSuccess';
import deleteArtworkFailure from './deleteArtworkFailure';
import { users } from '../../sources/api';

export default function(_artwork) {
  return dispatch => {
		dispatch({
			type: DELETE_ARTWORK_REQUEST
		});
		return users.deleteArtwork(_artwork.id).then(
			response => dispatch(deleteArtworkSuccess(_artwork)),
			error => dispatch(deleteArtworkFailure(error))
		);
	}
};
