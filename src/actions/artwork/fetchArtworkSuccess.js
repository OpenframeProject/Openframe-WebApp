import {FETCH_ARTWORK_SUCCESS} from './../const';

module.exports = function(artwork) {
  return { type: FETCH_ARTWORK_SUCCESS, artwork };
};
