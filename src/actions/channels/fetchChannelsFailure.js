import {FETCH_CHANNELS_FAILURE} from './../const';

export default function(parameter) {
  return { type: FETCH_CHANNELS_FAILURE, parameter };
};
