import {FETCH_ARTWORK_FAILURE} from './../const';

module.exports = function(response) {
  return { type: FETCH_ARTWORK_FAILURE, response };
};
