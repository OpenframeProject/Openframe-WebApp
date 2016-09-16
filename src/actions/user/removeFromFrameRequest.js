import {REMOVE_FROM_FRAME_REQUEST} from './../const';
import removeFromFrameSuccess from './removeFromFrameSuccess';
import removeFromFrameFailure from './removeFromFrameFailure';
import {users} from '../../sources/api';

module.exports = function(frameId) {
  return dispatch => {
		dispatch({
			type: REMOVE_FROM_FRAME_REQUEST
		});
		// fetchById defaults to 'current' user
		return users.removeFromFrame(frameId).then(
			response => dispatch(removeFromFrameSuccess(frameId)),
			error => dispatch(removeFromFrameFailure(error))
		);
	}
}
