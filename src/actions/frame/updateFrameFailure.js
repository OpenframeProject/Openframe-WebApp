import {UPDATE_FRAME_FAILURE} from './../const';

export default function(error) {
  return { type: UPDATE_FRAME_FAILURE, error };
};
