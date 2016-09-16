import { EDIT_FRAME_SETTINGS } from './../const';
import updateVisibleModal from './../ui/updateVisibleModal';

module.exports = function(frameId) {
  return dispatch => {
    dispatch({
      type: EDIT_FRAME_SETTINGS, frameId
    });

    dispatch(updateVisibleModal('frame-settings'));
  };
};
