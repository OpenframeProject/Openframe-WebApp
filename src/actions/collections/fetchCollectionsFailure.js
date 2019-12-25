import {FETCH_COLLECTIONS_FAILURE} from './../const';

export default function(collectionId) {
  return { type: FETCH_COLLECTIONS_FAILURE, collectionId };
};
