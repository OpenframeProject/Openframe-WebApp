import {REMOVE_FROM_FRAME_REQUEST} from './../const';
import removeFromFrameSuccess from './removeFromFrameSuccess';
import removeFromFrameFailure from './removeFromFrameFailure';
import {users} from '../../sources/api';

export default function(frame) {
  return dispatch => {
		dispatch({
			type: REMOVE_FROM_FRAME_REQUEST
		});
		// fetchById defaults to 'current' user
		return users.removeFromFrame(frame.id).then(
			response => dispatch(removeFromFrameSuccess(frame)),
			error => dispatch(removeFromFrameFailure(error))
		);
	}
}
