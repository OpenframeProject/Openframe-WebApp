import {FETCH_SINGLE_COLLECTION_REQUEST} from './../const';
import fetchSingleCollectionSuccess from './fetchSingleCollectionSuccess';
import fetchSingleCollectionFailure from './fetchSingleCollectionFailure';
import {collections} from '../../sources/api';

module.exports = function(collectionId) {
  return dispatch => {
    dispatch({
      type: FETCH_SINGLE_COLLECTION_REQUEST
    });
    return collections.fetchById(collectionId).then(
      response => dispatch(fetchSingleCollectionSuccess(response)),
      error => dispatch(fetchSingleCollectionFailure(error))
    );
  };
};