import {UNLIKE_ARTWORK_REQUEST} from './../const';
import unlikeArtworkSuccess from './unlikeArtworkSuccess';
import unlikeArtworkFailure from './unlikeArtworkFailure';
import { users } from '../../sources/api';

module.exports = function(artworkId) {
  return (dispatch) => {
    dispatch({
      type: UNLIKE_ARTWORK_REQUEST
    });

    users.unlikeArtwork(artworkId).then(
      () => dispatch(unlikeArtworkSuccess(artworkId)),
      error => {
        dispatch(unlikeArtworkFailure(error))
      }
    );
  };
};
