import {CREATE_ARTWORK_FAILURE} from './../const';

export default function(error) {
  return { type: CREATE_ARTWORK_FAILURE, error };
}
