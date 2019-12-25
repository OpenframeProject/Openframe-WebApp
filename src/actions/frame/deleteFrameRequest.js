import {DELETE_FRAME_REQUEST} from './../const';
import deleteFrameSuccess from './deleteFrameSuccess';
import deleteFrameFailure from './deleteFrameFailure';
import {frames} from '../../sources/api';

export default function(frame) {
  return dispatch => {
		dispatch({
			type: DELETE_FRAME_REQUEST
		});
		// fetchById defaults to 'current' user
		return frames.delete(frame.id).then(
			response => dispatch(deleteFrameSuccess(frame)),
			error => dispatch(deleteFrameFailure(error))
		);
	}
}
