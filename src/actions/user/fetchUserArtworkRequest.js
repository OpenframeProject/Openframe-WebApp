import {FETCH_USER_ARTWORK_REQUEST} from '../const';
import fetchUserArtworkSuccess from './fetchUserArtworkSuccess';
import fetchUserArtworkFailure from './fetchUserArtworkFailure';
import { users } from '../../sources/api';
import config from 'config';

export default function(userId, page = 0) {
  let perPage = config.perPage;
  let skip = perPage * page;

  return dispatch => {
    dispatch({
      type: FETCH_USER_ARTWORK_REQUEST
    });

    return users.fetchUserArtwork(userId, {skip}).then(
      response => dispatch(fetchUserArtworkSuccess(userId, response)),
      error => dispatch(fetchUserArtworkFailure(error))
    );
  }
};