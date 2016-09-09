import {UPDATE_FRAME_REQUEST} from './../const';
import updateFrameSuccess from './updateFrameSuccess';
import updateFrameFailure from './updateFrameFailure';
import {frames} from '../../sources/api';

module.exports = function(frameId, frameData) {
  return dispatch => {
		dispatch({
			type: UPDATE_FRAME_REQUEST
		});
		return frames.update(frameId, frameData).then(
			response => dispatch(updateFrameSuccess(response)),
			error => dispatch(updateFrameFailure(error))
		);
	}
}
