import {DELETE_FRAME_FAILURE} from './../const';

export default function(error) {
  return { type: DELETE_FRAME_FAILURE, error };
};
