import {FETCH_USER_ARTWORK_FAILURE} from './../const';
export default function(error) {
  return { type: FETCH_USER_ARTWORK_FAILURE, error };
};
