import {FETCH_FRAMES_FAILURE} from './../const';

export default function(parameter) {
  return { type: FETCH_FRAMES_FAILURE, parameter };
};
