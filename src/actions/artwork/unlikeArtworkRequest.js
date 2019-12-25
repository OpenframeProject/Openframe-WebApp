import {UNLIKE_ARTWORK_REQUEST} from './../const';
import unlikeArtworkSuccess from './unlikeArtworkSuccess';
import unlikeArtworkFailure from './unlikeArtworkFailure';
import { users } from '../../sources/api';

export default function(artworkId) {
  return (dispatch, getState) => {
    const state = getState();
    dispatch({
      type: UNLIKE_ARTWORK_REQUEST,
      artworkId,
      userId: state.user.current
    });

    users.unlikeArtwork(artworkId).then(
      () => dispatch(unlikeArtworkSuccess(artworkId)),
      error => {
        dispatch(unlikeArtworkFailure(error))
      }
    );
  };
};
