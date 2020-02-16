import {LIKE_ARTWORK_SUCCESS} from './../const';
import fetchUserLikesRequest from '../user/fetchUserLikesRequest';

export default function(response) {
  return (dispatch, getState) => {
    const state = getState();
    dispatch({
      type: LIKE_ARTWORK_SUCCESS,
      likedArtworkId: response.artworkId
    });

    dispatch(fetchUserLikesRequest(state.user.current));
  };
};