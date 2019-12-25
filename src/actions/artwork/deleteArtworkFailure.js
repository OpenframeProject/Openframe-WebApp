import {DELETE_ARTWORK_FAILURE} from './../const';

export default function(error) {
  return { type: DELETE_ARTWORK_FAILURE, error };
};
