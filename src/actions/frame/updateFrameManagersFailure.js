import {UPDATE_FRAME_MANAGERS_FAILURE} from './../const';

export default function(error) {
  return { type: UPDATE_FRAME_MANAGERS_FAILURE, error };
};
