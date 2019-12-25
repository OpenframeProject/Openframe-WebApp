import {UPDATE_CURRENT_ARTWORK_REQUEST} from './../const';
import updateCurrentArtworkSuccess from './updateCurrentArtworkSuccess';
import updateCurrentArtworkFailure from './updateCurrentArtworkFailure';
import {frames} from '../../sources/api';

export default  function(frameId, artworkId) {
  return dispatch => {
		dispatch({
			type: UPDATE_CURRENT_ARTWORK_REQUEST
		});
		// fetchById defaults to 'current' user
		return frames.updateCurrentArtwork(frameId, artworkId).then(
			response => dispatch(updateCurrentArtworkSuccess(response)),
			error => dispatch(updateCurrentArtworkFailure(error))
		);
	}
}
