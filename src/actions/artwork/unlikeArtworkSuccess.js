import {UNLIKE_ARTWORK_SUCCESS} from './../const';
import fetchUserLikesRequest from '../user/fetchUserLikesRequest';

export default function(artworkId) {
  return (dispatch, getState) => {
    const state = getState();
    dispatch({
      type: UNLIKE_ARTWORK_SUCCESS,
      unlikedArtworkId: artworkId
    });

    dispatch(fetchUserLikesRequest(state.user.current));
  };
};
