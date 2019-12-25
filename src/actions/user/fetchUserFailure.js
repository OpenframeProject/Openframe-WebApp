import {FETCH_USER_FAILURE} from './../const';
export default function(parameter) {
  return { type: FETCH_USER_FAILURE, parameter };
};
