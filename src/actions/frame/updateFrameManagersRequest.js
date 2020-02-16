import {UPDATE_FRAME_MANAGERS_REQUEST} from './../const';
import updateFrameManagersSuccess from './updateFrameManagersSuccess';
import updateFrameManagersFailure from './updateFrameManagersFailure';
import {frames} from '../../sources/api';

/**
 * @param  {String} frameId
 * @param  {Array} managers An array of manager usernames
 */
export default function(frameId, managers) {
  return dispatch => {
		dispatch({
			type: UPDATE_FRAME_MANAGERS_REQUEST
		});
		return frames.updateFrameManagers(frameId, managers).then(
			response => dispatch(updateFrameManagersSuccess(response)),
			error => {
				dispatch(updateFrameManagersFailure(error));
			}
		);
	}
}
