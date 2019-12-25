import {UNLIKE_ARTWORK_FAILURE} from './../const';

export default function(error) {
  return { type: UNLIKE_ARTWORK_FAILURE, error };
};
