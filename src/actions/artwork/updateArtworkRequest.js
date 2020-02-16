import {UPDATE_ARTWORK_REQUEST} from './../const';
import updateArtworkSuccess from './updateArtworkSuccess';
import updateArtworkFailure from './updateArtworkFailure';
import { users } from '../../sources/api';
export default function(artworkId, data) {
  return dispatch => {
		dispatch({
			type: UPDATE_ARTWORK_REQUEST
		});
		return users.updateArtwork(artworkId, data).then(
			response => dispatch(updateArtworkSuccess(response)),
			error => {
				dispatch(updateArtworkFailure(error))
			}
		);
	}
};
