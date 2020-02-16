import { EDIT_FRAME_SETTINGS } from './../const';
import updateVisibleModal from './../ui/updateVisibleModal';

export default function(frameId) {
  return dispatch => {
    dispatch({
      type: EDIT_FRAME_SETTINGS, frameId
    });

    dispatch(updateVisibleModal('frame-settings'));
  };
};
