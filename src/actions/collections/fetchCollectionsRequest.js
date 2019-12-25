import {FETCH_COLLECTIONS_REQUEST} from './../const';
import fetchCollectionsSuccess from './fetchCollectionsSuccess';
import fetchCollectionsFailure from './fetchCollectionsFailure';
import {collections} from '../../sources/api';

export default function() {
  return dispatch => {
    dispatch({
      type: FETCH_COLLECTIONS_REQUEST
    });
    return collections.fetch().then(
      response => dispatch(fetchCollectionsSuccess(response)),
      error => dispatch(fetchCollectionsFailure(error))
    );
  };
};