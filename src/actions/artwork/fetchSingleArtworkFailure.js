import {FETCH_SINLGE_ARTWORK_FAILURE} from './../const';

module.exports = function(response) {
  return { type: FETCH_SINLGE_ARTWORK_FAILURE, response };
};
