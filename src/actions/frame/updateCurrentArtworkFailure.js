import {UPDATE_CURRENT_ARTWORK_FAILURE} from './../const';

export default function(error) {
  return { type: UPDATE_CURRENT_ARTWORK_FAILURE, error };
};
