import {DELETE_FRAME_REQUEST} from './../const';
import deleteFrameSuccess from './deleteFrameSuccess';
import deleteFrameFailure from './deleteFrameFailure';
import {frames} from '../../sources/api';

module.exports = function(frameId) {
  return dispatch => {
		dispatch({
			type: DELETE_FRAME_REQUEST
		});
		// fetchById defaults to 'current' user
		return frames.delete(frameId).then(
			response => dispatch(deleteFrameSuccess(frameId)),
			error => dispatch(deleteFrameFailure(error))
		);
	}
}
