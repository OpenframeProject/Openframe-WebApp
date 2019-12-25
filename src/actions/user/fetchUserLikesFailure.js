import {FETCH_USER_LIKES_FAILURE} from './../const';
export default function(error) {
  return { type: FETCH_USER_LIKES_FAILURE, error };
};
