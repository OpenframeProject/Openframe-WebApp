import {UNLIKE_ARTWORK_SUCCESS} from './../const';
import fetchUserLikesRequest from '../user/fetchUserLikesRequest';

module.exports = function(artworkId) {
  return dispatch => {
      dispatch({
      type: UNLIKE_ARTWORK_SUCCESS,
      unlikedArtworkId: artworkId
    });

    dispatch(fetchUserLikesRequest());
  };
};
