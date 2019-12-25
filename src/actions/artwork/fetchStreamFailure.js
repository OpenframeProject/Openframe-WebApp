import {FETCH_STREAM_FAILURE} from './../const';

export default function(response) {
  return { type: FETCH_STREAM_FAILURE, response };
};
