import {PUSH_ARTWORK} from './../const';
import updateCurrentArtworkRequest from '../frame/updateCurrentArtworkRequest';

export default function(artworkId) {
  return (dispatch, getState) => {
    dispatch({
      type: PUSH_ARTWORK
    });
    const state = getState();
    const selectedFrameId = state.frames.selectedFrameId;
    if (selectedFrameId) {
      dispatch(updateCurrentArtworkRequest(selectedFrameId, artworkId));
    }
  };
};
