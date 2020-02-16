import {LIKE_ARTWORK_FAILURE} from './../const';

export default function(error) {
  return { type: LIKE_ARTWORK_FAILURE, error };
};
