import {FETCH_CHANNELS_SUCCESS} from './../const';

export default function(channels) {
  return { type: FETCH_CHANNELS_SUCCESS, channels };
};
