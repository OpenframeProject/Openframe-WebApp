import {FETCH_SINGLE_ARTWORK_FAILURE} from './../const';

export default function(error) {
  return { type: FETCH_SINGLE_ARTWORK_FAILURE, error };
};
