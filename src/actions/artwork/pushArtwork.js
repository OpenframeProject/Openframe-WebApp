import {PUSH_ARTWORK} from './../const';
import updateFrameRequest from '../frame/updateFrameRequest';

module.exports = function(artworkId) {
  return (dispatch, getState) => {
    const state = getState();
    const selectedFrameId = state.frames.selectedFrameId;
    if (selectedFrameId) {
      dispatch(updateFrameRequest(selectedFrameId, {
        currentArtworkId: artworkId
      }));
    }
  };
};
