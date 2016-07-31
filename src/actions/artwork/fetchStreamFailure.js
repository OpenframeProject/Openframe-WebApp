import {FETCH_STREAM_FAILURE} from './../const';

module.exports = function(response) {
  return { type: FETCH_STREAM_FAILURE, response };
};
