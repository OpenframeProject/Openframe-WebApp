import {CREATE_ARTWORK_REQUEST} from './../const';
import createArtworkSuccess from './createArtworkSuccess';
import createArtworkFailure from './createArtworkFailure';
import {artwork} from '../../sources/api';
export default function(data) {
  return dispatch => {
		dispatch({
			type: CREATE_ARTWORK_REQUEST
		});
		return artwork.create(data).then(
			response => dispatch(createArtworkSuccess(response)),
			error => {
				dispatch(createArtworkFailure(error))
			}
		);
	}
};
