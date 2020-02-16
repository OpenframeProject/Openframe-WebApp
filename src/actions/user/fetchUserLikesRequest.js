import {FETCH_USER_LIKES_REQUEST} from '../const';
import fetchUserLikesSuccess from './fetchUserLikesSuccess';
import fetchUserLikesFailure from './fetchUserLikesFailure';
import { users } from '../../sources/api';
import config from 'config';

export default function(userId = 'current', page = 0) {
  let perPage = config.perPage;
  let skip = perPage * page;

  return dispatch => {
    dispatch({
      type: FETCH_USER_LIKES_REQUEST
    });

    return users.fetchUserLikedArtwork(userId, {skip}).then(
      response => dispatch(fetchUserLikesSuccess(userId, response)),
      error => dispatch(fetchUserLikesFailure(error))
    );
  }
};