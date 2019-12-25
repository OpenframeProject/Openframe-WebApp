import {UPDATE_ARTWORK_FAILURE} from './../const';

export default function(error) {
  return { type: UPDATE_ARTWORK_FAILURE, error };
};
