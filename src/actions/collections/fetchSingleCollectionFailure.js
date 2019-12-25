import {FETCH_SINGLE_COLLECTION_FAILURE} from './../const';

export default function(error) {
  return { type: FETCH_SINGLE_COLLECTION_FAILURE, error };
};
